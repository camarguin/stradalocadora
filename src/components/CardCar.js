'use client'
import React from 'react'
import {
  Flex,
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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
} from '@chakra-ui/react'
import { BsCalendarRange, BsSpeedometer2 } from 'react-icons/bs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export const CardCar = ({ car, isRent }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.price)
  const formattedKm = Number(car.km).toLocaleString('pt-BR')

  const autoMessage = `Olá, tenho interesse no veículo ${car.name}
  ${car.year ? `Ano: ${car.year}` : ''}
  ${car.km ? `KM: ${car.km}` : ''}
  ${car.price ? `Valor: ${car.price}` : ''}
  ${car.plate ? `Placa: ${car.plate}` : ''}
  `

  return (
    <Flex
      w='full'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW='300px'
        borderWidth='1px'
        rounded='lg'
        shadow='lg'
        position='relative'
      >
        <Box
          roundedTop='lg'
          overflow='hidden'
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
                    width={300}
                    height={300}
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <Image
                  src={car.image}
                  alt='Carro'
                  width={300}
                  height={300}
                />
              </SwiperSlide>
            )}
          </Swiper>
        </Box>
        <VStack p='40px 0px'>
          <Box
            padding='0px 10px'
            textAlign='center'
          >
            <Heading size='sm'>{car.name}</Heading>
          </Box>
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
            href={`https://wa.me/553491914359?text=${encodeURI(autoMessage)}`}
            target='_blank'
          >
            Tenho interesse
          </Button>
        </VStack>
      </Box>
    </Flex>
    // <Card
    //   maxW='350px'
    //   align='center'
    // >
    //   <CardBody
    //     align='center'
    //     justify='center'
    //   >
    //     <Stack
    //       spacing={4}
    //       align='center'
    //     >
    //       <Box
    //         roundedTop='lg'
    //         overflow='hidden'
    //       >
    //         {/* <Image
    //           src={car.image}
    //           alt='Picture of the car'
    //           width={300}
    //           height={300}
    //         /> */}
    //         <Swiper
    //           spaceBetween={10}
    //           pagination={{
    //             clickable: true,
    //           }}
    //           modules={[Pagination]}
    //           className='mySwiper'
    //         >
    //           {/* {cars.map((car, index) => (
    //             <SwiperSlide key={index}>
    //               <CardCar
    //                 car={car}
    //                 isRent={!car.km}
    //               />
    //             </SwiperSlide>
    //           ))} */}
    //           {/* <SwiperSlide>Slide 1</SwiperSlide> */}
    //           <SwiperSlide>Slide 2</SwiperSlide>
    //           <SwiperSlide>Slide 3</SwiperSlide>
    //           <SwiperSlide>Slide 4</SwiperSlide>
    //           <SwiperSlide>Slide 5</SwiperSlide>
    //           <SwiperSlide>Slide 6</SwiperSlide>
    //           <SwiperSlide>Slide 7</SwiperSlide>
    //           <SwiperSlide>Slide 8</SwiperSlide>
    //           <SwiperSlide>Slide 9</SwiperSlide>
    //         </Swiper>
    //       </Box>
    //       <Heading size='sm'>{car.name}</Heading>
    //       {isRent ? null : (
    //         <Stack alignContent='center'>
    //           <HStack
    //             spacing={2}
    //             align='center'
    //           >
    //             <Stack direction='row'>
    //               <Icon
    //                 as={BsSpeedometer2}
    //                 color='myGreen.300'
    //                 boxSize={6}
    //               />
    //               <Text>{formattedKm} km</Text>
    //             </Stack>
    //             <Stack
    //               direction='row'
    //               align='center'
    //             >
    //               <Icon
    //                 as={BsCalendarRange}
    //                 color='myGreen.300'
    //                 boxSize={5}
    //               />
    //               <Text>{car.year}</Text>
    //             </Stack>
    //           </HStack>
    //           <Text>{formattedPrice}</Text>
    //         </Stack>
    //       )}
    //     </Stack>
    //   </CardBody>
    //   <Box padding='10px'>
    //     <Button
    //       variant='outline'
    //       as='a'
    //       href={`https://wa.me/553491914359?text=${encodeURI(autoMessage)}`}
    //       target='_blank'
    //     >
    //       Tenho interesse
    //     </Button>
    //   </Box>
    // </Card>
  )
}
