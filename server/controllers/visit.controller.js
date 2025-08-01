import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

// Create New Visit
const createVisit = async (req, res, next) => {
  try {
    const { asha_worker_id, patient_id, visit_on, note } = req.body;

    if (!asha_worker_id || !patient_id || !visit_on) {

      const error = new Error("asha_worker_id, patient_id, and visit_on are required");
      error.statusCode = 400;
      throw error;
      
    }

    const newVisit = await prisma.visit.create({
      data: {
        asha_worker_id,
        patient_id,
        visit_on: new Date(visit_on),
        note,
      },
    });

    res.status(201).json(newVisit);

  } catch (error) {
    next(error);
  }
};

// List All Visits
const getAllVisits = async (req, res, next) => {
  try {
    const visits = await prisma.visit.findMany({
      include: {
        asha_worker: { select: { full_name: true } },
        patient: { select: { name: true, age: true, gender: true } },
      },
      orderBy: { visit_on: "desc" },
    });

    res.status(200).json(visits);

  } catch (error) {
    next(error);
  }
};
 
export { createVisit, getAllVisits };
