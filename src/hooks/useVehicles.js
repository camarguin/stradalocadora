import { db } from '@/services/firebase'
import { collection, doc, getDocs, setDoc, writeBatch } from 'firebase/firestore'
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

  const addSaleVehicle = async ({ vehicleData }) => {
    try {
      const docRef = await addDoc(saleCollection, vehicleData)
    } catch (error) {}
  }
  const addRentalVehicle = async ({ vehicleData }) => {
    try {
      const docRef = await addDoc(rentCollection, vehicleData)
    } catch (error) {}
  }

  const addVehicles = async (vehiclesData) => {
    const batch = writeBatch(db)

    vehiclesData.forEach((vehicleData) => {
      const newVehicleRef = doc(saleCollection)
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
    addVehicles,
  }
}
