import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message, Modal } from '@arco-design/web-vue'
import { ModalReturn } from '@arco-design/web-vue/es/modal/interface'
import { getToken } from '@/utils/auth'

export interface BaseResponse {
  status: number
  msg: string
  code: number
}

export interface HttpResponse<T = unknown> extends BaseResponse {
  data: T
  [key: string]: unknown
}

export interface RowsHttpResponse<T> {
  rows: T[]
  total: number
}

if (import.meta.env.VITE_BASE_API) {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_API
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)
let modelInstance: ModalReturn | undefined
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data
    if (res.code !== 200) {
      if ([401].includes(res.code) && response.config.url !== '/supervise-manager-api/system/getInfo') {
        modelInstance?.close()
        modelInstance = Modal.error({
          title: '确认退出',
          content: '已经登录超时，您可以停留在此页面上，或者重新登录',
          okText: '重新登录',
          async onOk() {
            // const userStore = useUserStore()
            // await userStore.logout()
            window.location.reload()
          },
        })
      } else {
        Message.error({
          content: res.msg || 'Error',
          duration: 3 * 1000,
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  error => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 3 * 1000,
    })
    return Promise.reject(error)
  },
)
