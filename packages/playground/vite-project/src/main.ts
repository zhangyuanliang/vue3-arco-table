import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css';
import { createApp } from 'vue'
import App from './app.vue'
import store from './store'
import '@/api/interceptor'
import '@/mock'
import '@/assets/styles/global.less'
import '@/assets/styles/custom.less'

import Vue3ArcoTable from 'vue3-arco-table'

const app = createApp(App)

app.use(store)
app.use(ArcoVue, {})
app.use(ArcoVueIcon)
app.use(Vue3ArcoTable)

app.mount('#app')
