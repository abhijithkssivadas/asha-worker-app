import express from 'express'
import { registerAshaWorker, verifyOTP, sendOTP } from '../controllers/auth.controller.js'
import { createVisit, getAllVisits } from '../controllers/visit.controller.js'
import { createPatient, getAllPatients } from '../controllers/patient.controller.js'
import { createReport, getAllReports } from '../controllers/report.controller.js'

const router = express.Router()

router.post('/register', registerAshaWorker)
router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTP)
router.post('/createVisit', createVisit)
router.get('/getAllVisits', getAllVisits)
router.post('/createPatient', createPatient)
router.get('/getAllePatient', getAllPatients)
router.post('/createReport', createReport)
router.get('/getAllReport', getAllReports)


export default router