'use client'
import { CardCar } from '@/components/CardCar'
import { useVehicles } from '@/hooks/useVehicles'
import { Flex, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'

export default function Comprar() {
  const { getSaleVehicles } = useVehicles()
  const [isLoading, setIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])

  const fetchRentalVehicles = async () => {
    try {
      const saleVehicles = await getSaleVehicles()
      console.log('Successfully fetched sales vehicles')
      setVehicles(saleVehicles)
    } catch (error) {
      console.error('Error fetching rental vehicles:', error)
    } finally {
      setIsLoading(false) // Set loading to false when done fetching
    }
  }

  useEffect(() => {
    fetchRentalVehicles()
  }, [])

  const memoizedVehicles = useMemo(() => vehicles, [vehicles])

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
        | Veículos para comprar
      </Heading>
      {isLoading ? (
        <Flex
          w='100%'
          justify='center'
        >
          <Spinner color='myBlue.200' />
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            xl: 'repeat(4, 1fr)',
            lg: 'repeat(3, 1fr)',
            md: 'repeat(3, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
          gap={{ lg: 10, md: 8, sm: 2 }}
        >
          {memoizedVehicles.map((vehicle) => (
            <CardCar
              key={vehicle.id}
              car={vehicle}
            />
          ))}
        </Grid>
      )}
    </Flex>
  )
}
