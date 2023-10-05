'use client'
import React from 'react'
import Image from 'next/image'
import { Flex, Box, useColorModeValue, VStack, HStack, Text, Heading, Button, Stack, Icon } from '@chakra-ui/react'
import { BsCalendarRange, BsSpeedometer2 } from 'react-icons/bs'

export const CardCar = ({ car, isRent }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price)
  const formattedKm = Number(car.km).toLocaleString('pt-BR')

  const autoMessage = `Olá, tenho interesse no veículo ${car.name}
  ${car.year ? `Ano: ${car.year}` : ''}
  ${car.km ? `KM: ${car.km}` : ''}
  ${car.price ? `Valor: ${car.price}` : ''}
  `

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
            src={car.image}
            alt='Picture of the car'
            width={300}
            height={200}
          />
        </Box>
        <VStack p='40px 0px'>
          <Heading size='md'>{car.name}</Heading>
          {isRent ? null : (
            <>
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
            </>
          )}
          <Button
            variant='outline'
            marginTop='20px'
            as='a'
            href={`https://wa.me/553498392344?text=${encodeURI(autoMessage)}`}
            target='_blank'
          >
            Tenho interesse
          </Button>
        </VStack>
      </Box>
    </Flex>
  )
}
