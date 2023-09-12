'use client'
import { useVehicles } from '@/hooks/useVehicles'
import { Button, Center } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { vehicles, addVehicles, updateAllVehicles } = useVehicles()

  const handleAddVehicles = () => {
    updateAllVehicles()
  }
  return (
    <Center height='90vh'>
      <Button>
        <Link href='/admin/carros-alugar'>Ver carros para alugar</Link>
      </Button>
      <Button>
        <Link href='/admin/carros-venda'>Ver carros a venda</Link>
      </Button>
      {/* <Button onClick={handleAddVehicles}>click to add many</Button> */}
    </Center>
  )
}
