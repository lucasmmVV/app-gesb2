'use client'

import {
  Box,
  Checkbox,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@/app/components/chakraui'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { GetEmployeesResponse, getEmployees } from './getEmployees'
import EmployeesTable from './EmployeesTable'
import { useState } from 'react'
import { Pagination } from '@/app/components/Pagination'
import { EmployeeForm } from './EmployeeForm'

export default function Employees() {
  const [page, setPage] = useState(1)

  const { data } = useQuery({
    queryKey: ['employees', page],
    queryFn: () => getEmployees(page),
  }) as UseQueryResult<GetEmployeesResponse, unknown>
  return (
    <Box flex="1" borderRadius="8" bg="gray.200" padding="8">
      <Flex marginBottom="8" justify="space-between" align="center">
        <EmployeeForm />
      </Flex>

      <>
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th paddingX="6" color="gray.800" width="8">
                <Checkbox colorScheme="red" borderColor="gray.500" />
              </Th>
              <Th width="4" />
              <Th>Colaborador</Th>

              <Th width="8"></Th>
            </Tr>
          </Thead>

          <Tbody>
            <EmployeesTable />
          </Tbody>
        </Table>
        <Pagination
          totalCountOfRegisters={data?.totalCount}
          currentPage={page}
          onPageChange={setPage}
        />
      </>
    </Box>
  )
}
