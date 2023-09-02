'use client'
import { useVehicles } from '@/hooks/useVehicles'
import { Button, Center } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const saleVehiclesFromExcel = [
  { plate: 'RFJ-3H14', name: 'Strada Volcano 1.3' },
  { plate: 'RFN-4C82', name: 'Volkswagen Saveiro RB MBVS' },
  { plate: 'EXV-6B77', name: 'Saveiro' },
  { plate: 'RMU-2I04', name: 'Onix' },
  { plate: 'RMZ-6C78', name: 'Onix' },
  { plate: 'RND-0I33', name: 'Argo' },
  { plate: 'RNP-3J71', name: 'Gol' },
  { plate: 'RNI-9D11', name: 'Strada' },
  { plate: 'RNI-9C93', name: 'Strada Nova' },
  { plate: 'RNI-9D09', name: 'Strada Nova' },
  { plate: 'RNI-9C96', name: 'Strada' },
  { plate: 'RNO-2C42', name: 'Toro' },
  { plate: 'RNO-2C24', name: 'Toro' },
  { plate: 'RNO-6G43', name: 'Toro' },
  { plate: 'QQC-5080', name: 'S10 LTZ DD4A' },
  { plate: 'RNV-1C79', name: 'Gol Novo' },
  { plate: 'RNZ-7G41', name: 'Gol Novo' },
  { plate: 'RGA-6E33', name: 'Saveiro 1.6' },
  { plate: 'RTC-2B51', name: 'Toro' },
  { plate: 'QUM-6226', name: 'Amarok' },
  { plate: 'RTH-3I19', name: 'Toro' },
  { plate: 'RTV-7F81', name: 'Nova Strada Endurance' },
  { plate: 'RTW-6E66', name: 'Nova Strada Endurance' },
  { plate: 'RUC-5F21', name: 'Fiat Argo 1.0' },
  { plate: 'RUC-5F16', name: 'Fiat Argo 1.0' },
  { plate: 'RUF-8J92', name: 'Onix' },
  { plate: 'RFW-9I97', name: 'S10' },
  { plate: 'RVD-5F59', name: 'Strada' },
  { plate: 'RVD-8I94', name: 'Strada' },
  { plate: 'RVD-8E69', name: 'Strada Nova' },
  { plate: 'RVD-9J41', name: 'Strada' },
  { plate: 'RVF-6G77', name: 'Strada' },
  { plate: 'RVG-1A33', name: 'Strada Nova' },
  { plate: 'RVF-6G80', name: 'Strada Nova' },
  { plate: 'RVG-1A18', name: 'Strada' },
  { plate: 'RCE-OB30', name: 'Kicks' },
  { plate: 'SHK-6A74', name: 'Strada' },
  { plate: 'SHO-8D87', name: 'Strada' },
  { plate: 'SHX-1E96', name: 'Fiat Argo' },
  { plate: 'SHX-1H24', name: 'Fiat Argo (Automático)' },
  { plate: 'SHX-4D21', name: 'Citroen C3' },
  { plate: 'SHX-4D18', name: 'Citroen C3' },
  { plate: 'SHX-1B72', name: 'Polo' },
  { plate: 'SHX-1B68', name: 'Polo' },
  { plate: 'SHX-1B66', name: 'Polo' },
  { plate: 'RFU-5H79', name: 'Gol' },
  { plate: 'QQE-1282', name: 'Strada' },
  { plate: 'QQE-1283', name: 'Strada' },
  { plate: 'QQE-1281', name: 'Strada' },
  { plate: 'QQE-1278', name: 'Strada' },
  { plate: 'RNQ-2C32', name: 'Strada' },
  { plate: 'SIJ-9B65', name: 'Strada' },
  // {
  //   name: 'FIAT STRADA HD WK CS',
  //   color: '',
  //   year: '',
  //   plate: 'QPG-0429',
  //   price: 0,
  //   featured: false,
  //   image: null,
  // },
]

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { vehicles, addVehicles } = useVehicles()

  // const vehiclesWithPercentage = vehiclesFromExcel.map((vehicle) => ({
  //   ...vehicle,
  //   percentage: (vehicle.price * 100) / vehicle.fipe,
  // }))

  const handleAddVehicles = () => {
    addVehicles(saleVehiclesFromExcel)
  }
  return (
    <Center height='90vh'>
      v
      <Button>
        <Link href='/admin/carros-alugar'>1</Link>
      </Button>
      <Button>
        <Link href='/admin/carros-venda'>2</Link>
      </Button>
      {/* <Button onClick={handleAddVehicles}>click to add many</Button> */}
    </Center>
  )
}
