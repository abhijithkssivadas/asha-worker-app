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

    const [dd, mm, yyyy] = date.split('/');
    const formattedDate = new Date(`${yyyy}-${mm}-${dd}`);

   if (
  isNaN(formattedDate.getTime()) || 
  parseInt(dd) > 31 ||             
  parseInt(mm) > 12 ||           
  parseInt(dd) < 1 || parseInt(mm) < 1
) {
  const error = new Error("Invalid date format or invalid day/month value");
  error.statusCode = 400;
  return next(error);
}

    const newReport = await prisma.report.create({
      data: {
        asha_worker_id,
        date: formattedDate,
        issues,
      },
    });

    res.status(201).json({ success: true, data: newReport });
  } catch (error) {
    error.statusCode = 500;
    error.message = "Failed to create Report";
    next(error);
  }
};

const getAllReports = async (req, res, next) => {
  const { asha_worker_id } = req.query;

  try {
    const reports = await prisma.report.findMany({
      where: {
        asha_worker_id: Number(asha_worker_id),
      },
      include: {
        asha_worker: {
          select: { id: true, full_name: true, mobile_number: true },
        },
      },
    });

    res.status(200).json(reports);
  } catch (error) {
    error.statusCode = 500;
    error.message = 'Failed to get reports';
    next(error);
  }
};


export { createReport, getAllReports };