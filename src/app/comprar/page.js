'use client'
import { CardCar } from '@/components/CardCar'
import { useVehicles } from '@/hooks/useVehicles'
import { Flex, Grid, GridItem, Heading, Input, Spinner, Box } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'

export default function Comprar() {
  const { getSaleVehicles } = useVehicles()
  const [isLoading, setIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const fetchSaleVehicles = async () => {
    try {
      const saleVehicles = await getSaleVehicles()
      console.log('Successfully fetched sales vehicles')
      setVehicles(saleVehicles)
    } catch (error) {
      console.error('Error fetching sales vehicles:', error)
    } finally {
      setIsLoading(false) // Set loading to false when done fetching
    }
  }

  useEffect(() => {
    fetchSaleVehicles()
  }, [])

  const filteredVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) => {
        const { name, year } = vehicle
        return (
          name.toLowerCase().includes(searchQuery.toLowerCase()) || year.toString().includes(searchQuery.toLowerCase())
        )
      }),
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
        | Veículos para comprar
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
          gap={{ xl: 6, lg: 5, md: 4, sm: 3 }} // Consistent spacing
        >
          {filteredVehicles.map((vehicle) => (
            <GridItem key={vehicle.id}>
              <Box maxW="300px" mx="auto"> {/* Constrain card width and center */}
                <CardCar
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
