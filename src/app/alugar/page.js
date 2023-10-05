'use client'
import { CardCar } from '@/components/CardCar'
import { useVehicles } from '@/hooks/useVehicles'
import { Flex, Grid, Heading, Input, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'

export default function Alugar() {
  const { getRentalVehicles } = useVehicles()
  const [isLoading, setIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const fetchRentalVehicles = async () => {
    try {
      const rentalVehicles = await getRentalVehicles()
      console.log('Fetched rental vehicles')
      setVehicles(rentalVehicles)
    } catch (error) {
      console.error('Error fetching rental vehicles:', error)
    } finally {
      setIsLoading(false) // Set loading to false when done fetching
    }
  }

  useEffect(() => {
    fetchRentalVehicles()
  }, [])

  const filteredVehicles = useMemo(
    () => vehicles.filter((vehicle) => vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [vehicles, searchQuery]
  )

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
      <Input
        placeholder='Pesquisar veículos...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        marginBottom='20px'
      />

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
          {filteredVehicles.map((vehicle) => (
            <CardCar
              isRent
              key={vehicle.id}
              car={vehicle}
            />
          ))}
        </Grid>
      )}
    </Flex>
  )
}
