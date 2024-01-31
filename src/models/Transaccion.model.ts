export interface TransaccionBase {
  cantidad: string
  fecha: Date
  descripcion: string
  idTransaccion: string
  moneda: string
  origen: string
  tipo: string
  usuario: string
  categoria: string
  visibilidad: boolean
  correo: boolean
}

export interface Transaccion extends TransaccionBase {
  id: string
}
