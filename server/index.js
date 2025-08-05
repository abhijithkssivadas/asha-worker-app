import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import apiRoutes from './routes/api.routes.js'
import ashaRoutes from './routes/asha.routes.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api', authRoutes)
app.use('/api', apiRoutes)
app.use('/api', ashaRoutes)

// Error handler
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send("AshaPath Backend is Running ✅")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})