'use client'
import React from 'react'
import { Box, Button, Flex, HStack, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const Hero = () => {
  const backgroundImageUrl = '/heroImgBackground.jpeg'
  const heroHeight = `calc(100vh - 129px)`

  const underlineSVG = (
    <svg
      width='111'
      height='14'
      viewBox='0 0 141 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        id='Vector'
        d='M18.5311 2.31481C20.7218 2.25408 22.4604 3.23569 23.4649 5.2671C24.2252 6.81891 25.1069 7.09736 26.5836 6.56111C30.3758 5.1848 34.1847 3.85881 38.0155 2.627C40.3883 1.86299 42.4937 2.3322 44.1886 4.5073C44.5965 5.02735 45.606 5.38312 46.2481 5.25709C49.5466 4.60348 52.8189 3.7618 56.1017 2.99536C59.7912 2.13618 63.4703 1.19554 67.1867 0.4744C69.4779 0.0278099 71.6213 1.02294 72.9936 2.83584C74.9918 5.46658 77.4939 5.38643 80.0276 4.83164C84.8061 3.79192 89.5087 2.38819 94.2764 1.292C96.7162 0.735525 99.2238 0.336573 101.714 0.237464C102.854 0.189139 104.17 0.813022 105.15 1.53091C107.226 3.04381 109.552 2.97926 111.769 2.76268C117.913 2.16016 124.06 1.46389 130.142 0.391291C133.481 -0.199071 136.163 1.2059 138.954 2.46901C139.507 2.7228 140.212 4.05479 140.03 4.41418C139.599 5.26306 138.763 6.07967 137.912 6.42705C137.191 6.72674 136.137 6.57026 135.379 6.24403C131.445 4.54147 127.581 5.99779 123.7 6.40958C118.925 6.91163 114.169 7.62662 109.39 7.99729C107.95 8.10901 106.153 7.83289 105.052 6.96276C102.04 4.58269 98.9458 5.29624 95.7927 6.03375C90.7535 7.2126 85.7363 8.47941 80.7081 9.70223C76.5641 10.7096 72.9565 9.86323 69.8906 6.49427C69.2337 5.76967 67.7499 5.33661 66.8069 5.55728C62.2632 6.59497 57.768 7.88989 53.2565 9.10949C50.2194 9.9241 47.2316 11.2961 44.0259 9.93799C43.6296 9.76831 43.1438 9.68456 42.8552 9.39176C39.7623 6.2349 36.6644 7.86754 33.5172 9.28669C31.3403 10.2668 29.1516 11.2467 26.8913 11.9502C24.0526 12.8372 21.9245 11.636 19.9066 8.42964C19.1979 7.29768 18.566 6.82989 17.3055 7.07614C13.6128 7.7852 10.3948 9.57198 7.48318 11.9895C4.84529 14.1869 2.8483 14.595 1.22338 12.7963C0.854585 12.3896 0.802709 10.9505 1.14274 10.6315C5.1582 6.8206 12.6981 2.53525 18.5427 2.32126L18.5311 2.31481Z'
        fill='#45BF57'
      />
    </svg>
  )

  return (
    <HStack
      height={heroHeight}
      className={inter.className}
      paddingLeft={{ base: '20px', sm: '30px', md: '40px', lg: '50px' }}
    >
      <Box
        flex='30%'
        padding='0px 20px'
      >
        <Heading
          fontWeight={800}
          textShadow='0px 7px 29px rgba(100, 100, 111, 0.2)'
          color='myBlue.200'
        >
          A{' '}
          <Flex
            direction='row'
            display='inline-block'
            color='myGreen.300'
            position='relative'
          >
            <Box
              as='span'
              position='absolute'
            ></Box>
            melhor
            <Box
              position='absolute'
              bottom='-2'
              width='100%'
              textAlign='center'
            >
              {underlineSVG}
            </Box>
          </Flex>{' '}
          solução de carros para você e o <br />
          seu negócio
        </Heading>
        <Text
          fontSize='lg'
          fontWeight={500}
          color='myBlue.200'
        >
          Carros de qualidade para venda e aluguel
        </Text>
        <Button
          marginTop='50px'
          color='white'
          bg='myGreen.300'
          _hover={{
            bg: 'myGreen.200',
          }}
        >
          Explore nossa frota
        </Button>
      </Box>
      <Box
        clipPath='polygon(0 0, 100% 0, 100% 100%, 35% 100%)'
        flex='70%'
        bg={`url('/heroImgBackground.jpeg')`}
        backgroundSize='cover'
        backgroundPosition='center'
        width='100%'
        height='100%'
      >
        {/* <Image
          src={backgroundImageUrl}
          width={1920}
          height={1280}
          alt='Garagem'
        /> */}
      </Box>
    </HStack>
  )
}
