import { db } from '@/services/firebase'
import { collection, doc, getDocs, setDoc, query, writeBatch, where, updateDoc } from 'firebase/firestore'
import { useState } from 'react'

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([])
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
        batch.update(docRef, { isRented: false })
      })

      await batch.commit()
      console.log('Successfully updated documents with "featured: false"')
    } catch (error) {
      console.error('Error updating documents:', error)
    }
  }

  const updateRentedVehicle = async (vehicleId, newValue) => {
    const vehicleRef = doc(db, 'rent', vehicleId)
    try {
      await updateDoc(vehicleRef, {
        isRented: newValue,
      })
    } catch (error) {
      console.error('Error updating document:', error)
    }
  }

  const addSaleVehicle = async ({ vehicleData }) => {
    try {
      const docRef = await addDoc(saleCollection, vehicleData)
    } catch (error) {}
  }

  const addRentalVehicle = async ({ vehicleData }) => {
    try {
      const docRef = await addDoc(rentCollection, vehicleData)
    } catch (error) {
      console.error('Error adding document:', error)
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

  return {
    vehicles,
    addSaleVehicle,
    addRentalVehicle,
    addSaleVehicle,
    getRentalVehicles,
    getSaleVehicles,
    getFeaturedSaleVehicles,
    getFeaturedRentalVehicles,
    addVehicles,
    updateAllVehicles,
    updateRentedVehicle,
  }
}
