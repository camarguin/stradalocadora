'use client'
import React from 'react'
import {
  Box,
  Image,
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
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export const CardCar = ({ car, isRent }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(car.price)
  const formattedKm = Number(car.km).toLocaleString('pt-BR')

  const autoMessage = `Olá, tenho interesse no veículo ${car.name}
  ${car.year ? `Ano: ${car.year}` : ''}
  ${car.km ? `KM: ${car.km}` : ''}
  ${car.price ? `Valor: ${car.price}` : ''}
  ${car.plate ? `Placa: ${car.plate}` : ''}
  `

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      w='100%'
      borderWidth='1px'
      rounded='lg'
      shadow='lg'
      position='relative'
      display='flex'
      flexDirection='column'
      h='100%'
      minH={isRent ? '350px' : '500px'} // Smaller height for rent cars
    >
      <Box
        roundedTop='lg'
        overflow='hidden'
        h={isRent ? '250px' : '280px'} // Smaller image area for rent cars
      >
        <Swiper
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='mySwiper'
        >
          {car.images ? (
            car.images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt='Carro'
                  width='100%'
                  height={isRent ? '250px' : '280px'}
                  objectFit='contain'
                  bg='gray.50'
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Image
                src={car.image}
                alt='Carro'
                width='100%'
                height={isRent ? '250px' : '280px'}
                objectFit='contain'
                bg='gray.50'
              />
            </SwiperSlide>
          )}
        </Swiper>
      </Box>

      <VStack
        p={isRent ? 3 : 4} // Less padding for rent cars
        spacing={isRent ? 2 : 3} // Less spacing for rent cars
        flex='1'
        justify='space-between'
      >
        <Box textAlign='center'>
          <Heading size='sm'>{car.name}</Heading>
        </Box>

        {!isRent && (
          <VStack spacing={2}>
            <HStack spacing={4}>
              <Stack
                direction='row'
                align='center'
              >
                <Icon
                  as={BsSpeedometer2}
                  color='myGreen.300'
                  boxSize={5}
                />
                <Text fontSize='sm'>{formattedKm} km</Text>
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
                <Text fontSize='sm'>{car.year}</Text>
              </Stack>
            </HStack>
            <Text
              fontWeight='bold'
              color='myGreen.500'
            >
              {formattedPrice}
            </Text>
          </VStack>
        )}

        <Button
          variant='outline'
          size='sm'
          as='a'
          href={`https://wa.me/553491914359?text=${encodeURI(autoMessage)}`}
          target='_blank'
          w='100%'
        >
          Tenho interesse
        </Button>
      </VStack>
    </Box>
  )
}
