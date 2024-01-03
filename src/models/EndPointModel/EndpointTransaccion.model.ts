import { type Timestamp } from 'firebase/firestore'

export interface EndpointTransaccion {
  uid?: string
  amount: number
  date: Timestamp
  description: string
  id: string
  money: string
  origin: string
  type: string
  user: string
  category: string
  visibility: boolean
  email: boolean
}
