import { type EndpointLimiteGastos } from './EndpointLimiteGastos.model'

export interface EndpointDataLimites {
  id: string
  date: string
  salary: number
  limits: EndpointLimiteGastos[]
}
