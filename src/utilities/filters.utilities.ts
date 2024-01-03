import { moneyString } from '../contexts/money.context'
import { type Transaccion } from '../models/Transaccion.model'

export const filtroVisivility = (data: Transaccion) => {
  if (data.visibilidad) {
    return true
  } else {
    return false
  }
}

export const filtroEmail = (data: Transaccion) => {
  if (data.correo) {
    return true
  } else {
    return false
  }
}

export const filtroChangeDollar = (data: Transaccion) => {
  if (data.moneda === 'USD') {
    const newData: Transaccion = { ...data, moneda: moneyString.PEN, cantidad: 3.68 * (+data.cantidad) }
    return newData
  } else {
    return data
  }
}

export const filtredTransactionOrigin = (data: Transaccion[], origin: string) => {
  const data2 = [...data]
  const newData = data2.filter((item) => {
    if (origin === 'all') {
      return true
    } else {
      if (item.origen === origin) {
        return true
      } else {
        return false
      }
    }
  })
  return newData
}

export const sumaCantidad = (data?: Transaccion[]) => {
  if (data === undefined) return 0
  let count = 0
  for (const item of data) {
    if (item.moneda === moneyString.USD) {
      count = count + (3.68 * (+item.cantidad))
    } else {
      count = count + (+item.cantidad)
    }
  }
  return count
}

export const cutArrayFirst = (transactions: Transaccion[] | undefined, cant: number) => {
  if (transactions === undefined) return undefined
  const newData = transactions.slice(0, cant)
  return newData
}

export const orderByDate = (data: Transaccion[]) => {
  const newData = [...data]
  newData.sort((a, b) => {
    const dateA = new Date(a.fecha)
    const dateB = new Date(b.fecha)
    return dateB.getTime() - dateA.getTime()
  })
  return newData
}

export const invertArray = (data: Transaccion[]) => {
  const newData = [...data]
  return newData.reverse()
}

export const orderByCantidad = (data: Transaccion[]) => {
  const newData = [...data]
  newData.sort((a, b) => {
    return +b.cantidad - +a.cantidad
  })
  return newData
}
