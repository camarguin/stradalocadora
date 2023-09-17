'use client'
import MyTable from '@/components/MyTable'
import { db } from '@/services/firebase'
import { CopyIcon } from '@chakra-ui/icons'
import {
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useVehicles } from '@/hooks/useVehicles'
import { useAuth } from '@/contexts/auth'
import { useRouter } from 'next/navigation'

export default function CarrosAlugar() {
  const { getRentalVehicles, updateRentedVehicle, addRentalVehicle } = useVehicles()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])
  const router = useRouter()

  const fetchRentalVehicles = async () => {
    try {
      const rentalVehicles = await getRentalVehicles()
      console.log('Fetched rental vehicles')
      setVehicles(rentalVehicles)
    } catch (error) {
      console.error('Error fetching rental vehicles:', error)
    } finally {
      setIsLoading(false) // Set loading to false when done fetching
    }
  }

  useEffect(() => {
    fetchRentalVehicles()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Veiculo',
        accessor: 'name',
      },
      {
        Header: 'Ano',
        accessor: 'year',
      },
      {
        Header: 'Placa',
        accessor: 'plate',
      },
      {
        Header: 'Alugado',
        accessor: 'isRented',
        Cell: ({ value, row }) => {
          const vehicleId = row.original.id
          const [isRented, setIsRented] = useState(value)
          const handleSwitch = async (async) => {
            console.log(vehicleId)
            const newValue = !isRented
            setIsRented(newValue)
            await updateRentedVehicle(vehicleId, newValue)
          }
          return (
            <Switch
              id='stock'
              colorScheme='green'
              defaultChecked={value}
              value={value}
              onChange={handleSwitch}
            />
          )
        },
      },
    ],
    [updateRentedVehicle]
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
      <Flex>
        <MyTable
          columns={columns}
          data={vehicles}
        />
      </Flex>
    )
  }
}
