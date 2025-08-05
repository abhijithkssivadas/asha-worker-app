import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAshaWorkerByMobile = async (req, res, next) => {
  const { mobile } = req.params;
  try {
    const asha = await prisma.ashaWorker.findUnique({
      where: { mobile_number: mobile },
    });

    if (!asha) {
      return res.status(404).json({ message: 'ASHA Worker not found' });
    }

    res.status(200).json(asha);
  } catch (error) {
    next(error);
  }
};

const getTotalPatients = async (req, res, next) => {
  const { mobile } = req.params;
  try {
    const ashaWorker = await prisma.ashaWorker.findUnique({
      where: { mobile_number: mobile },
    });

    if (!ashaWorker || !ashaWorker.id) {
      return res.status(404).json({ message: 'ASHA Worker not found' });
    }

    const count = await prisma.patient.count({
      where: {
        ashaWorkerId: ashaWorker.id,
      },
    });

    res.status(200).json({ success: true, count });
  } catch (error) {
    next(error);
  }
};

const getTotalReports = async (req, res, next) => {
  const { mobile } = req.params;

  try {
    const ashaWorker = await prisma.ashaWorker.findUnique({
      where: { mobile_number: mobile },
    });

    if (!ashaWorker || !ashaWorker.id) {
      return res.status(404).json({ success: false, message: "ASHA Worker not found" });
    }

    const count = await prisma.report.count({
      where: {
        asha_worker_id: ashaWorker.id,
      },
    });

    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error in getTotalReports:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getAshaWorkerByMobile,
  getTotalPatients,
  getTotalReports,
};