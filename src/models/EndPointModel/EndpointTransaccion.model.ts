import { type Timestamp } from 'firebase/firestore'

export interface EndpointTransaccionBase {
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

export interface EndpointTransaccion extends EndpointTransaccionBase {
  uid: string
}
