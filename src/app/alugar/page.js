'use client'
import { CardCar } from '@/components/CardCar'
import { useVehicles } from '@/hooks/useVehicles'
import { Flex, Grid, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export default function Alugar() {
  // const [rentalVehicles, setRentalVehicles] = useState([])
  const { getRentalVehicles, vehicles } = useVehicles()

  const fetchRentalVehicles = async () => {
    try {
      const rentalVehicles = await getRentalVehicles()
      console.log('Fetched rental vehicles:', rentalVehicles)
    } catch (error) {
      console.error('Error fetching rental vehicles:', error)
    }
  }

  useEffect(() => {
    fetchRentalVehicles()
    // setRentalVehicles(fetchRentalVehicles())
  }, [])

  useEffect(() => {
    console.log(vehicles)
  }, [vehicles])

  return (
    <Flex
      maxW={'7xl'}
      margin='0 auto'
      py={10}
      justify='center'
      direction='column'
    >
      <Heading
        color='myBlue.200'
        paddingBottom='30px'
      >
        | Veículos para alugar
      </Heading>
      <Grid
        templateColumns={{
          xl: 'repeat(4, 1fr)',
          lg: 'repeat(3, 1fr)',
          md: 'repeat(3, 1fr)',
          sm: 'repeat(2, 1fr)',
        }}
        gap={{ lg: 10, md: 8, sm: 2 }}
      >
        {/* <button onClick={() => console.log(vehicles)}>test</button> */}
        {vehicles.map((vehicle) => (
          <CardCar
            key={vehicle.id}
            car={vehicle}
          />
        ))}
      </Grid>
    </Flex>
  )
}
