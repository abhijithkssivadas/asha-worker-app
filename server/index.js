const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const authRoutes = require('./routes/auth.routes')

const app = express()
const prisma = new PrismaClient()
app.use(cors())
app.use(express.json())

//Routes
app.use('/api', authRoutes);

app.get('/',(req,res)=>{
    res.send("AshaPath Backend is Running ✅")
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost: :${PORT}`);
})