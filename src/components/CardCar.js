'use client'
import {
  Flex,
  Circle,
  Box,
  Badge,
  useColorModeValue,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Stack,
  Icon,
} from '@chakra-ui/react'
import { BsCalendarRange, BsSpeedometer2 } from 'react-icons/bs'
import Image from 'next/image'

import React from 'react'

export const CardCar = ({ car }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price)
  const formattedKm = Number(car.km).toLocaleString('pt-BR')

  return (
    <Flex
      w='full'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW='sm'
        borderWidth='1px'
        rounded='lg'
        shadow='lg'
        position='relative'
      >
        <Box
          roundedTop='lg'
          overflow='hidden'
        >
          <Image
            src='https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
            alt='Picture of the car'
            width={300}
            height={200}
          />
        </Box>
        <VStack p='40px 0px'>
          <Heading size='md'>{car.name}</Heading>
          <HStack spacing={4}>
            <Stack
              direction='row'
              align='center'
            >
              <Icon
                as={BsSpeedometer2}
                color='myGreen.300'
                boxSize={6}
              />
              <Text>{formattedKm} km</Text>
            </Stack>
            <Stack
              direction='row'
              align='center'
            >
              <Icon
                as={BsCalendarRange}
                color='myGreen.300'
                boxSize={5}
              />
              <Text>{car.year}</Text>
            </Stack>
          </HStack>
          <Text>{formattedPrice}</Text>
          <Button
            variant='outline'
            marginTop='20px'
          >
            Tenho interesse
          </Button>
        </VStack>
      </Box>
    </Flex>
  )
}
