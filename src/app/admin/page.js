'use client'
import { Button, Center } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <Center height='90vh'>v
      <Button>
        <Link href='/admin/carros-alugar'>1</Link>
      </Button>
      <Button>
        <Link href='/admin/carros-venda'>2</Link>
      </Button>
    </Center>
  )
}
