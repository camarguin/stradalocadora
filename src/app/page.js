import { CardCar } from '@/components/CardCar'
import { CardsContainer } from '@/components/CardsContainer'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Menubar } from '@/components/Menubar'

const cars = [
  { name: 'car 1', km: '53000', price: '139992', year: '19/20' },
  { name: 'car 2', km: '23000', price: '22000', year: '19/20' },
  { name: 'car 3', km: '139900', price: '30000', year: '19/20' },
  { name: 'car 4', km: '39900', price: '36000', year: '22/23' },
  { name: 'car 5', km: '39900', price: '36000', year: '22/23' },
]

export default function Home() {
  return (
    <>
      <Hero />
      <CardsContainer cars={cars} />
      <Footer />
    </>
  )
}
