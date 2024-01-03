import { type Timestamp } from 'firebase/firestore/lite'

export interface EndpointLimiteGastos {
  id?: string
  amount: number
  date: Timestamp
  money: string
  category: string
}
