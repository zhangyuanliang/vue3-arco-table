export interface Hospital {
  address: string
  hospitalId: string
  hospitalName: string
  newYn: string
}

export interface RoleRecord {
  belongNames: string
  belongToIds: string
  bindCount: number
  createBy: string
  createByName: string
  createTime: string
  dataScope: string
  delYn: string
  id: string
  operateTime: string
  remark: string
  roleKey: string
  roleName: string
  roleSort: string
  status: string
  type: string
  updateBy: string
  updateByName: string
  updateTime?: string[] | string
  resourceIdList: string[]
}
