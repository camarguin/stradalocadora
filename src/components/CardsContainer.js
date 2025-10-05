'use client'
import React from 'react'
import { Box, Button, Center } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { CardCar } from './CardCar'
import Link from 'next/link'

export const CardsContainer = ({ cars, linkTo }) => {
  return (
    <Box
      width='100%'
      maxWidth='1700px'
      mx='auto'
    >
      <Box
        position='relative'
        pb={12}
      >
        <Swiper
          spaceBetween={16}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='mySwiper'
          style={{
            paddingBottom: '40px',
            '--swiper-pagination-color': '#3182ce',
            '--swiper-navigation-color': '#3182ce',
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {cars?.map((car, index) => (
            <SwiperSlide key={car.id || index}>
              <Box
                height='100%'
                display='flex'
              >
                {' '}
                <CardCar
                  car={car}
                  isRent={car.isRented !== undefined}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Center mt={6}>
        <Button
          variant='outline'
          colorScheme='blue'
          size='md'
          as={Link}
          href={linkTo}
        >
          Explorar mais
        </Button>
      </Center>
    </Box>
  )
}
