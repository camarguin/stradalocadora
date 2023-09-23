'use client'
import { useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  AspectRatio,
  Container,
  InputLeftElement,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { TbCurrencyReal } from 'react-icons/tb'
import InputMask from 'react-input-mask'
import Image from 'next/image'
import { BiImageAdd } from 'react-icons/bi'

export const AddVehicleForm = ({ handleSubmit, vehicleData, updateVehicleData }) => {
  const [image, setImage] = useState({ preview: '', raw: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    updateVehicleData(name, value)
  }

  const handleImage = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      })
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
        <HStack>
          <FormControl
            id='vehicleYear'
            // isRequired
          >
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
          <FormControl
            id='vehicleColor'
            // isRequired
          >
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
        <HStack>
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
          <FormControl
            id='vehiclePlate'
            // isRequired
          >
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

        <FormControl
          id='vehicleFipe'
          // isRequired
        >
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
              isRequired
              type='text'
              name='price'
              value={vehicleData.price}
              onChange={handleChange}
              textTransform='uppercase'
            />
          </InputGroup>
        </FormControl>
        <FormControl id='vehicleImage'>
          <FormLabel
            htmlFor='uploadImage'
            width='max-content'
          >
            Imagem do Veiculo
            {image.preview ? (
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
                  src={image.preview}
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
                alignItems='center'
                justifyContent='center'
              >
                <Heading textAlign='center'>
                  <BiImageAdd />
                </Heading>
              </Box>
            )}
          </FormLabel>
          <Input
            id='uploadImage'
            variant='ghost'
            display='none'
            type='file'
            onChange={handleImage}
          />
        </FormControl>
      </Stack>
    </form>
  )
}
