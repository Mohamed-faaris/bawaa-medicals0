import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { db } from '@bawaa/drizzle-db'
import userRoutes from './routes/users'
import productRoutes from './routes/products'
import { logger, errorHandler, notFound } from './middleware'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(logger)

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Bavaa Medicals API Running',
    version: '1.0.0',
    db: db
  })
})

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// API Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

// 404 Handler
app.use(notFound)

// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})