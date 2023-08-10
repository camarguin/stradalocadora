'use client'
import { Box, Button, Center, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { CardCar } from './CardCar'

export const CardsContainer = ({ cars }) => {
  return (
    <Flex align='center'>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='mySwiper'
      >
        {cars.map((car, index) => (
          <SwiperSlide key={index}>
            <CardCar car={car} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Center
        w='400px'
        textAlign='center'
      >
        <Button margin='0px 10px'>Explorar mais</Button>
      </Center>
    </Flex>
  )
}
