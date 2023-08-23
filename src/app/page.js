'use client'
import { About } from '@/components/About'
import { CardCar } from '@/components/CardCar'
import { CardsContainer } from '@/components/CardsContainer'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Menubar } from '@/components/Menubar'
import { Flex, Heading, Text } from '@chakra-ui/react'

const cars = [
  { name: 'car 1', km: '53000', price: '139992', year: '19/20' },
  { name: 'car 2', km: '23000', price: '22000', year: '19/20' },
  { name: 'car 3', km: '139900', price: '30000', year: '19/20' },
  { name: 'car 4', km: '39900', price: '36000', year: '22/23' },
  { name: 'car 5', km: '39900', price: '36000', year: '22/23' },
]

export default function Home() {
  return (
    <>
      <Hero />
      <Flex
        direction='column'
        padding='50px 20px'
      >
        <Heading
          color='myBlue.200'
          padding='30px'
        >
          | Veículos em destaque
        </Heading>
        <Text
          padding='20px 30px'
          fontSize='xl'
          color='myBlue.200'
        >
          Veículos a venda
        </Text>
        <CardsContainer cars={cars} />
        <Text
          padding='20px 30px'
          fontSize='xl'
          color='myBlue.200'
        >
          Veículos para alugar
        </Text>
        <CardsContainer cars={cars} />
      </Flex>
      <About />
    </>
  )
}
