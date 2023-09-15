import React from 'react'
import { Box, Flex, HStack, Heading, Text, useMediaQuery } from '@chakra-ui/react'
import { Stats } from './Stats'

export const About = () => {
  const [isMobile] = useMediaQuery('(max-width: 800px')
  return <Flex>{isMobile ? <MobileAbout /> : <DesktopAbout />}</Flex>
}

const MobileAbout = () => {
  return (
    <Box
      position='relative'
      width='100%'
      minHeight='min-content'
      bg="url('/aboutImgBackground.jpeg')"
      backgroundSize='cover'
      backgroundPosition='center'
    >
      <Box
        position='absolute'
        top='0'
        left='0'
        width='100%'
        height='100%'
        bg='rgba(200, 200, 200, 0.8)'
      ></Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        position='relative'
        zIndex='1'
        padding='10px'
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
        >
          Somos uma agência de veículos localizada na cidade de Uberlândia (MG), a qual foi idealizada e criada com o
          intuito de auxiliar a locomoção nas atividades cotidianas e empresariais, garantindo com que o cliente tenha o
          melhor conforto e agilidade para chegar ao destino sem complicações. Além de disponibilizarmos a locação de
          veículos, também proporcionamos a possibilidade da realização do tão sonhado veículo próprio, com parcelas que
          cabem no seu bolso e o melhor preço do mercado.
        </Text>
        <Box padding='20px 0px'>
          <Stats />
        </Box>
      </Box>
    </Box>
  )
}

const DesktopAbout = () => {
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

      <Box flex='50%'>
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
          Somos uma agência de veículos localizada na cidade de Uberlândia (MG), a qual foi idealizada e criada com o
          intuito de auxiliar a locomoção nas atividades cotidianas e empresariais, garantindo com que o cliente tenha o
          melhor conforto e agilidade para chegar ao destino sem complicações. Além de disponibilizarmos a locação de
          veículos, também proporcionamos a possibilidade da realização do tão sonhado veículo próprio, com parcelas que
          cabem no seu bolso e o melhor preço do mercado.
        </Text>
        <Flex padding='0px 10px'>
          <Stats />
        </Flex>
      </Box>
    </HStack>
  )
}
