'use client'
import { CardCar } from '@/components/CardCar'
import { Flex, Grid, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const cars = [
  { name: 'car 1', km: '53000', price: '139992', year: '19/20' },
  { name: 'car 2', km: '23000', price: '22000', year: '19/20' },
  { name: 'car 3', km: '139900', price: '30000', year: '19/20' },
  { name: 'car 4', km: '39900', price: '36000', year: '22/23' },
  { name: 'car 5', km: '39900', price: '36000', year: '22/23' },
]

export default function alugar() {
  return (
    <Flex
      p={{ '2xl': '30px 30px', xl: '30px 50px', lg: '30px 40px', md: '30px 30px', sm: '20px 20px', base: '20px 20px' }}
      justify='center'
      direction='column'
    >
      <Heading
        color='myBlue.200'
        // p={{ '2xl': '50px 40px', xl: '50px 0px', lg: '50px 0px', md: '50px 0px' }}

        paddingBottom='30px'
      >
        | Veículos a venda
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
        <CardCar car={cars[0]} />
        <CardCar car={cars[1]} />
        <CardCar car={cars[2]} />
        <CardCar car={cars[3]} />
        <CardCar car={cars[3]} />
        <CardCar car={cars[1]} />
        <CardCar car={cars[0]} />
      </Grid>
    </Flex>
  )
}
