import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


const registerAshaWorker = async (req, res, next) => {
  const { full_name, mobile_number } = req.body
  try {
    if (!full_name || !mobile_number) {
      const error = new Error("Full name and mobile number are required")
      error.statusCode = 400
      throw error
    }

    const nameRegex = /^[a-zA-Z ]{3,}$/
    if (!nameRegex.test(full_name.trim())) {
      const error = new Error("Invalid name. Only letters and spaces allowed (min 3 characters)")
      error.statusCode = 400
      throw error
    }

    const mobileRegex = /^[6-9]\d{9}$/
    if (!mobileRegex.test(mobile_number)) {
      const error = new Error("Invalid mobile number. Must be 10 digits and start with 6-9")
      error.statusCode = 400
      throw error
    }

    const existing = await prisma.ashaWorker.findUnique({
      where: { mobile_number },
    })

    if (existing) {
      const error = new Error("Mobile number already registered")
      error.statusCode = 409
      throw error
    }

    const newWorker = await prisma.ashaWorker.create({
      data: {
        full_name: full_name.trim(),
        mobile_number,
      },
    })

    return res.status(201).json(newWorker)
  } catch (error) {
    next(error)
  }
}


const sendOTP = async (req, res, next) => {
  const { mobile_number } = req.body;
  try {
    if (!mobile_number) {
      throw new Error("Mobile number is required");
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile_number)) {
      throw new Error("Invalid mobile number format");
    }

    const worker = await prisma.ashaWorker.findUnique({
      where: { mobile_number },
    });

    if (!worker) {
      throw new Error("Mobile number not registered");
    }

    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 5 * 60 * 1000);

    // Store OTP
    await prisma.OTPVerification.create({
      data: {
        mobile_number,
        otp_code,
        expires_at,
      },
    });

    console.log(`Dummy SMS OTP ${otp_code} sent to ${mobile_number}`);

    return res.status(200).json({
      success: true,
      message: "OTP sent",
    })

    
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(error.statusCode || 500).json({ success: false, message: error.message });
    next(error)
  }
};

const verifyOTP = async (req, res, next) => {
  const { mobile_number, otp_code } = req.body
  try {
    if (!mobile_number || !otp_code) {
      const error = new Error("Mobile number and OTP code are required")
      error.statusCode = 400
      throw error
    }

    const otpEntry = await prisma.OTPVerification.findFirst({
      where: {
        mobile_number,
        otp_code,
      },
      orderBy: {
        expires_at: "desc",
      },
    })

    if (!otpEntry) {
      const error = new Error("Invalid OTP")
      error.statusCode = 400
      throw error
    }

    const now = new Date()
    if (otpEntry.expires_at < now) {
      const error = new Error("OTP expired")
      error.statusCode = 400
      throw error
    }

    return res.status(200).json({ success: true, message: "OTP Verified ✅" })
  } catch (error) {
    console.error("Received Body:", req.body);
    next(error)
  }
}

  const getAshaWorkerByMobile = async (req, res, next) => {
  const { mobile_number } = req.params;

  try {
    const asha = await prisma.ashaWorker.findUnique({
      where: { mobile_number },
    });

    if (!asha) {
      return res.status(404).json({ message: "Asha Worker not found" });
    }
    return res.status(200).json({ full_name: asha.full_name });
  } catch (error) {
    next(error);
  }
}



export { registerAshaWorker, sendOTP , verifyOTP, getAshaWorkerByMobile }