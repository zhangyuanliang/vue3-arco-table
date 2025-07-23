import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

// 模拟的Markdown数据（含Mermaid）
const markdownContent = [
  '# 煤矿整改方案\n',
  '```mermaid\ngantt\n  title 彭庄煤矿整改时间表',
  '\n  dateFormat  YYYY-MM-DD',
  '\n  section 紧急止血',
  '\n  关停高成本工作面 :active, 2025-07-01, 30d',
  '\n  洗选外包 :done, 2025-07-10, 20d',
  '\n```\n',
  '**预计节约成本**: 2000万元'
]

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  // 模拟逐字推送
  let index = 0
  const sendChunk = () => {
    if (index < markdownContent.length) {
      const chunk = markdownContent[index]
      res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`)
      index++
      setTimeout(sendChunk, 300) // 控制推送速度
    } else {
      res.write('event: end\ndata: stream-end\n\n')
      res.end()
    }
  }

  sendChunk()
})

app.listen(3001, () => {
  console.log('SSE server running on http://localhost:3001')
})