'use client'
import { AddVehicleForm } from '@/components/AddVehicleForm'
import { EditVehicleForm } from '@/components/EditVehicleForm'
import MyTable from '@/components/MyTable'
import { useAuth } from '@/contexts/auth'
import { useVehicles } from '@/hooks/useVehicles'
import { db } from '@/services/firebase'
import {
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
} from '@chakra-ui/react'
import { collection, onSnapshot } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

const initialVehicleData = {
  name: '',
  color: '',
  featured: false,
  fipe: 0,
  images: [],
  km: 0,
  percentage: 0,
  plate: '',
  imagePaths: [],
  price: 0,
  year: '',
}

export default function CarrosVenda() {
  const { getSaleVehicles, uploadProgress, addSaleVehicle, deleteSaleVehicle, updateSaleVehicle, updateSFeatured } =
    useVehicles()
  const { user } = useAuth()
  const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure()
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure()
  const {
    isOpen: isConfirmDeleteModalOpen,
    onOpen: onConfirmDeleteModalOpen,
    onClose: onConfirmDeleteModalClose,
  } = useDisclosure()
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isFetchLoading, setFetchIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])
  const [vehicleData, setVehicleData] = useState(initialVehicleData)
  const router = useRouter()

  // const updateDeleted = (vehicleId) => {
  //   setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== vehicleId))
  // }

  const resetForm = () => {
    console.log('Resetting form')
    setVehicleData(initialVehicleData)
    onAddModalClose()
    onEditModalClose()
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'sale'), (snapshot) => {
      const updatedVehicles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setVehicles(updatedVehicles)
    })

    // Clean up the listener when the component unmounts
    return () => unsubscribe()
  }, [])

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    console.log(vehicleData)
    await addSaleVehicle(vehicleData)
    onAddModalClose()
    setVehicleData(initialVehicleData)
  }

  const updateVehicleData = (name, value) => {
    setVehicleData((prevData) => {
      if (name === 'images' || name === 'imagePaths') {
        return {
          ...prevData,
          [name]: [...prevData[name], ...value],
          percentage:
            ((name === 'price' ? parseFloat(value) : prevData.price) * 100) /
            (name === 'fipe' ? parseFloat(value) : prevData.fipe),
        }
      } else {
        return {
          ...prevData,
          [name]: value.toUpperCase(),
          percentage:
            ((name === 'price' ? parseFloat(value) : prevData.price) * 100) /
            (name === 'fipe' ? parseFloat(value) : prevData.fipe),
        }
      }
    })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    await updateSaleVehicle(vehicleData?.id, vehicleData)
    onEditModalClose()
    setVehicleData(initialVehicleData)
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Foto',
        accessor: 'images',
        Cell: ({ value }) => {
          return (
            <Image
              width={50}
              height={50}
              src={value[0] ? value[0] : '/ComingSoon.png'}
              alt=''
            />
          )
        },
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
        },
      },
      {
        Header: 'Destaque',
        accessor: 'featured',
        Cell: ({ value, row }) => {
          const vehicleId = row.original.id
          const [isFeatured, setIsFeatured] = useState(value)
          const handleSwitch = async () => {
            const newValue = !isFeatured
            setIsFeatured(newValue)
            await updateSFeatured(vehicleId, newValue)
          }
          return (
            <Switch
              id='featured'
              colorScheme='green'
              defaultChecked={value}
              value={value}
              onChange={handleSwitch}
            />
          )
        },
      },
      {
        Header: 'Editar',
        Cell: ({ value, row }) => {
          const vehicleId = row.original.id
          return (
            <IconButton
              variant='ghost'
              aria-label='Edit'
              icon={<AiOutlineEdit />}
              onClick={() => {
                setVehicleData(row.original)
                onEditModalOpen()
              }}
            />
          )
        },
      },
      {
        Header: 'Deletar',
        Cell: ({ value, row }) => {
          const vehicleId = row.original.id

          const handleDelete = async () => {
            await deleteSaleVehicle(vehicleId)
            // updateDeleted(vehicleId)
          }

          return (
            <IconButton
              variant='ghost'
              aria-label='Delete'
              icon={<AiOutlineDelete />}
              onClick={handleDelete}
            />
          )
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
        <Modal
          isOpen={isAddModalOpen}
          onClose={resetForm}
          size='xl'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar Veículo para vender</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddVehicleForm
                handleSubmit={handleAddSubmit}
                vehicleData={vehicleData}
                updateVehicleData={updateVehicleData}
                progress={progress}
                setProgress={setProgress}
                setIsUploading={setIsUploading}
              />
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button
                  variant='outline'
                  onClick={resetForm}
                >
                  Cancelar
                </Button>
                <Button
                  isLoading={isUploading === true}
                  variant='primary'
                  onClick={handleAddSubmit}
                >
                  Adicionar
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={resetForm}
          size='xl'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Veículo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditVehicleForm
                handleSubmit={handleEditSubmit}
                vehicleData={vehicleData}
                updateVehicleData={updateVehicleData}
                progress={progress}
                setProgress={setProgress}
                setIsUploading={setIsUploading}
              />
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button
                  variant='outline'
                  onClick={resetForm}
                >
                  Cancelar
                </Button>
                <Button
                  isLoading={isUploading === true}
                  variant='primary'
                  onClick={handleEditSubmit}
                >
                  Salvar
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <MyTable
          addVehicleOpen={onAddModalOpen}
          columns={columns}
          data={vehicles}
        />
      </div>
    )
  }
}
