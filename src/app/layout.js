'use client'
import { AdminMenuBar } from '@/components/AdminMenuBar'
import { Footer } from '@/components/Footer'
import { Menubar } from '@/components/Menubar'
import theme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import Head from './head'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  // Check if the current route contains "/admin"
  const isAdminPath = usePathname()

  return (
    <html lang='en'>
      <Head />
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          {isAdminPath.includes('/admin') ? <AdminMenuBar /> : <Menubar />}
          {children}
          {isAdminPath.includes('/admin') ? null : <Footer />}
          <FloatingWhatsApp
            avatar='./avatar.jpeg'
            phoneNumber='5534998392344'
            accountName='Strada Locadora'
            chatMessage='Olá, o que podemos te ajudar?'
            placeholder='Digite sua mensagem...'
            statusMessage='Atendimento das 08:00 as 18:00
          Segunda a Sexta'
          />
        </ChakraProvider>
      </body>
    </html>
  )
}
