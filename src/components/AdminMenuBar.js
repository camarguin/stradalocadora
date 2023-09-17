'use client'
import React from 'react'
import Link from 'next/link'
import { Button, HStack } from '@chakra-ui/react'
import { useAuth } from '@/contexts/auth'

export const AdminMenuBar = () => {
  const { user, signout } = useAuth()

  const handleLogout = async () => {
    try {
      await signout()
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <HStack
      bg='myBlue.200'
      padding='10px'
      color='white'
      justifyContent='space-between'
    >
      {!user ? (
        <Link href='/admin'>Home</Link>
      ) : (
        <>
          <HStack spacing={7}>
            <Link href='/admin'>Home</Link>
            <Link href='/admin/carros-venda'>Carros para vender</Link>
            <Link href='/admin/carros-alugar'>Carros para alugar</Link>
          </HStack>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
    </HStack>
  )
}
