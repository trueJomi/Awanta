import { type Categoria } from './Categoria.model'

export interface Usuario {
  TerminosYCondiciones: boolean
  email: string
  id?: string
  idUser: string
  img: string
  apellido: string
  nombre: string
  proveedor: string
  categoria: Categoria[]
  diaInicial: number
  telefono: string
  salario: number
  FechaInicio?: Date
}
