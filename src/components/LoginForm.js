'use client'
import { useAuth } from '@/contexts/auth'
import { auth } from '@/services/firebase'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signin, user } = useAuth()

  const handleLogin = async () => {
    try {
      await signin(email, password)
      console.log(user)
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <Stack
      spacing={4}
      p={4}
      width='350px'
    >
      <Text
        fontSize='2xl'
        fontWeight='bold'
      >
        Admin
      </Text>
      <FormControl>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Input
          type='password'
          placeholder='Senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme='blue'
        onClick={handleLogin}
      >
        Login
      </Button>
    </Stack>
  )
}
