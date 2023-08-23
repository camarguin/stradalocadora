import { HStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export const AdminMenuBar = () => {
  return (
    <HStack
      bg='myBlue.200'
      padding='10px'
      color='white'
      spacing={7}
    >
      <Link href='/admin/carros-venda'>Carros para vender</Link>
      <Link href='/admin/carros-alugar'>Carros para alugar</Link>
    </HStack>
  )
}
