'use client'
import { Box, Flex, SimpleGrid, Stat, StatLabel, StatNumber, Text, useColorModeValue } from '@chakra-ui/react'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'
import { IoIosPeople } from 'react-icons/io'
import { FaTruckPickup } from 'react-icons/fa'
import { ImPriceTags } from 'react-icons/im'
import { MdCarRental } from 'react-icons/md'

const StatsCard = ({ title, stat, icon }) => {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor='myBlue.200'
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box
          pl={{ base: 2, md: 4 }}
          color='myBlue.200'
        >
          <StatLabel
            fontWeight='700'
            isTruncated
          >
            {title}
          </StatLabel>
          <StatNumber
            fontSize={'2xl'}
            fontWeight='400'
          >
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          padding='0px 10px'
          color='myBlue.200'
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

export const Stats = () => {
  return (
    <Box
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 5, lg: 8 }}
      >
        <StatsCard
          title={'Clientes satisfeitos'}
          stat={'100+'}
          icon={<IoIosPeople size={'2.5em'} />}
        />
        <StatsCard
          title={'Veiculos vendidos'}
          stat={'100+'}
          icon={<ImPriceTags size={'2.5em'} />}
        />
        <StatsCard
          title={'Veiculos alugados'}
          stat={'100+'}
          icon={<MdCarRental size={'2.5em'} />}
        />
      </SimpleGrid>
    </Box>
  )
}
