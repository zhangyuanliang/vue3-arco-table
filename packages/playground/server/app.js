import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

// 模拟的Markdown数据（含Mermaid）
const markdownContent = [
  '# 煤矿整改方案\n',
  '```',
  'mermaid\n',
  'flowchart TD\n',
  'A[开始整改] --> ',
  'B{评估现状}\n',
  'B -->|高成本| C[关停工作面]\n',
  'B -->|设备老化| D[设备更新]\n',
  'B -->|人员冗余| E[人员优化]\n',
  'C --> F[成本核算]\n',
  'D --> G[技术升级]\n',
  'E --> H[培训重组]\n',
  'F --> I{是否达标}\n',
  'G --> I\n',
  'H --> I\n',
  'I -->|是| J[洗选外包]\n',
  'I -->|否| K[重新评估]\n',
  'K --> B\n',
  'J --> L[质量监控]\n',
  'L --> M{质量合格}\n',
  'M -->|是| N[成本分析]\n',
  'M -->|否| O[改进流程]\n',
  'O --> L\n',
  'N --> P{成本降低}\n',
  'P -->|是| Q[方案确认]\n',
  'P -->|否| R[调整策略]\n',
  'R --> J\n',
  'Q --> S[实施监督]\n',
  'S --> T[效果评估]\n',
  'T --> U{目标达成}\n',
  'U -->|是| V[整改完成]\n',
  'U -->|否| W[持续改进]\n',
  'W --> S\n',
  'V --> X[结束]\n',
  '\n```\n',
  '**预计节约成本**: 2000万元',
]

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')

  console.log('New SSE client connected')

  // 模拟逐字推送
  let index = 0
  let intervalId
  
  const sendChunk = () => {
    if (index < markdownContent.length) {
      const chunk = markdownContent[index]
      res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`)
      index++
      intervalId = setTimeout(sendChunk, 300) // 控制推送速度
    } else {
      res.write('event: end\ndata: stream-end\n\n')
      console.log('Data stream completed')
      // 保持连接开放，不结束响应
    }
  }

  // 处理客户端断开连接
  req.on('close', () => {
    console.log('Client disconnected')
    if (intervalId) {
      clearTimeout(intervalId)
    }
  })

  req.on('error', (err) => {
    console.log('SSE connection error:', err)
    if (intervalId) {
      clearTimeout(intervalId)
    }
  })

  sendChunk()
})

const server = app.listen(3001, () => {
  console.log('SSE server running on http://localhost:3001')
})

// 保持服务器运行
process.on('SIGINT', () => {
  console.log('\nShutting down server...')
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})

// 添加基本的健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})