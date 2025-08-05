import express from 'express';
const router = express.Router();

import {
  getAshaWorkerByMobile,
  getTotalPatients,
  getTotalReports,
} from '../controllers/asha.controller.js';

router.get('/asha/:mobile', getAshaWorkerByMobile);
router.get('/asha/:mobile/total-patients', getTotalPatients);
router.get('/asha/:mobile/total-reports', getTotalReports);

export default router;