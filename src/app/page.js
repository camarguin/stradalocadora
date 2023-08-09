import { CardCar } from '@/components/CardCar'
import { Footer } from '@/components/Footer'

const cars = [
  { name: 'car 1', km: '53000', price: '139992', year: '19/20' },
  { name: 'car 2', km: '23000', price: '22000', year: '19/20' },
  { name: 'car 3', km: '139900', price: '30000', year: '19/20' },
  { name: 'car 4', km: '39900', price: '36000', year: '22/23' },
  { name: 'car 5', km: '39900', price: '36000', year: '22/23' },
]

export default function Home() {
  return (
    <div>
      home page
      <CardCar car={cars[1]} />
      <Footer />
    </div>
  )
}
