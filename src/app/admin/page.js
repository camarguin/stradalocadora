'use client'
import { useVehicles } from '@/hooks/useVehicles'
import { Button, Center } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { vehicles, addVehicles, updateAllVehicles } = useVehicles()

  // const vehiclesWithPercentage = vehiclesFromExcel.map((vehicle) => ({
  //   ...vehicle,
  //   percentage: (vehicle.price * 100) / vehicle.fipe,
  // }))

  const handleAddVehicles = () => {
    updateAllVehicles()
  }
  return (
    <Center height='90vh'>
      v
      <Button>
        <Link href='/admin/carros-alugar'>1</Link>
      </Button>
      <Button>
        <Link href='/admin/carros-venda'>2</Link>
      </Button>
      {/* <Button onClick={handleAddVehicles}>click to add many</Button> */}
    </Center>
  )
}
