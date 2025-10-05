'use client'
import { CardCar } from '@/components/CardCar'
import { useVehicles } from '@/hooks/useVehicles'
import { Flex, Grid, GridItem, Heading, Input, Spinner, Box } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'

export default function Alugar() {
  const { getRentalVehicles, addRentalVehicle, deleteRentVehicle } = useVehicles()
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
    () =>
      vehicles.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [vehicles, searchQuery]
  )

  return (
    <Flex
      maxW={'1200px'} // Reduced from 7xl to match carousel width
      margin='0 auto'
      py={10}
      justify='center'
      direction='column'
      px={4} // Added padding for mobile
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
            md: 'repeat(2, 1fr)', // Changed from 3 to 2
            sm: 'repeat(1, 1fr)', // Changed from 2 to 1 for mobile
          }}
          gap={{ xl: 6, lg: 5, md: 4, sm: 3 }} // Consistent spacing like other page
        >
          {filteredVehicles.map((vehicle) => (
            <GridItem key={vehicle.id}>
              <Box
                maxW='300px'
                mx='auto'
              >
                {' '}
                {/* Constrain card width and center */}
                <CardCar
                  isRent
                  car={vehicle}
                />
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </Flex>
  )
}
