import express from 'express'
import { createVisit, getAllVisits } from '../controllers/visit.controller.js'
import { createPatient, getAllPatients } from '../controllers/patient.controller.js'
import { createReport, getAllReports } from '../controllers/report.controller.js'

const router = express.Router()

router.post('/visits', createVisit)
router.get('/visits', getAllVisits)
router.post('/patients', createPatient)
router.get('/patients', getAllPatients)
router.post('/reports', createReport)
router.get('/reports', getAllReports)

export default router
