import type { PaginationProps } from '@arco-design/web-vue/es/pagination/interface'
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'

export interface AnyObject {
  [key: string]: unknown
}

export interface Options {
  value: unknown
  label: string
}

export interface NodeOptions extends Options {
  children?: NodeOptions[]
}

export interface GetParams {
  body: null
  type: string
  url: string
}

export interface PostData {
  body: string
  type: string
  url: string
}

export interface Pagination {
  current: number
  pageSize: number
  total?: number
}

export type TimeRanger = [string, string]

export interface GeneralChart {
  xAxis: string[]
  data: Array<{ name: string; value: number[] }>
}

export interface TableConfig<T> {
  data: T[]
  columns: TableColumnData[]
  pagination: PaginationProps
}

interface IFrom {
  type: string
  key?: string
  slotName?: string
  label: string
  config?: any
  options?: { label: string; value: string }[]
}

export interface IFormConfig {
  quickSearch: boolean
  showExpand: boolean
  config?: any
  style?: any
  data: any[]
  list: IFrom[]
}
