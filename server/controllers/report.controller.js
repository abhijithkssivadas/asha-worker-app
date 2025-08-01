import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createReport = async (req, res, next) => {
  try {
    const { asha_worker_id, date, issues } = req.body;

    if (!asha_worker_id || !date || !issues) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const newReport = await prisma.report.create({
      data: { asha_worker_id, date: new Date(date), issues }
    });

    res.status(201).json(newReport);
  } catch (error) {
    error.statusCode = 500;
    error.message = "Failed to create Report";
    next(error);
  }
};

const getAllReports = async (req, res, next) => {
  try {
    const reports = await prisma.report.findMany({
      include: {
        asha_worker: {
          select: { id: true, full_name: true, mobile_number: true }
        }
      }
    });

    res.status(200).json(reports);
  } catch (error) {
    error.statusCode = 500;
    error.message = "Failed to get reports";
    next(error);
  }
};

export { createReport, getAllReports };
