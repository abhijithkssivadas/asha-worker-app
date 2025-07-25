const express = require('express')
const {registerASHAWorker, verifyOTP, sendOTP} = require('../controllers/auth.controller')

const router = express.Router()

//post -Register
router.post('/register',registerASHAWorker)

//send OTP
router.post('/send-otp',sendOTP)

//verify OTP
router.post('/verify-otp',verifyOTP)


module.exports =router;