import { type Timestamp } from 'firebase/firestore'
import { type EndpointCategory } from './EndpointCategory.model'

export interface EndpointUser {
  TermsAndCondition: boolean
  email: string
  id: string
  img: string
  lastname: string
  name: string
  proveedor: string
  phone: string
  dateinit?: Timestamp
  category: EndpointCategory[]
  initDay: number
  salary: number
}
