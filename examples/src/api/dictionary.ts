import axios from 'axios'
import { Hospital, RoleRecord } from './types/dictionary'
import qs from 'query-string'

export interface IRoleList {
  rows: RoleRecord[]
  total: number
}

export function queryHospitalList() {
  return axios.post<Hospital[]>('/dev-api/supervise-manager-api/hospital/getList.do')
}

export function queryRoleList(param: { pageNum: number; pageSize: number; belongToId: string; type: string }) {
  const { pageNum, pageSize, ...rest } = param
  return axios.post<IRoleList>('/dev-api/supervise-manager-api/sysRole/list?' + qs.stringify({ pageNum, pageSize }), rest)
}
