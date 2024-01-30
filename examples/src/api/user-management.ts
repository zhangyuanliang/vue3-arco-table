import axios from 'axios'
import qs from 'query-string'
import type { RowsHttpResponse } from '@/api/interceptor'

export interface IUserManagementForm {
  hospitalId: string
  nickName: string
  phoneNumber: string
  searchValue: string
  userName: string
  updateTime: string[]
}

export interface UserManagementRecord {
  content?: string
  userName?: string
  updateTime?: string
  reason: string
}

export interface UserManagementParams extends Partial<IUserManagementForm> {
  modifyRecordId?: string
  modifyType?: string
  startDate?: string
  endDate?: string
  current: number
  pageSize: number
}

export function queryUserList(params: UserManagementParams) {
  const { current, pageSize, ...rest } = params
  return axios.post<RowsHttpResponse<UserManagementRecord>>(
    '/dev-api/supervise-manager-api/externalUser/getList.do?' + qs.stringify({ pageNum: current, pageSize }),
    rest,
  )
}
