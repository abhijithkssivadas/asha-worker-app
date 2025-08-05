import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
const prisma = new PrismaClient();

const generateFixedOTP = (mobile) => {
  const hash = crypto.createHash("sha256").update(mobile).digest("hex");
  return parseInt(hash.substring(0, 6), 16).toString().substring(0, 6);
};

const registerAshaWorker = async (req, res, next) => {
  const { full_name, mobile_number } = req.body;

  try {
    if (!full_name || !mobile_number) {
      return res.status(400).json({ success: false, message: "Full name and mobile number are required" });
    }

    if (!/^[a-zA-Z ]{3,}$/.test(full_name.trim())) {
      return res.status(400).json({ success: false, message: "Invalid name. Minimum 3 letters only." });
    }

    if (!/^[6-9]\d{9}$/.test(mobile_number)) {
      return res.status(400).json({ success: false, message: "Invalid mobile number format" });
    }

    const exists = await prisma.ashaWorker.findUnique({ where: { mobile_number } });
    if (exists) {
      return res.status(409).json({ success: false, message: "Mobile number already registered" });
    }

    const newWorker = await prisma.ashaWorker.create({
      data: {
        full_name: full_name.trim(),
        mobile_number,
      },
    });

    return res.status(201).json({ success: true, data: newWorker });
  } catch (error) {
    console.error("Register Error:", error);
    next(error);
  }
};

const sendOTP = async (req, res, next) => {
  const { mobile_number } = req.body;

  try {
    if (!mobile_number || !/^[6-9]\d{9}$/.test(mobile_number)) {
      return res.status(400).json({ success: false, message: "Valid mobile number required" });
    }

    const worker = await prisma.ashaWorker.findUnique({ where: { mobile_number } });
    if (!worker) {
      return res.status(404).json({ success: false, message: "Mobile number not registered" });
    }

    const otp_code = generateFixedOTP(mobile_number);
    const expires_at = new Date(Date.now() + 5 * 60 * 1000); 
    await prisma.oTPVerification.create({
      data: { mobile_number, otp_code, expires_at },
    });

    console.log(` OTP sent to ${mobile_number}: ${otp_code}`);

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    next(error);
  }
};

const verifyOTP = async (req, res, next) => {
  const { mobile_number, otp_code } = req.body;

  try {
    if (!mobile_number || !otp_code) {
      return res.status(400).json({ success: false, message: "Mobile number and OTP required" });
    }

    const entry = await prisma.oTPVerification.findFirst({
      where: { mobile_number, otp_code },
      orderBy: { expires_at: "desc" },
    });

    if (!entry) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date() > entry.expires_at) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    const worker = await prisma.ashaWorker.findUnique({ where: { mobile_number } });
    if (!worker) {
      return res.status(404).json({ success: false, message: "ASHA Worker not found" });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified",
      id: worker.id,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    next(error);
  }
};

const getAshaWorkerByMobile = async (req, res, next) => {
  const { mobile_number } = req.params;

  try {
    const asha = await prisma.ashaWorker.findUnique({ where: { mobile_number } });

    if (!asha) {
      return res.status(404).json({ success: false, message: "ASHA Worker not found" });
    }

    return res.status(200).json({ success: true, full_name: asha.full_name });
  } catch (error) {
    console.error("Fetch ASHA Worker Error:", error);
    next(error);
  }
};

export {
  registerAshaWorker,
  sendOTP,
  verifyOTP,
  getAshaWorkerByMobile,
};