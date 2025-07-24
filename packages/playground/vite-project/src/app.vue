<template>
  <div class="container">
    <h1>实时Mermaid演示</h1>
    
    <!-- 普通Markdown内容 -->
    <!-- <div v-if="markdownContent" class="markdown-section">
      <h2>Markdown内容</h2>
      <div class="markdown-body" v-html="renderedMarkdown"></div>
    </div> -->
    
    <!-- Mermaid图表 -->
    <div class="mermaid-section">
      <div v-if="!mermaidCode" class="empty-state">
        <p>加载中...</p>
      </div>
      <MermaidRenderer v-else :mermaid-code="mermaidCode" />
    </div>
    
    <!-- 无内容提示 -->
    <div v-if="!markdownContent && !mermaidCode && !sseContent" class="empty-state">
      <p>等待SSE数据...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import MermaidRenderer from './components/mermaid-renderer.vue'

// 定义组件类型
interface ComponentProps {
  mermaidCode: string
}

const sseContent = ref<string>('')
const renderedMarkdown = ref<string>('')

// 配置Markdown解析
marked.setOptions({ breaks: true })

// 提取Mermaid代码块 - 支持流式渲染，只截取到最后一个完整的\n前的内容
const mermaidCode = computed(() => {
  // 查找```mermaid开始标记
  const startMatch = sseContent.value.match(/```mermaid\s*/)
  if (!startMatch || startMatch.index === undefined) {
    return ''
  }
  
  // 获取mermaid代码开始位置
  const startIndex = startMatch.index + startMatch[0].length
  
  // 查找结尾```，如果没有找到就取到字符串末尾
  const endMatch = sseContent.value.substring(startIndex).match(/```/)
  const endIndex = endMatch && endMatch.index !== undefined ? startIndex + endMatch.index : sseContent.value.length
  
  // 提取代码内容
  let code = sseContent.value.substring(startIndex, endIndex)
  
  // 只截取到最后一个完整的\n前的内容，避免处理不完整的行
  const lastNewlineIndex = code.lastIndexOf('\n')
  if (lastNewlineIndex !== -1 && lastNewlineIndex < code.length - 1) {
    // 如果最后一个\n后面还有内容，说明最后一行可能不完整，截取到\n为止
    code = code.substring(0, lastNewlineIndex + 1)
  }
  
  return code.trim()
})

// 提取普通Markdown内容（移除Mermaid代码块）
const markdownContent = computed(() => {
  const content = sseContent.value.replace(/```mermaid[\s\S]*?```/g, '')
  return content.trim()
})

// 渲染Markdown内容
const renderMarkdown = async (content: string): Promise<void> => {
  if (!content) {
    renderedMarkdown.value = ''
    return
  }
  try {
    const html = await marked(content)
    renderedMarkdown.value = DOMPurify.sanitize(html)
  } catch (error) {
    console.error('Markdown渲染错误:', error)
    renderedMarkdown.value = '<p>Markdown渲染失败</p>'
  }
}

// 监听markdownContent变化并渲染
watch(markdownContent, (newContent) => {
  renderMarkdown(newContent)
}, { immediate: true })

// 自动滚动到底部
const scrollToBottom = (): void => {
  nextTick(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  })
}

// 监听SSE内容变化，自动滚动到底部
watch(sseContent, () => {
  scrollToBottom()
})

// 处理SSE数据流
const setupSSE = (): void => {
  const eventSource = new EventSource('http://localhost:3001/sse')

  eventSource.addEventListener('message', (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data)
      sseContent.value += data.content
    } catch (error) {
      console.error('SSE数据解析错误:', error)
    }
  })

  eventSource.addEventListener('end', () => {
    eventSource.close()
  })

  eventSource.onerror = (error) => {
    console.error('SSE连接错误:', error)
    eventSource.close()
  }
}

onMounted(setupSSE)
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.markdown-section, .mermaid-section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: #fff;
}



.markdown-section h2, .mermaid-section h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.markdown-body {
  line-height: 1.6;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
}

.btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #45a049;
}
</style>