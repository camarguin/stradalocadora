import { Box, Flex, HStack, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

export const About = () => {
  return (
    <HStack
      maxH='100vh'
      height='700px'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flex='60%'
        clipPath='polygon(0 0, 65% 0, 100% 100%, 0 100%)'
        bg="url('/aboutImgBackground.jpeg')"
        backgroundSize='cover'
        backgroundPosition='right'
        width='100%'
        height='100%'
      ></Box>

      <Box flex='40%'>
        <Heading
          color='myBlue.200'
          padding='30px'
        >
          | Sobre Nós
        </Heading>
        <Text
          fontSize='md'
          fontWeight={500}
          color='myBlue.200'
        >
          Carros de qualidade para venda e aluguel
        </Text>
      </Box>
    </HStack>
  )
}
