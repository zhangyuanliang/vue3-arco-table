import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css';
import { createApp } from 'vue'
import App from './App.vue'
import '@/mock'
import '@/assets/styles/global.less'

import TableBasic from 'vue3-arco-table'
import 'vue3-arco-table/dist/style.css'

const app = createApp(App)

app.use(ArcoVue, {})
app.use(ArcoVueIcon)
app.use(TableBasic)

app.mount('#app')
