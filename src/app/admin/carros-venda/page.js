'use client'
import MyTable from '@/components/MyTable'
import { useVehicles } from '@/hooks/useVehicles'
import React, { useEffect, useMemo, useState } from 'react'

export default function CarrosVenda() {
  const { getSaleVehicles } = useVehicles()
  const [isLoading, setIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])

  const fetchRentalVehicles = async () => {
    try {
      const saleVehicles = await getSaleVehicles()
      console.log('Fetched sale vehicles')
      setVehicles(saleVehicles)
    } catch (error) {
      console.error('Error fetching sale vehicles:', error)
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
        data={vehicles}
      />
    </div>
  )
}
