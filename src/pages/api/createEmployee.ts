import { Employee } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../lib/prisma"

type Data = {
  success: true
  data: Employee
}

type RequestData = {
  name: string
  email: string
  salary: number
  startDate: string
  title: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    // Process a POST request
    console.log("Post Rwquest")
  } else {
    // Handle any other HTTP method
  }

  const data = req.body as RequestData;

  const createdEmployee = await prisma.employee.create({
    data:{
      email: data.email,
      salary: data.salary,
      startDate: data.startDate,
      title: data.title,
      name: data.name
    }
  })

  res.status(200).json({ success: true, data:createdEmployee })
}
