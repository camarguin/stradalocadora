import { Box, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { Stats } from './Stats'

export const About = () => {
  return (
    <HStack
      maxH='100vh'
      height='700px'
      alignItems='center'
    >
      <Box
        flex='50%'
        clipPath='polygon(0 0, 65% 0, 100% 100%, 0 100%)'
        bg="url('/aboutImgBackground.jpeg')"
        backgroundSize='cover'
        backgroundPosition='right'
        width='100%'
        height='100%'
      ></Box>

      <Box
        flex='50%'
        // background='red'
      >
        <Heading
          color='myBlue.200'
          padding='30px 0px'
        >
          | Sobre Nós
        </Heading>
        <Text
          fontSize='md'
          fontWeight={500}
          color='myBlue.200'
          paddingRight='100px'
        >
          Na Strada Locadora, somos mais do que apenas uma locadora de carros - somos seus parceiros automotivos
          dedicados, comprometidos em proporcionar a você a melhor experiência de condução. Com paixão por carros e foco
          na satisfação do cliente, nos estabelecemos como um destino líder tanto para a compra quanto para o aluguel de
          veículos.
        </Text>
        <Flex padding='50px 0px'>
          <Stats />
        </Flex>
      </Box>
    </HStack>
  )
}
