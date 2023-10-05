import React from 'react'
import { Flex, Input, Text } from '@chakra-ui/react'

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <Flex
      direction='column'
      width='500px'
    >
      <Text>Buscar:</Text>
      <Input
        type='text'
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </Flex>
  )
}

export default GlobalFilter
