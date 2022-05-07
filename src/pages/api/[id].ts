import { Employee } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../lib/prisma"

type Data = {
    success: boolean;
    data: Employee | null
}

type RequestData = {
    name: string
    email: string
    salary: number
    startDate: string
    title: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const employeeId = req.query.id as string;

    const employee = await prisma.employee.findFirst({
        where: {
            id: parseInt(employeeId)
        }
    })

    if (req.method === 'DELETE') {
        // Process a Delete request
        await prisma.employee.delete({
            where: {
                id: parseInt(employeeId)
            }
        })
    }

    // Handle any other HTTP method
    // Return the employee


    if (!employee) {
        return res.status(400).json({
            success: true,
            data: employee
        })
    }



    return res.status(200).json({
        success: true,
        data: employee
    })
}
