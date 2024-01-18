'use client'
import MyTable from '@/components/MyTable'
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
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useVehicles } from '@/hooks/useVehicles'
import { useAuth } from '@/contexts/auth'
import { useRouter } from 'next/navigation'
import { AddVehicleForm } from '@/components/AddVehicleForm'
import { EditVehicleForm } from '@/components/EditVehicleForm'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { collection, onSnapshot } from 'firebase/firestore'

const initialVehicleData = {
  name: '',
  featured: false,
  isRented: false,
  images: [],
  imagePaths: [],
  plate: '',
}

export default function CarrosAlugar() {
  const {
    getRentalVehicles,
    updateRentedVehicle,
    addRentalVehicle,
    deleteRentVehicle,
    updateRentVehicle,
    updateRFeatured,
  } = useVehicles()
  const { user } = useAuth()
  const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure()
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure()
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isFetchLoading, setFetchIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])
  const [vehicleData, setVehicleData] = useState(initialVehicleData)
  const router = useRouter()

  const updateDeleted = (vehicleId) => {
    setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== vehicleId))
  }

  const resetForm = () => {
    console.log('Resetting form')
    setVehicleData(initialVehicleData)
    onAddModalClose()
    onEditModalClose()
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rent'), (snapshot) => {
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
    await addRentalVehicle(vehicleData)
    onAddModalClose()
    setVehicleData(initialVehicleData)
  }

  const updateVehicleData = (name, value) => {
    setVehicleData((prevData) => {
      if (name === 'images' || name === 'imagePaths') {
        return {
          ...prevData,
          [name]: [...prevData[name], ...value],
        }
      } else {
        return {
          ...prevData,
          [name]: value.toUpperCase(),
        }
      }
    })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    await updateRentVehicle(vehicleData?.id, vehicleData)
    onEditModalClose()
    setVehicleData(initialVehicleData)
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Veiculo',
        accessor: 'name',
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
            const newValue = !isRented
            setIsRented(newValue)
            console.log(vehicleId)
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
      {
        Header: 'Destaque',
        accessor: 'featured',
        Cell: ({ value, row }) => {
          const vehicleId = row.original.id
          const [isFeatured, setIsFeatured] = useState(value)
          const handleSwitch = async () => {
            const newValue = !isFeatured
            setIsFeatured(newValue)
            await updateRFeatured(vehicleId, newValue)
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
            await deleteRentVehicle(vehicleId)
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
            <ModalHeader>Adicionar Veículo para alugar</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AddVehicleForm
                isRent
                handleSubmit={handleAddSubmit}
                vehicleData={vehicleData}
                updateVehicleData={updateVehicleData}
                progress={progress}
                setProgress={setProgress}
                setIsUploading={setIsUploading}
                // onResetForm={resetForm}
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
          onClose={onEditModalClose}
          size='xl'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Veículo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditVehicleForm
                isRent
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
