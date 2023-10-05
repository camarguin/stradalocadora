'use client'
import { useEffect, useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Heading,
  Text,
  InputLeftElement,
  Progress,
  useToast,
} from '@chakra-ui/react'
import InputMask from 'react-input-mask'
import Image from 'next/image'
import { BiImageAdd } from 'react-icons/bi'
import { useVehicles } from '@/hooks/useVehicles'

export const EditVehicleForm = ({
  isRent,
  handleSubmit,
  vehicleData,
  updateVehicleData,
  progress,
  setProgress,
  setIsUploading,
}) => {
  const [image, setImage] = useState({ preview: '', raw: '', name: '' })
  const { uploadFileFirebase } = useVehicles()
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'imagePath') {
      updateVehicleData('imagePath', value)
    } else if (name === 'image') {
      updateVehicleData('image', value)
    } else {
      updateVehicleData(name, value)
    }
  }

  const handleImageUpload = async (file) => {
    setIsUploading(true)
    try {
      const { downloadURL, fullPath } = await uploadFileFirebase(file)

      updateVehicleData('image', downloadURL)
      updateVehicleData('imagePath', fullPath)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha no upload da imagem, tente novamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    setProgress(100)
    setIsUploading(false)
    toast({
      title: 'Sucesso',
      description: 'Imagem adicionada no banco com sucesso',
      status: 'info',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleImage = (e) => {
    if (e.target.files.length) {
      const selectedImage = {
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        name: e.target.files[0].name,
      }
      setImage(selectedImage)
      handleImageUpload(e.target.files[0])
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <FormControl
          id='vehicleName'
          // isRequired
        >
          <FormLabel>Modelo</FormLabel>
          <Input
            type='text'
            name='name'
            value={vehicleData.name}
            onChange={handleChange}
            textTransform='uppercase'
          />
        </FormControl>
        {!isRent && (
          <HStack>
            <FormControl id='vehicleYear'>
              <FormLabel>Ano</FormLabel>
              <Input
                as={InputMask}
                mask='99/99'
                name='year'
                value={vehicleData.year}
                onChange={handleChange}
                textTransform='uppercase'
              />
            </FormControl>
            <FormControl id='vehicleColor'>
              <FormLabel>Cor</FormLabel>
              <Input
                type='text'
                name='color'
                value={vehicleData.color}
                onChange={handleChange}
                textTransform='uppercase'
                required
              />
            </FormControl>
          </HStack>
        )}
        <HStack>
          {!isRent && (
            <FormControl
              id='vehicleKM'
              // isRequired
            >
              <FormLabel>KM</FormLabel>
              <Input
                type='number'
                name='km'
                value={vehicleData.km}
                onChange={handleChange}
                textTransform='uppercase'
              />
            </FormControl>
          )}
          <FormControl id='vehiclePlate'>
            <FormLabel>Placa</FormLabel>
            <Input
              name='plate'
              value={vehicleData.plate}
              onChange={handleChange}
              as={InputMask}
              mask='***-***'
              textTransform='uppercase'
            />
          </FormControl>
        </HStack>

        {!isRent && (
          <>
            <FormControl id='vehicleFipe'>
              <FormLabel>Valor Fipe</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>R$</InputLeftElement>
                <Input
                  type='number'
                  name='fipe'
                  value={vehicleData.fipe}
                  onChange={handleChange}
                  textTransform='uppercase'
                />
              </InputGroup>
            </FormControl>
            <FormControl
              id='vehiclePrice'
              isRequired
            >
              <FormLabel>Valor de venda</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>R$</InputLeftElement>
                <Input
                  type='number'
                  name='price'
                  value={vehicleData.price}
                  onChange={handleChange}
                  textTransform='uppercase'
                />
              </InputGroup>
            </FormControl>
          </>
        )}
        <FormControl id='vehicleImage'>
          <FormLabel
            htmlFor='uploadImage'
            width='max-content'
          >
            Imagem do Veiculo
            {vehicleData?.image ? (
              <Box
                marginTop='10px'
                borderStyle='dashed'
                borderWidth='2px'
                rounded='md'
                shadow='sm'
                width='100px'
                height='100px'
              >
                <Image
                  width={100}
                  height={100}
                  src={vehicleData?.image}
                  alt='Imagem Veiculo'
                />
                <Progress
                  hasStripe
                  value={progress}
                />
              </Box>
            ) : (
              <Box
                marginTop='10px'
                borderStyle='dashed'
                borderWidth='2px'
                rounded='md'
                shadow='sm'
                width='100px'
                height='100px'
                display='flex'
                flexDir='column'
                alignItems='center'
                justifyContent='center'
                cursor='pointer'
              >
                <Heading textAlign='center'>
                  <BiImageAdd />
                </Heading>
                <Text textAlign='center'>
                  Adicionar <br />
                  Foto
                </Text>
              </Box>
            )}
          </FormLabel>
          <Input
            id='uploadImage'
            variant='ghost'
            display='none'
            type='file'
            onChange={handleImage}
            accept='image/png, image/jpeg, image/jpg'
          />
        </FormControl>
      </Stack>
    </form>
  )
}
