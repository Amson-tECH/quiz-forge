import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import quizRoutes from './routes/quizRoutes.js'
import { env } from './config/env.js'

const app = express()

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
  }),
)
app.use(bodyParser.json({ limit: '4mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'quizforge-api' })
})

app.use('/api', quizRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal server error',
  })
})

export default app