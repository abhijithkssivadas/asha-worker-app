import express from 'express'
import { registerAshaWorker, verifyOTP, sendOTP, getAshaWorkerByMobile } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', registerAshaWorker)
router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTP)
router.get('/asha/:mobile_number', getAshaWorkerByMobile)

export default router
