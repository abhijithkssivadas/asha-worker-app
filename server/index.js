import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import authRoutes from './routes/auth.routes.js'
import errorHandler from './middleware/errorHandler.js'
import dotenv from "dotenv";
dotenv.config();

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use(errorHandler)

// Routes
app.use('/api', authRoutes)

app.get('/', (req, res) => {
  res.send("AshaPath Backend is Running ✅")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})