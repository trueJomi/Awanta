import { type DocumentData, type QueryDocumentSnapshot, Timestamp } from 'firebase/firestore'
import { type EndpointLimiteGastos } from '../models/EndPointModel/EndpointLimiteGastos.model'
import { type LimiteGastos } from '../models/LimiteGastos.model'

export const adapterLimiteGastos = (limiteGastos: EndpointLimiteGastos) => {
  const formaterLimiteGastos: LimiteGastos = {
    id: limiteGastos.id ?? '0',
    cantidad: limiteGastos.amount,
    moneda: limiteGastos.money,
    fecha: limiteGastos.date.toDate(),
    categoria: limiteGastos.category
  }
  return formaterLimiteGastos
}

export const adapterEndpointLimiteGastos = (limiteGastos: LimiteGastos) => {
  const formaterEndpointLimiteGastos: EndpointLimiteGastos = {
    id: limiteGastos.id ?? '0',
    amount: limiteGastos.cantidad,
    money: limiteGastos.moneda,
    date: Timestamp.fromDate(limiteGastos.fecha),
    category: limiteGastos.categoria

  }
  return formaterEndpointLimiteGastos
}

export const adapterLimiteGastosDocument = (query: QueryDocumentSnapshot<DocumentData>) => {
  const limiteGastos = query.data()
  const formaterEndpointLimiteGastos: EndpointLimiteGastos = {
    id: query.id,
    amount: limiteGastos.amount,
    money: limiteGastos.money,
    date: limiteGastos.fecha,
    category: limiteGastos.category

  }
  return formaterEndpointLimiteGastos
}
