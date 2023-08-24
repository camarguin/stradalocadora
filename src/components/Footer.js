'use client'
import React from 'react'
import { Box, Container, Divider, HStack, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Roboto_Condensed } from 'next/font/google'
import { AiOutlineInstagram } from 'react-icons/ai'

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: '400' })

export const Footer = () => {
  return (
    <Box
      className={robotoCondensed.className}
      bg='myBlue.200'
      color='myWhite'
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={10}
      >
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Image
                src='/WhiteLogo.png'
                width={100}
                height={80}
                alt='Strada Locadora logo'
              />
            </Box>
            <Text fontSize={'sm'}>
              Av. Platina, n° 295, Dona Zulmira <br />
              Uberlândia, MG
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Ir para</Text>
            <Link href='/alugar'>Carros para alugar</Link>
            <Link href='/comprar'>Carros a venda</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Nossos telefones</Text>
            <Text>(34) 99839-2344</Text>
            <Text>(34) 99856-2344</Text>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Nosso email</Text>
            <a href='mailto:financeiro@stradalocadora.com.br'>financeiro@stradalocadora.com.br</a>
          </Stack>
          <Stack align={'flex-start'}>
            <Text>Fique por dentro</Text>
            <a
              href='https://www.instagram.com/stradagaragem/'
              target='_blank'
            >
              <AiOutlineInstagram fontSize='25px' />
            </a>
          </Stack>
        </SimpleGrid>
      </Container>
      <Divider />
      <HStack justify='space-between'>
        <span></span>
        <Text
          fontSize='sm'
          padding='20px 0px'
        >
          © Strada Locadora 2023 - Todos os direitos reservados
        </Text>
        <Text fontSize='sm'>
          Desenvolvido por{' '}
          <a
            target='_blank'
            href='https://lucasgc.ca'
            style={{
              textDecoration: 'none',
              color: '#fff',
              transition: 'color 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#45BF57')}
            onMouseLeave={(e) => (e.target.style.color = '#fff')}
          >
            LGC
          </a>
        </Text>
      </HStack>
    </Box>
  )
}
