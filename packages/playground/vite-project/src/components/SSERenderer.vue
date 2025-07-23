<template>
  <div class="sse-renderer">
    <!-- 原始数据缓冲区（隐藏） -->
    <div ref="rawBuffer" style="display: none">{{ rawContent }}</div>
    
    <!-- 渲染展示区 -->
    <div class="render-area markdown-body" v-html="renderedContent"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import mermaid from 'mermaid'

export default defineComponent({
  props: {
    sseUrl: { type: String, required: true }
  },
  setup(props) {
    const rawContent = ref('')
    const renderedContent = ref('')
    const rawBuffer = ref<HTMLElement | null>(null)

    // 配置Markdown解析
    marked.setOptions({ breaks: true })

    // 安全渲染方法
    const safeRender = (md: string) => {
      return DOMPurify.sanitize(marked(md))
    }

    // Mermaid渲染逻辑
    const renderMermaid = async () => {
      await nextTick()
      if (!rawBuffer.value) return

      const mermaidElements = rawBuffer.value.querySelectorAll('.mermaid')
      mermaidElements.forEach(el => {
        try {
          const code = el.textContent?.trim() || ''
          if (code) mermaid.init(undefined, el as HTMLElement)
        } catch (err) {
          console.error('Mermaid渲染失败:', err)
          el.innerHTML = `<div class="error">图表解析错误: ${err.message}</div>`
        }
      })
    }

    // 处理SSE数据流
    const setupSSE = () => {
      const eventSource = new EventSource(props.sseUrl)

      eventSource.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        rawContent.value += data.content
        renderContent()
      })

      eventSource.addEventListener('end', () => {
        eventSource.close()
      })

      eventSource.onerror = () => {
        eventSource.close()
      }
    }

    // 防抖渲染
    let renderTimer: number
    const renderContent = () => {
      clearTimeout(renderTimer)
      renderTimer = setTimeout(() => {
        renderedContent.value = safeRender(rawContent.value)
        renderMermaid()
      }, 200) as unknown as number
    }

    onMounted(setupSSE)

    return { rawContent, renderedContent, rawBuffer }
  }
})
</script>

<style scoped>
.sse-renderer {
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
}

.render-area {
  min-height: 300px;
  border-top: 1px solid #ddd;
  margin-top: 20px;
  padding-top: 20px;
}

.error {
  color: #d32f2f;
  background: #ffebee;
  padding: 8px;
  border-radius: 4px;
}
</style>