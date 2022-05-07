import * as React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../Link';
import Copyright from '../Copyright';
import { Employee } from '@prisma/client';
import prisma from '../lib/prisma';
import CreateEmployeeForm from '../components/CreateEmployeeForm';

type Props = {
  data: Employee[]
}

const CreateEmployee: NextPage<Props> = ({data}) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create Employee!!
        </Typography>
        {/* Form */}
        <CreateEmployeeForm employees={data} />
        <Box maxWidth="sm" mb={2}>
          <Button variant="contained" component={Link} noLinkStyle href="/">
            See Employees
          </Button>
        </Box>
        <Copyright />
      </Box>
    </Container>
  );
};


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const employees = await prisma.employee.findMany()

  // @ts-ignore
  const processed = (employees.map((e) => ({
    ...e,
    startDate: e.startDate.toJSON()
  }))) as Employee[]

  return {
    props: {
      data: processed
    }, // will be passed to the page component as props
  }
}


export default CreateEmployee;
