import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create New Patient
const createPatient = async (req, res, next) => {
  try {
    const { name, age, gender, address, health_notes } = req.body;

    if (!name || !age || !gender || !address) {
      const error = new Error("Name, age, gender, and address are required");
      error.statusCode = 400;
      throw error;
    }

    const newPatient = await prisma.patient.create({
      data: {
        name,
        age: Number(age),
        gender,
        address,
        health_notes,
      },
    });

    res.status(201).json(newPatient);
  } catch (error) {
    next(error);
  }
};

// List All Patients
const getAllPatients = async (req, res, next) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { created_at: "desc" },
    });

    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

export { createPatient, getAllPatients };
