import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPatient = async (req, res, next) => {
  try {

    const { name, age, gender, address, health_notes, ashaWorkerId } = req.body;

    if (!name || !age || !gender || !address || !ashaWorkerId) {
      const error = new Error("Missing required fields or ashaWorkerId");
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
        ashaWorkerId: Number(ashaWorkerId), 
      },
    });

    res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      data: newPatient,
    });
  } catch (error) {
    next(error);
  }
};


const getAllPatients = async (req, res, next) => {
  try {
    const { ashaWorkerId } = req.query;

    if (!ashaWorkerId) {
      const error = new Error("ashaWorkerId query parameter is required");
      error.statusCode = 400;
      throw error;
    }

    const patients = await prisma.patient.findMany({
      where: { ashaWorkerId: Number(ashaWorkerId) },
      orderBy: { created_at: "asc" }, 
    });

    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

export { createPatient, getAllPatients };