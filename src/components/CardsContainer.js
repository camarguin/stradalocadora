'use client'
import React from 'react'
import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { CardCar } from './CardCar'

export const CardsContainer = ({ cars }) => {
  return (
    <Flex align='center'>
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
            <CardCar car={car} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Center
        w={{ xl: '400px', lg: '400px', md: '200px', sm: '50px' }}
        textAlign='center'
      >
        <Button
          margin='10px'
          variant='outline'
        >
          Explorar mais
        </Button>
      </Center>
    </Flex>
  )
}
