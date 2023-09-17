'use client'
import MyTable from '@/components/MyTable'
import { useAuth } from '@/contexts/auth'
import { useVehicles } from '@/hooks/useVehicles'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

export default function CarrosVenda() {
  const { getSaleVehicles } = useVehicles()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [vehicles, setVehicles] = useState([])
  const router = useRouter()

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
          // return value.toFixed(2) + '%'
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
        <MyTable
          columns={columns}
          data={vehicles}
        />
      </div>
    )
  }
}
