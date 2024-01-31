import { IFormConfig, TableConfig, AnyObject } from './global'
export interface TableBasicOptions {
  form: IFormConfig
  formData: AnyObject
  table: TableConfig
}

import type { App } from 'vue';
declare const TableBasic: {
    install: (app: App, options?: TableBasicOptions | undefined) => void;
};
export default TableBasic