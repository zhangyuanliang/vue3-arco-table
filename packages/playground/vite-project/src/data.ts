import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'
import { IFormConfig } from '@/types/global'

export const formConfig: IFormConfig = {
  quickSearch: true,
  showExpand: true,
  config: {},
  style: {},
  data: [],
  list: [
    {
      type: 'select',
      key: 'hospitalId',
      label: '医院名称',
      config: {},
      options: [],
    },
    {
      type: 'input',
      key: 'userName',
      label: '登录名',
      config: {},
    },
    {
      type: 'input',
      key: 'nickName',
      label: '用户名称',
      config: {},
    },
    {
      type: 'select',
      key: 'role',
      label: '用户角色',
      config: {},
      options: [],
    },
    {
      type: 'input',
      key: 'phoneNumber',
      label: '手机号码',
      config: {},
    },
    {
      type: 'dateRangePicker',
      key: 'updateTime',
      label: '操作时间',
      config: {
        showTime: true,
      },
    },
  ],
}

export const userManagementColumnData: TableColumnData[] = [
  {
    title: '序号',
    slotName: 'index',
    fixed: 'left',
    width: 70,
  },
  {
    title: '登录名',
    dataIndex: 'userName',
    fixed: 'left',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '用户姓名',
    dataIndex: 'nickName',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '医院名称',
    dataIndex: 'hospitalName',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '手机号',
    dataIndex: 'phoneNumber',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '用户角色',
    dataIndex: 'roleNames',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '操作时间',
    dataIndex: 'operateTime',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend'],
    },
  },
  {
    title: '操作',
    slotName: 'operation',
    fixed: 'right',
    width: 160,
  },
]
