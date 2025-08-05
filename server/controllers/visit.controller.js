import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const createVisit = async (req, res, next) => {
  try {
    const { asha_worker_id, patient_name, visit_date, note } = req.body;

    if (!asha_worker_id || !patient_name || !visit_date) {
      const error = new Error("asha_worker_id, patient_name, and visit_date are required");
      error.statusCode = 400;
      throw error;
    }

    const [day, month, year] = visit_date.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}`);

    if (isNaN(formattedDate.getTime())) {
      const error = new Error("Invalid date format. Use 'dd/mm/yyyy'.");
      error.statusCode = 400;
      throw error;
    }

    const newVisit = await prisma.upcomingVisit.create({
      data: {
        asha_worker_id,
        patient_name,
        visit_date: formattedDate,
        note,
      },
    });

    res.status(201).json(newVisit);
  } catch (error) {
    next(error);
  }
};

const getAllVisits = async (req, res, next) => {
  try {
    const { asha_worker_id } = req.query;

    if (!asha_worker_id) {
      return res.status(400).json({ error: "asha_worker_id is required in query" });
    }

    const visits = await prisma.upcomingVisit.findMany({
      where: {
        asha_worker_id: Number(asha_worker_id),
      },
      orderBy: {
        visit_date: "asc",
      },
    });

    const formattedVisits = visits.map((visit) => {
      const date = new Date(visit.visit_date);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return {
        ...visit,
        visit_date: `${day}/${month}/${year}`,
        note: visit.note || "No health notes",
      };
    });

    res.status(200).json(formattedVisits);
  } catch (error) {
    next(error);
  }
};

export { createVisit, getAllVisits };