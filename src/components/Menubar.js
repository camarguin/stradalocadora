'use client'
import React from 'react'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  VStack,
  Collapse,
  useColorModeValue,
  Heading,
  useDisclosure,
  HStack,
  useMediaQuery,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { BsTelephone, BsPinMap, BsWhatsapp } from 'react-icons/bs'
import { BiTimeFive } from 'react-icons/bi'
import Image from 'next/image'
import Link from 'next/link'

export const Menubar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const [isMobile] = useMediaQuery('(min-width: 768px)')

  return (
    <Box>
      {isMobile ? (
        <HStack
          justifyContent='space-between'
          p={{ '2xl': '10px 50px', xl: '10px 50px', lg: '10px 40px', md: '10px 20px', sm: '10px 20px' }}
          maxW='1440px'
          margin='0 auto'
          color='myBlue.300'
          alignItems='center'
          spacing={4}
        >
          <Link href='/'>
            <Image
              src='/BlackLogo.png'
              alt='Strada Veiculos Logo'
              width={105}
              height={58}
            />
          </Link>

          <Flex alignItems='center'>
            <BsPinMap size='2rem' />
            <Box padding='0px 10px'>
              <Heading
                size='sm'
                color='#1D3973'
              >
                Uberlândia
              </Heading>
              <Text>Av. Platina, 295, Dona Zulmira</Text>
            </Box>
          </Flex>

          <Flex alignItems='center'>
            <BiTimeFive size='2rem' />
            <Box padding='0px 10px'>
              <Heading
                size='sm'
                color='#1D3973'
              >
                Segunda a Sábado
              </Heading>
              <Text>8:00 às 18:00 / 8:00 às 12:00 (Sábado)</Text>
            </Box>
          </Flex>

          <Flex alignItems='center'>
            <BsWhatsapp size='2rem' />
            <Box padding='0px 10px'>
              <Heading
                size='sm'
                color='#1D3973'
              >
                Whatsapp
              </Heading>
              <Text>(34) 99839 - 2344 / (34) 99856 - 2344</Text>
            </Box>
          </Flex>
          <Button
            leftIcon={<BsTelephone />}
            as='a'
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            color='white'
            bg='myGreen.300'
            href='tel:+1234567890'
            _hover={{
              bg: 'myGreen.200',
            }}
          >
            Ligue agora
          </Button>
        </HStack>
      ) : null}
      <HStack
        background='myBlue.200'
        color='white'
        py={{ base: 4 }}
        borderStyle='solid'
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        alignItems='center'
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            color='white'
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon
                  w={3}
                  h={3}
                />
              ) : (
                <HamburgerIcon
                  w={5}
                  h={5}
                />
              )
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
          <Box alignSelf='center'>
            <Link href='/'>
              <Image
                src='/WhiteLogo.png'
                alt='Strada Veiculos Logo'
                width={105}
                height={58}
              />
            </Link>
          </Box>
        </Flex>
        <HStack
          p={{ '2xl': '0px 260px', xl: '0px 50px', lg: '0px 40px', md: '0px 20px', sm: '0px 20px' }}
          maxW='1440px'
          width='100%'
          spacing={4}
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'start' }}
        >
          <Flex display={{ base: 'none', md: 'flex' }}>
            <DesktopNav />
          </Flex>
        </HStack>
      </HStack>
      <Collapse
        in={isOpen}
        animateOpacity
      >
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  return (
    <Stack
      direction={'row'}
      spacing={4}
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link href={navItem.href}>{navItem.label}</Link>
        </Box>
      ))}
    </Stack>
  )
}

const MobileNav = () => {
  return (
    <Stack
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
        />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack
      spacing={4}
      onClick={children && onToggle}
    >
      <Box
        py={2}
        as='a'
        href={href ?? '#'}
        justifyContent='space-between'
        alignItems='center'
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
      </Box>

      <Collapse
        in={isOpen}
        animateOpacity
        style={{ marginTop: '0!important' }}
      >
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Box
                as='a'
                key={child.label}
                py={2}
                href={child.href}
              >
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_ITEMS = [
  {
    label: 'Comprar',
    href: '/comprar',
  },
  {
    label: 'Alugar',
    href: '/alugar',
  },
  {
    label: 'Sobre nós',
    href: '#',
  },
  {
    label: 'Contato',
    href: '#',
  },
]
