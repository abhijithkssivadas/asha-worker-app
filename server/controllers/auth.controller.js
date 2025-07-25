const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// register-AshaWorker
const registerASHAWorker = async (req, res) => {
  const { full_name, mobile_number } = req.body;

  // Basic input validation
  if (!full_name || !mobile_number) {
    return res.status(400).json({ message: 'Full name and mobile number are required' });
  }

  // Validate full name: letters & spaces only, min 3 characters
  const nameRegex = /^[a-zA-Z ]{3,}$/;
  if (!nameRegex.test(full_name.trim())) {
    return res.status(400).json({
      message: 'Invalid name. Only letters and spaces allowed (min 3 characters)',
    });
  }

  // Validate mobile number: 10 digits, starts with 6-9
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(mobile_number)) {
    return res.status(400).json({
      message: 'Invalid mobile number. Must be 10 digits and start with 6-9',
    });
  }

  try {
    const existing = await prisma.aSHAWorker.findUnique({
      where: { mobile_number },
    });

    if (existing) {
      return res.status(400).json({ message: 'Mobile number already registered' });
    }

    const newWorker = await prisma.aSHAWorker.create({
      data: {
        full_name: full_name.trim(),
        mobile_number,
      },
    });

    return res.status(201).json(newWorker);
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// verify-OTP
const verifyOTP = async (req, res) => {
  const { mobile_number, otp_code } = req.body;

  try {
    const otpEntry = await prisma.oTPVerification.findFirst({
      where: {
        mobile_number,
        otp_code
      },
      orderBy: {
        expires_at: 'desc'
      }
    });

    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const now = new Date();
    if (otpEntry.expires_at < now) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    return res.status(200).json({ message: 'OTP Verified ✅' });
  } catch (error) {
    console.error('OTP verification Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

//send otp

const sendOTP = async (req, res) =>{
  const {mobile_number} = req.body;

if(!mobile_number){
  return res.status(400).json({message: 'Mobile number is required'})
}
//validaate mobile number
const mobileRegex = /^[6-9]\d{9}$/;
if(!mobileRegex.test(mobile_number)){
  return res.status(400).json({message:'Invalid mobile number format'})
}
try{
  // Check if Asha Worker exists
  const worker = await prisma.aSHAWorker.findUnique({
    where:{mobile_number}
  })
  if(!worker){
    return res.status(404).json({message:'Mobile number not registed'})
  }
  //generate OTP
  const otp_code = Math.floor(100000 + Math.random() * 900000).toString()
  const expires_at = new Date(Date.now() + 5 * 60 * 1000);

  // storing otp in DB
  await prisma.oTPVerification.create({
    data:{
      mobile_number,
      otp_code,
      expires_at
    }
  })

  return res.status(200).json({
    message:'OTP sent successfully',
    otp: otp_code,
  })
}catch(error){
  console.error('Send OTP Error:',error);
  return res.status(500).json({message:'Server Error'})
  }
}
module.exports = {
  registerASHAWorker,
  verifyOTP,
  sendOTP
};
