import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Employee } from '@prisma/client';
import { IconButton } from "@mui/material"
import { DeleteForever } from "@mui/icons-material"
import axios from "axios"
import { useRouter } from 'next/router';

type Props = {
  employees: Employee[]
}

const EmployeeTable: React.FunctionComponent<Props> = ({
  employees
}) => {
  const [isLoading, setIsloading] = React.useState(false)
  const router = useRouter()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Gross Annual Salary</TableCell>
            <TableCell align="right">Federal Tax@10%</TableCell>
            <TableCell align="right">State Tax@5%</TableCell>
            <TableCell align="right">Other Tax@3%</TableCell>
            <TableCell align="right">In-hand Annual Salary</TableCell>
            <TableCell align="right">In-hand Monthly Salary</TableCell>
            <TableCell align="right">Delete?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((row) => {
            const salary = row.salary
            const fedTax = (salary / 100) * 10
            const stateTax = (salary / 100) * 5
            const otherTax = (salary / 100) * 3
            const inHandSalary = salary - fedTax - stateTax - otherTax
            const inHandMonthly = inHandSalary / 12
            return (
              <TableRow
                key={`${row.name}-${row.id}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                selected={isLoading}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{Math.round(row.salary * 100) / 100}</TableCell>
                <TableCell align="right">{Math.round(fedTax * 100) / 100}</TableCell>
                <TableCell align="right">{Math.round(stateTax * 100) / 100}</TableCell>
                <TableCell align="right">{Math.round(otherTax * 100) / 100}</TableCell>
                <TableCell align="right">{Math.round(inHandSalary * 100) / 100}</TableCell>
                <TableCell align="right">{Math.round(inHandMonthly * 100) / 100}</TableCell>
                <TableCell align="center">

                  <IconButton
                    disabled={isLoading}
                    onClick={() => {
                      // delete this row
                      setIsloading(true)
                      axios.delete(`/api/${row.id}`).then((res) => {
                        console.log(res)
                        setIsloading(false)
                        // @ts-ignore
                        router.reload(window.location.pathname)
                      }).catch((e) => {
                        console.log(e)
                        setIsloading(false)
                      })
                    }}>
                    <DeleteForever />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable 