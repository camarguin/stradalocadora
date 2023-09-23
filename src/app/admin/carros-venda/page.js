'use client'
import { AddVehicleForm } from '@/components/AddVehicleForm'
import MyTable from '@/components/MyTable'
import { useAuth } from '@/contexts/auth'
import { useVehicles } from '@/hooks/useVehicles'
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { AiFillCar, AiOutlinePlus } from 'react-icons/ai'

export default function CarrosVenda() {
  const { getSaleVehicles, addSaleVehicle } = useVehicles()
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])
  const [vehicleData, setVehicleData] = useState({
    name: '',
    color: '',
    featured: false,
    fipe: 0,
    image: '',
    km: 0,
    percentage: 0,
    plate: '',
    price: 0,
    year: '',
  })
  const router = useRouter()

  const updateVehicleData = (name, value) => {
    setVehicleData({
      ...vehicleData,
      [name]: value.toUpperCase(),
      percentage:
        ((name === 'price' ? parseFloat(value) : vehicleData.price) * 100) /
        (name === 'fipe' ? parseFloat(value) : vehicleData.fipe),
    })
  }

  const fetchRentalVehicles = async () => {
    try {
      const saleVehicles = await getSaleVehicles()
      console.log('Fetched sale vehicles')
      setVehicles(saleVehicles)
    } catch (error) {
      console.error('Error fetching sale vehicles:', error)
    } finally {
      setIsLoading(false) // Set loading to false when done fetching
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(vehicleData)
  }

  useEffect(() => {
    fetchRentalVehicles()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Foto',
        accessor: 'image',
        Cell: ({}) => {},
      },
      {
        Header: 'Veiculo',
        accessor: 'name',
      },
      {
        Header: 'Ano',
        accessor: 'year',
      },
      {
        Header: 'KM',
        accessor: 'km',
        Cell: ({ value }) => {
          return value.toLocaleString('en', { useGrouping: true }).replace(/,/g, '.')
        },
      },
      {
        Header: 'Placa',
        accessor: 'plate',
      },
      {
        Header: 'Fipe',
        accessor: 'fipe',
        Cell: ({ value }) => {
          return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        },
      },
      {
        Header: 'Valor',
        accessor: 'price',
        Cell: ({ value }) => {
          return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        },
      },
      {
        Header: 'Porcentagem',
        accessor: 'percentage',
        Cell: ({ value }) => {
          const formattedPercentage = (value / 100).toFixed(2) + '%'
          return formattedPercentage
          // return value.toFixed(2) + '%'
        },
      },
      {
        Header: 'Editar',
        Cell: ({ value }) => {
          // return value.toFixed(2) + '%'
        },
      },
      {
        Header: 'Deletar',
        Cell: ({ value }) => {
          // return value.toFixed(2) + '%'
        },
      },
    ],
    []
  )
  if (!user) {
    return (
      <div>
        Carregando...
        <br />
        <h1>Você precisa estar logado para ter acesso a essa página</h1>
        <button onClick={() => router.push('/admin')}>Ir para login</button>
      </div>
    )
  } else {
    return (
      <div>
        <Button
          leftIcon={<AiOutlinePlus />}
          variant='primary'
          onClick={onOpen}
        >
          <AiFillCar />
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size='xl'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar Veículo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddVehicleForm
                handleSubmit={handleSubmit}
                vehicleData={vehicleData}
                updateVehicleData={updateVehicleData}
              />
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button
                  variant='outline'
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  variant='primary'
                  onClick={handleSubmit}
                >
                  Adicionar
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <MyTable
          columns={columns}
          data={vehicles}
        />
      </div>
    )
  }
}
