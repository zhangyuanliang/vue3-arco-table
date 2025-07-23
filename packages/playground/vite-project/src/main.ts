import { createApp } from 'vue'
import App from './App.vue'
import mermaid from 'mermaid'

mermaid.initialize({ 
  theme: 'default',
  startOnLoad: false 
})

createApp(App).mount('#app')