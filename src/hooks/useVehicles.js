import { db, storage } from '@/services/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  writeBatch,
  where,
  updateDoc,
  addDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const toast = useToast()
  const saleCollection = collection(db, 'sale')
  const rentCollection = collection(db, 'rent')

  const getSaleVehicles = async () => {
    try {
      const querySnapshot = await getDocs(saleCollection)
      const vehiclesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setVehicles(vehiclesData)
      return vehiclesData
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      return error
    }
  }
  const getRentalVehicles = async () => {
    try {
      const querySnapshot = await getDocs(rentCollection)
      const vehicleData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setVehicles(vehicleData)
      return vehicleData
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      return error
    }
  }

  const getFeaturedSaleVehicles = async () => {
    try {
      const q = query(saleCollection, where('featured', '==', true))

      const querySnapshot = await getDocs(q)

      // Ensure that querySnapshot.docs is an array before mapping over it
      const vehiclesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      console.log(vehiclesData)
      return vehiclesData
    } catch (error) {
      console.error('Error fetching featured vehicles:', error)
      return error
    }
  }

  const getFeaturedRentalVehicles = async () => {
    try {
      const q = query(rentCollection, where('featured', '==', true))

      const querySnapshot = await getDocs(q)

      const vehiclesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      console.log(vehiclesData)
      return vehiclesData
    } catch (error) {
      console.error('Error fetching featured vehicles:', error)
      return error
    }
  }

  // Update many
  const updateAllVehicles = async (vehiclesData) => {
    const query = collection(db, 'rent')
    try {
      const querySnapshot = await getDocs(query)
      const batch = writeBatch(db)

      querySnapshot.forEach((doc) => {
        const docRef = doc.ref
        batch.update(docRef, {
          imagePath: 'vehicles/ComingSoon.jpg',
          image:
            'https://firebasestorage.googleapis.com/v0/b/stradalocadora-b4917.appspot.com/o/vehicles%2FComingSoon.jpg?alt=media&token=9b7c1cb7-858e-4901-89b3-64968fb5ef82&_gl=1*8r5pa5*_ga*MTAzODQ4NzgyLjE2ODg1MTc2ODA.*_ga_CW55HF8NVT*MTY5NjQ2NTExMi43MC4xLjE2OTY0NjY5ODkuMTIuMC4w ',
        })
      })

      await batch.commit()
      console.log('Successfully updated documents with "featured: false"')
    } catch (error) {
      console.error('Error updating documents:', error)
    }
  }

  const updateSaleVehicle = async (vehicleId, vehicleData) => {
    const vehicleRef = doc(db, saleCollection, vehicleId)
    const vehicleDataWithoutId = Object.fromEntries(Object.entries(vehicleData).filter(([key]) => key !== 'id'))
    try {
      await setDoc(vehicleRef, vehicleDataWithoutId)
      toast({
        title: 'Sucesso',
        description: 'Veículo atualizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error updating document:', error)
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar veículo, Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const updateRentVehicle = async (vehicleId, vehicleData) => {
    const vehicleRef = doc(db, rentCollection, vehicleId)
    try {
      await updateDoc(vehicleRef, vehicleData)
      toast({
        title: 'Sucesso',
        description: 'Veículo atualizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error updating document:', error)
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar veículo, Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  // Update featured value
  const updateFeatured = async (vehicleId, newValue) => {
    const vehicleRef = doc(db, rentCollection, vehicleId)
    try {
      await updateDoc(vehicleRef, {
        featured: newValue,
      })
      toast({
        title: 'Sucesso',
        description: 'Veículo atualizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error updating document:', error)
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar veículo, Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  // Update the isRented value
  const updateRentedVehicle = async (vehicleId, newValue) => {
    const vehicleRef = doc(db, rentCollection, vehicleId)
    try {
      await updateDoc(vehicleRef, {
        isRented: newValue,
      })
      toast({
        title: 'Sucesso',
        description: 'Veículo atualizado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error updating document:', error)
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar veículo, Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const addSaleVehicle = async (vehicleData) => {
    if (vehicleData.image === '') {
      vehicleData.imagePath = 'vehicles/ComingSoon.jpg'
      vehicleData.image =
        'https://firebasestorage.googleapis.com/v0/b/stradalocadora-b4917.appspot.com/o/vehicles%2FComingSoon.jpg?alt=media&token=9b7c1cb7-858e-4901-89b3-64968fb5ef82&_gl=1*8r5pa5*_ga*MTAzODQ4NzgyLjE2ODg1MTc2ODA.*_ga_CW55HF8NVT*MTY5NjQ2NTExMi43MC4xLjE2OTY0NjY5ODkuMTIuMC4w '
    }
    try {
      const docRef = await addDoc(saleCollection, vehicleData)
      toast({
        title: 'Sucesso',
        description: 'Veículo adicionado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.log('Error adding document:', error)
      toast({
        title: 'Erro',
        description: 'Falha ao adicionar veículo, Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const addRentalVehicle = async (vehicleData) => {
    try {
      const docRef = await addDoc(rentCollection, vehicleData)
      toast({
        title: 'Sucesso',
        description: 'Veículo adicionado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error adding document:', error)
      toast({
        title: 'Erro',
        description: 'Falha ao adicionar veículo, Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  // Add many
  const addVehicles = async (vehiclesData) => {
    const batch = writeBatch(db)

    vehiclesData.forEach((vehicleData) => {
      const newVehicleRef = doc(rentCollection)
      batch.set(newVehicleRef, vehicleData)
    })

    try {
      await batch.commit()
      console.log('Success batched')
    } catch (error) {
      console.error('Error adding vehicles:', error)
    }
  }

  const uploadFileFirebase = async (file) => {
    const uniqueID = uuidv4()
    const uploadPath = ref(storage, `vehicles/${uniqueID}`)
    const fullPath = `vehicles/${uniqueID}`

    try {
      const uploadTask = uploadBytes(uploadPath, file).then((snapshot) => {
        setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      })

      await uploadTask
      const downloadURL = await getDownloadURL(uploadPath)
      return { downloadURL, fullPath }
    } catch (error) {
      console.error('Error uploading file to Firebase Storage:', error)
      throw error
    }
  }

  const deleteSaleVehicle = async (vehicleId) => {
    try {
      const vehicleDocRef = doc(saleCollection, vehicleId)
      await deleteDoc(vehicleDocRef)
      toast({
        title: 'Sucesso',
        description: 'Veículo removido com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      console.log(`Document with ID ${vehicleId} deleted successfully.`)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao remover veículo, Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error('Error deleting document:', error)
    }
  }

  const deleteRentVehicle = async (vehicleId) => {
    try {
      const vehicleDocRef = doc(rentCollection, vehicleId)
      await deleteDoc(vehicleDocRef)
      toast({
        title: 'Sucesso',
        description: 'Veículo removido com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      console.log(`Document with ID ${vehicleId} deleted successfully.`)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao remover veículo, Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error('Error deleting document:', error)
    }
  }

  return {
    vehicles,
    uploadProgress,
    setUploadProgress,
    addSaleVehicle,
    addRentalVehicle,
    addSaleVehicle,
    updateSaleVehicle,
    updateRentVehicle,
    updateFeatured,
    getRentalVehicles,
    getSaleVehicles,
    getFeaturedSaleVehicles,
    getFeaturedRentalVehicles,
    addVehicles,
    updateAllVehicles,
    updateRentedVehicle,
    uploadFileFirebase,
    deleteSaleVehicle,
    deleteRentVehicle,
  }
}
