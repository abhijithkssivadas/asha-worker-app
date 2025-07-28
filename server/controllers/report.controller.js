import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const createReport = async (req, res) => {
    const { asha_worker_id, date, issues } = req.body

    if (!asha_worker_id || !date || !issues) {
        
    return res.status(400).json({ message: 'All fields are required' })

  }
  try {
    const newReport = await prisma.report.create({
        data: { asha_worker_id, date: new Date(date), issues }
    })
    res.status(201).json(newReport)
  } catch (error) {
    res.status(500).json({message: 'Failed to create Report', error})
  }
}

const getAllReports = async ( req, res ) => {
    try {
        const reports =  await prisma.report.findMany({
            include: {
                asha_worker: {
                    select: { id: true, full_name: true, mobile_number: true }
                }
            }
        })
        res.status(200).json(reports)
    } catch (error) {
        res.status(500).json({message: 'Failed to get reports',error})
    }
}


export {createReport, getAllReports}