<template>
  <div class="container">
    <h1>实时报告演示</h1>
    <SSERenderer sse-url="http://localhost:3001/sse" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SSERenderer from './components/SSERenderer.vue'

export default defineComponent({
  components: { SSERenderer }
})
</script>