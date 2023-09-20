'use client'

import { Avatar } from '@/app/components/Avatar/Avatar'
import Link from 'next/link'
import {
  Box,
  Link as ChakraLink,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Button,
  Td,
  Tr,
  Text,
  Checkbox,
  Icon,
  AvatarBadge,
} from '@/app/components/chakraui'
import { RiEdit2Line, RiShieldStarFill } from '@/app/components/icons'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import { GetUsersResponse, getUsers } from './useUsers'
import { avatarURL } from '@/utils/avatarURL'

export default function UsersTable() {
  const [page] = useState(1)

  const { data } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers(page),
  }) as UseQueryResult<GetUsersResponse, unknown>

  return (
    <>
      {data?.users.map((user) => {
        return (
          <Tr key={user.id}>
            <Td paddingX="6">
              <Checkbox colorScheme="red" borderColor="gray.500" />
            </Td>
            <Td>
              <Avatar name={user.name} src={avatarURL(user?.avatar)}>
                {user?.role === 'ADMIN' ? (
                  <AvatarBadge border="none" bg="none">
                    <Icon
                      as={RiShieldStarFill}
                      fontSize="15"
                      color="green.500"
                    />
                  </AvatarBadge>
                ) : (
                  <></>
                )}
              </Avatar>
            </Td>
            <Td paddingX="6">
              <Popover
                arrowSize={10}
                arrowShadowColor="red"
                placement="top-start"
                matchWidth={true}
                trigger="hover"
              >
                <PopoverTrigger>
                  <Box>
                    <ChakraLink as={Link} href={`/users/${user.id}`}>
                      <Text fontSize="sm" fontWeight="bold">
                        {user.name}
                      </Text>
                    </ChakraLink>
                    <Text fontSize="sm" color="gray.700">
                      {user.email}
                    </Text>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader textAlign="center">
                    <Avatar
                      size="sm"
                      name={user.name}
                      src={avatarURL(user?.avatar)}
                    />
                  </PopoverHeader>
                  <PopoverBody>
                    <Text fontSize="sm">
                      <strong>Nome: </strong>
                      {user.name}
                    </Text>
                    <Text fontSize="sm">
                      <strong>E-mail: </strong>
                      {user.email}
                    </Text>
                    <Text fontSize="sm">
                      <strong>Setor: </strong>
                      {user.sector}
                    </Text>
                    <Text fontSize="sm">
                      <strong>Data de admissão: </strong>
                      {user.created_at}
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Td>

            <Td>
              <Button
                as="a"
                href={`#`}
                size="sm"
                fontSize="sm"
                fontWeight="normal"
                colorScheme="blackAlpha"
                cursor="pointer"
                leftIcon={<Icon as={RiEdit2Line} fontSize="16" />}
              />
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
