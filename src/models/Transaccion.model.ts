export interface Transaccion {
  cantidad: number
  fecha: Date
  descripcion: string
  id?: string
  idTransaccion: string
  moneda: string
  origen: string
  tipo: string
  usuario: string
  categoria: string
  visibilidad: boolean
  correo: boolean
}
