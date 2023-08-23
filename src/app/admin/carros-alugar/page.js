'use client'
import MyTable from '@/components/MyTable'
import { db } from '@/services/firebase'
import { CopyIcon } from '@chakra-ui/icons'
import {
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
import { collection, getDocs } from 'firebase/firestore'

export default function CarrosAlugar() {
  const [data, setData] = useState([])
  // useEffect(() => {
  //   // Fetch data from Firestore
  //   const fetchData = async () => {
  //     try {
  //       const snapshot = await db.collection('vehicles').get()
  //       console.log(snapshot)
  //       const newData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //       setData(newData)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }

  //   fetchData()
  //   console.log(data)
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vehicles'))
        const newData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setData(newData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
    console.log(data)
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
        Header: 'KM',
        accessor: 'km',
        // Cell: ({ value }) => {
        //   return moment(value).format('DD/MM/YYYY')
        // },
      },
      {
        Header: 'Placa',
        accessor: 'plate',
      },
      {
        Header: 'Fipe',
        accessor: 'fipe',
      },
      {
        Header: 'Valor',
        accessor: 'price',
      },
      {
        Header: 'Porcentagem',
        accessor: 'percentage',
      },
    ],
    []
  )
  return (
    <div>
      <MyTable
        columns={columns}
        data={data}
      />
    </div>
  )
}
