import { Employee } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../lib/prisma"

type Data = {
    success: boolean
    data: Employee[]
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const employees = await prisma.employee.findMany({})

  res.status(200).json({
    success: true,
      data: employees
  })
}
