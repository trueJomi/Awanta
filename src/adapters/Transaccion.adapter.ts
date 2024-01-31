import { Timestamp } from 'firebase/firestore'
import { type EndpointTransaccion, type EndpointTransaccionBase } from '../models/EndPointModel/EndpointTransaccion.model'
import { type TransaccionBase, type Transaccion } from '../models/Transaccion.model'
import { type Categoria } from '../models/Categoria.model'
import { generateArray } from '../utilities/array.utilites'
import { cartegorysDefault } from '../contexts/transactions.context'

export const adapterTransaccion = (transaccion: EndpointTransaccion) => {
  const formaterTransaccion: Transaccion = {
    id: transaccion.uid,
    idTransaccion: transaccion.id,
    cantidad: transaccion.amount.toString(),
    descripcion: transaccion.description,
    moneda: transaccion.money,
    origen: transaccion.origin,
    tipo: transaccion.type,
    fecha: transaccion.date.toDate(),
    usuario: transaccion.user,
    categoria: transaccion.category,
    visibilidad: transaccion.visibility,
    correo: transaccion.email
  }
  return formaterTransaccion
}

export const adapterEndpointTransaccionBase = (transaccion: TransaccionBase) => {
  const formaterEndpointTransaccion: EndpointTransaccionBase = {
    id: transaccion.idTransaccion,
    amount: +transaccion.cantidad,
    description: transaccion.descripcion,
    money: transaccion.moneda,
    origin: transaccion.origen,
    type: transaccion.tipo,
    date: Timestamp.fromDate(transaccion.fecha),
    user: transaccion.usuario,
    category: transaccion.categoria,
    visibility: transaccion.visibilidad,
    email: transaccion.correo
  }
  return formaterEndpointTransaccion
}

export const adapterEndpointTransaccion = (transaccion: Transaccion) => {
  const formaterEndpointTransaccion: EndpointTransaccionBase = {
    id: transaccion.idTransaccion,
    amount: +transaccion.cantidad,
    description: transaccion.descripcion,
    money: transaccion.moneda,
    origin: transaccion.origen,
    type: transaccion.tipo,
    date: Timestamp.fromDate(transaccion.fecha),
    user: transaccion.usuario,
    category: transaccion.categoria,
    visibility: transaccion.visibilidad,
    email: transaccion.correo
  }
  return formaterEndpointTransaccion
}

export const obtainAllByCategory = (transacciones: Transaccion[], categorias: Categoria[]) => {
  const result = []
  const allData: number[] = []
  for (const categoria of categorias) {
    const transactionByCategory = transacciones.filter((t, i) => {
      if (t.categoria === categoria.nombre) {
        allData.push(i)
        return true
      } else {
        return false
      }
    })
    result.push({
      category: categoria,
      data: transactionByCategory
    })
  }
  if (allData.length < transacciones.length) {
    const initIndex = generateArray(transacciones.length).map((i) => i - 1)
    const indexRestant = initIndex.filter((i) => !allData.includes(i))
    const idxCategory = result.findIndex((r) => r.category.nombre === cartegorysDefault[0].nombre)
    for (const idx of indexRestant) {
      result[idxCategory].data.push(transacciones[idx])
    }
  }

  return result
}
