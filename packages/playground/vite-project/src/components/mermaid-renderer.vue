<template>
  <div class="h-full flex flex-col">
    <!-- 图表显示区域 - 占用剩余空间 -->
    <div class="flex-1 border rounded-lg relative bg-gray-50" style="min-height: 400px;">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-10">
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white"></div>
        </div>
      </div>
      
      <!-- 错误状态 -->
      <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
        <div class="text-center p-4">
          <p class="text-destructive mb-2">渲染失败</p>
          <p class="text-sm text-muted-foreground">{{ error }}</p>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="!isLoading && !error && !mermaidCode" class="absolute inset-0 flex items-center justify-center">
        <p class="text-muted-foreground">请生成Mermaid代码以查看图表</p>
      </div>
      
      <div 
        ref="containerRef"
        class="w-full overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-300"
        :style="{ touchAction: 'none', height: currentHeight, minHeight: '200px' }"
      >
        <div 
          ref="mermaidRef" 
          class="w-full flex items-center justify-center p-4"
          :style="{ minHeight: '200px' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

// Props
const props = defineProps({
  mermaidCode: {
    type: String,
    default: ''
  }
})

// Refs
const mermaidRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const currentHeight = ref('auto')
let mounted = true

// 清理函数：移除任何残留的mermaid元素
const cleanupMermaidElements = () => {
  // 只清理可能冲突的特定ID元素，避免清理包含错误信息的元素
  const specificId = mermaidRef.value?.getAttribute('data-mermaid-id')
  if (specificId) {
    const existingElement = document.getElementById(specificId)
    if (existingElement && existingElement.parentNode && !mermaidRef.value?.contains(existingElement)) {
      existingElement.parentNode.removeChild(existingElement)
    }
  }
  
  // 清理明显的残留元素（不在我们容器内的）
  const strayElements = document.querySelectorAll('[id^="dmermaid-"]')
  strayElements.forEach(element => {
    if (element.parentNode && !mermaidRef.value?.contains(element)) {
      element.parentNode.removeChild(element)
    }
  })
}

// 检查代码是否可以尝试渲染（更宽松的检查）
const canAttemptRender = (code: string) => {
  if (!code.trim()) return false
  
  // 只要有基本的mermaid图表类型声明就尝试渲染
  const hasValidStart = /^\s*(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|gitgraph|mindmap|timeline|sankey|xyChart|quadrantChart|requirement|c4Context)/i.test(code)
  return hasValidStart
}

// 渲染 Mermaid 图表
const renderMermaid = async () => {
  if (!props.mermaidCode || !mermaidRef.value) {
    isLoading.value = false
    return
  }
  
  // 如果代码无法尝试渲染，显示加载状态
  if (!canAttemptRender(props.mermaidCode)) {
    isLoading.value = true
    error.value = null
    return
  }

  try {
    // 在开始渲染前，记录当前容器高度以防止塌陷
    if (containerRef.value && containerRef.value.offsetHeight > 200) {
      currentHeight.value = containerRef.value.offsetHeight + 'px'
    } else {
      currentHeight.value = '400px'
    }
    
    isLoading.value = true
    error.value = null

    // Dynamic import to avoid SSR issues
    const mermaid = (await import('mermaid')).default

    // 尝试解析，如果失败则静默处理（可能是部分代码）
    try {
      await mermaid.parse(props.mermaidCode)
    } catch (parseError) {
      // 解析失败，可能是部分代码，继续尝试渲染
    }

    // 语法正确，清理可能的冲突元素
    cleanupMermaidElements()

    // Clear previous content
    // mermaidRef.value.innerHTML = ''

    // Generate unique ID for this render
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
    
    // 存储ID用于后续清理
    mermaidRef.value.setAttribute('data-mermaid-id', id)
    
    // Render the diagram
    const { svg } = await mermaid.render(id, props.mermaidCode)
    
    if (mounted) {
      mermaidRef.value.innerHTML = svg
      isLoading.value = false
      error.value = null
      
      // 渲染完成后，立即测量新内容高度并平滑过渡
      nextTick(() => {
        if (containerRef.value) {
          currentHeight.value = 'auto'
          
          nextTick(() => {
            if (containerRef.value) {
              const actualHeight = containerRef.value.offsetHeight
              if (actualHeight > 0) {
                currentHeight.value = actualHeight + 'px'
                setTimeout(() => {
                  currentHeight.value = 'auto'
                }, 50)
              }
            }
          })
        }
      })
      

    }
  } catch (err) {
    if (mounted) {
      console.error('Mermaid渲染错误:', err)
      // 如果是明显的语法错误，显示错误信息
      if (err instanceof Error && err.message && err.message.includes('Parse error')) {
        error.value = `语法错误: ${err.message}`
        isLoading.value = false
      } else {
        // 其他错误，可能是部分代码，保持加载状态
        isLoading.value = true
        error.value = null
      }
    }
  }
}

// 监听 mermaidCode 变化，立即尝试渲染
watch(
  () => props.mermaidCode,
  () => {
    nextTick(() => {
      renderMermaid()
    })
  },
  { immediate: true }
)

// 生命周期
onMounted(() => {
  mounted = true
})

onUnmounted(() => {
  mounted = false
  // 组件卸载时清理
  cleanupMermaidElements()
})
</script>

<style scoped>
/* 如果需要额外的样式可以在这里添加 */
</style>