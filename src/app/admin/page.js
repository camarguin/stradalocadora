'use client'
import { LoginForm } from '@/components/LoginForm'
import { useAuth } from '@/contexts/auth'
import { useVehicles } from '@/hooks/useVehicles'
import { Button, Center, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function Admin() {
  const { user } = useAuth()

  if (!user) {
    return (
      <Flex
        height='300px'
        justify='center'
        align='center'
      >
        <LoginForm />
      </Flex>
    )
  } else {
    return (
      <Flex>
        <Text fontSize='2xl'>Bem vindo de volta, escolha uma das opções no menu acima</Text>
      </Flex>
    )
  }
}
