'use client'
import React from 'react'
import { Box, Button, Center, Flex, useMediaQuery } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { CardCar } from './CardCar'
import Link from 'next/link'

export const CardsContainer = ({ cars, linkTo }) => {
  const [isMobile] = useMediaQuery('(max-width: 400px')
  return (
    <Flex
      align='center'
      justify='center'
      wrap={isMobile ? 'wrap' : 'nowrap'}
      // flexDirection={{ base: 'column', md: 'row' }}
    >
      <Swiper
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='mySwiper'
        breakpoints={{
          // When window width is >= 320px
          320: {
            slidesPerView: 1,
          },
          // When window width is >= 480px
          480: {
            slidesPerView: 2,
          },
          // When window width is >= 768px
          861: {
            slidesPerView: 3,
          },
          // When window width is >= 1024px
          1440: {
            slidesPerView: 4,
          },
        }}
      >
        {cars.map((car, index) => (
          <SwiperSlide key={index}>
            <CardCar
              car={car}
              isRent={!car.km}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Center
        // w={{ xl: '400px', lg: '400px', md: '200px', sm: '50px' }}
        textAlign='center'
      >
        <Button
          margin='10px'
          variant='outline'
        >
          <Link href={linkTo}>Explorar mais</Link>
        </Button>
      </Center>
    </Flex>
  )
}
