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

export const AddVehicleForm = ({
  handleSubmit,
  vehicleData,
  updateVehicleData,
  progress,
  setProgress,
  setIsUploading,
  isRent,
}) => {
  const [images, setImages] = useState([])
  const { uploadFileFirebase } = useVehicles()
  const toast = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'imagePaths') {
      updateVehicleData(
        'imagePaths',
        Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      )
    } else if (name === 'images') {
      updateVehicleData('images', Array.from(e.target.files))
    } else {
      updateVehicleData(name, value)
    }
  }

  const handleKeyDown = (e) => {
    // Prevent typing "." or ","
    if (e.key === '.' || e.key === ',') {
      e.preventDefault()
    }
  }

  const handleImageUpload = async (files) => {
    setIsUploading(true)
    const newImages = []
    const newImagePaths = []
    try {
      for (const file of files) {
        const { downloadURL, fullPath } = await uploadFileFirebase(file)
        newImages.push(downloadURL)
        newImagePaths.push(fullPath)
      }
      updateVehicleData('images', newImages)
      updateVehicleData('imagePaths', newImagePaths)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha no upload da imagem, tente novamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      console.log(error)
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

  const handleImages = (e) => {
    if (e.target.files.length) {
      const selectedImages = Array.from(e.target.files).map((file) => ({
        preview: URL.createObjectURL(file),
        raw: file,
        name: file.name,
      }))
      setImages(selectedImages)
      handleImageUpload(selectedImages.map((image) => image.raw))
      console.log(selectedImages)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <FormControl id='vehicleName'>
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
            <FormControl id='vehicleKM'>
              <FormLabel>KM</FormLabel>
              <Input
                type='number'
                name='km'
                onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
            <HStack>
              {images.length > 0 ? (
                images.map((image, index) => (
                  <Box
                    key={index}
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
                      src={image.preview}
                      alt={`Imagem Veiculo ${index}`}
                    />
                    <Progress
                      hasStripe
                      value={progress}
                    />
                  </Box>
                ))
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
                    Fotos
                  </Text>
                </Box>
              )}
            </HStack>
          </FormLabel>
          <Input
            id='uploadImage'
            variant='ghost'
            display='none'
            type='file'
            onChange={handleImages}
            accept='image/png, image/jpeg, image/jpg'
            multiple
          />
        </FormControl>
      </Stack>
    </form>
  )
}
