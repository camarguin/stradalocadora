'use client'
import { About } from '@/components/About'
import { CardCar } from '@/components/CardCar'
import { CardsContainer } from '@/components/CardsContainer'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Menubar } from '@/components/Menubar'
import { useVehicles } from '@/hooks/useVehicles'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const { getFeaturedSaleVehicles, getFeaturedRentalVehicles } = useVehicles()
  const [isLoadingS, setIsLoadingS] = useState(true)
  const [isLoadingR, setIsLoadingR] = useState(true)
  const [rentVehicles, setRentVehicles] = useState([])
  const [saleVehicles, setSaleVehicles] = useState([])

  const fetchFeaturedSaleVehicles = async () => {
    try {
      const featuredSaleVehicles = await getFeaturedSaleVehicles()
      console.log('Successfully fetched featured sales vehicles')
      setSaleVehicles(featuredSaleVehicles)
    } catch (error) {
      console.error('Error fetching featured sales vehicles:', error)
    } finally {
      setIsLoadingS(false) // Set loading to false when done fetching
    }
  }

  const fetchFeaturedRentlVehicles = async () => {
    try {
      const featuredRentVehicles = await getFeaturedRentalVehicles()
      console.log('Successfully fetched featured rental vehicles:')
      setRentVehicles(featuredRentVehicles)
    } catch (error) {
      console.error('Error fetching featured rental vehicles:', error)
    } finally {
      setIsLoadingR(false) // Set loading to false when done fetching
    }
  }

  useEffect(() => {
    fetchFeaturedSaleVehicles()
    fetchFeaturedRentlVehicles()
  }, [])

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
        <CardsContainer
          cars={saleVehicles}
          linkTo='/comprar'
        />
        <Text
          padding='20px 30px'
          fontSize='xl'
          color='myBlue.200'
        >
          Veículos para alugar
        </Text>
        <CardsContainer
          cars={rentVehicles}
          linkTo='/alugar'
        />
      </Flex>
      <About />
    </>
  )
}
