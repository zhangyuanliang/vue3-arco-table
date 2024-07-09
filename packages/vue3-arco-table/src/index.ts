
import type { App, Plugin } from 'vue'
import Vue3ArcoTable from './vue3-arco-table.vue'
export * from './types'

export interface PluginOptions {
  name?: string
}

export default {
  install(app: App, options?: PluginOptions) {
    const name = options?.name ?? 'Vue3ArcoTable'
    app.component(name, Vue3ArcoTable)
  },
} as Plugin

export { Vue3ArcoTable }