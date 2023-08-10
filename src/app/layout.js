'use client'
import { Menubar } from '@/components/Menubar'
import theme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          <Menubar />
          {children}
        </ChakraProvider>
        <FloatingWhatsApp
          avatar='./avatar.jpeg'
          phoneNumber='5534998392344'
          accountName='Strada Locadora'
          chatMessage='Olá, o que podemos te ajudar?'
          placeholder='Digite sua mensagem...'
          statusMessage='Atendimento das 08:00 as 18:00
          Segunda a Sexta'
        />
      </body>
    </html>
  )
}
