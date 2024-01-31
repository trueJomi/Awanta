import { type LimiteGastos } from './LimiteGastos.model'

export interface DataLimites {
  id: string
  fecha: string
  salario: number
  limites: LimiteGastos[]
}
