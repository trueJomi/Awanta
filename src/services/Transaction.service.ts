import { adapterEndpointTransaccionBase } from './../adapters/Transaccion.adapter'
import { type DocumentData, type OrderByDirection, type QuerySnapshot } from 'firebase/firestore'
import { adapterTransaccion } from '../adapters/Transaccion.adapter'
import { type EndpointTransaccion } from '../models/EndPointModel/EndpointTransaccion.model'
import { type TransaccionBase, type Transaccion } from '../models/Transaccion.model'
import { comonCreateDataWithId, comonDeleteData, comonGetCantPages, comonGetData, comonGetDataListener, comonGetIntervalDate, comonGetIntervalDateListener, comonGetOrderByParam, comonGetOrderByParamListener, comonGetPaginated, comonUpdateData } from './ComonFirebase.service'

export class TransactionService {
  // crud
  async update (transaccion: TransaccionBase, id: string, idTransaccion: string) {
    const newTransaccion = adapterEndpointTransaccionBase(transaccion)
    await comonUpdateData(newTransaccion, `User/${id}/Transaction`, idTransaccion)
  }

  async save (data: TransaccionBase, id: string) {
    const tTran = adapterEndpointTransaccionBase(data)
    return await comonCreateDataWithId(tTran, 'Transaction', id)
  }

  async saveAll (allData: TransaccionBase[], id: string) {
    const tTran = allData.map((data) => adapterEndpointTransaccionBase(data))
    const promises = tTran.map(async (data) => {
      return await comonCreateDataWithId(data, 'Transaction', id)
    })
    return await Promise.all(promises)
  }

  async delete (id: string, idTransaccion: string) {
    await comonDeleteData(`User/${id}/Transaction`, idTransaccion)
  }

  // categorys
  async changeVisivility (visibilidad: boolean, id: string, idTransaccion: string) {
    const edit = {
      visibility: visibilidad
    }
    await comonUpdateData(edit, `User/${id}/Transaction`, idTransaccion)
  }

  changeCategorias = async (categoria: string, id: string, idTransaccion: string) => {
    const edit = {
      category: categoria
    }
    await comonUpdateData(edit, `User/${id}/Transaction`, idTransaccion)
  }

  private obtainArrayTransaction (transactionDocs: QuerySnapshot<DocumentData>) {
    const dataRaw: Transaccion[] = []
    if (transactionDocs.empty) return []
    transactionDocs.forEach((eTran) => {
      const dataTemp: EndpointTransaccion = {
        ...eTran.data() as EndpointTransaccion,
        uid: eTran.id
      }
      // console.log(dataTemp)
      const dataTransformed = adapterTransaccion(dataTemp)
      // console.log(dataTransformed)
      dataRaw.push(dataTransformed)
    })
    return dataRaw
  }

  async getOrdeByDate (id: string, limite: number = 3) {
    const transactionDocs = await comonGetOrderByParam('Transaction', id, 'date', limite)
    return this.obtainArrayTransaction(transactionDocs)
  }

  getOrdeByDateListener (id: string, limite: number = 3, fun: (data: Transaccion[]) => void, order: OrderByDirection = 'desc') {
    return comonGetOrderByParamListener('Transaction', id, 'date', limite, order, (data) => {
      const result = this.obtainArrayTransaction(data)
      fun(result)
    })
  }

  async getWithMonthInterval (id: string, day: number, month: number, order: OrderByDirection = 'asc') {
    const interval = this.getIntervalMonth(day, month)
    const docsData = await comonGetIntervalDate('Transaction', id, interval, order)
    return this.obtainArrayTransaction(docsData)
  }

  getWithMonthIntervalListener (id: string, day: number, month: number, order: OrderByDirection = 'asc', fun: (data: Transaccion[]) => void) {
    const interval = this.getIntervalMonth(day, month)
    return comonGetIntervalDateListener('Transaction', id, interval, order, (data) => {
      const result = this.obtainArrayTransaction(data)
      fun(result)
    })
  }

  async lastTransaction (id: string) {
    const transactionDocs = await comonGetOrderByParam('Transaction', id, 'date', 1)
    if (transactionDocs.empty) {
      return null
    }
    const data: EndpointTransaccion = {
      ...transactionDocs.docs[0].data() as EndpointTransaccion,
      uid: transactionDocs.docs[0].id
    }
    const dataFinal = adapterTransaccion(data)
    return dataFinal
  }

  async getWithPages (page: number, id: string, cantpages: number = 15) {
    const transactionDocs = await comonGetPaginated('Transaction', id, cantpages, page)
    return this.obtainArrayTransaction(transactionDocs)
  }

  async getPages (id: string, cantpages: number = 15) {
    return await comonGetCantPages('Transaction', id, cantpages)
  }

  async get (id: string, idTransaccion: string) {
    const doc = await comonGetData(`User/${id}/Transaction`, idTransaccion)
    if (!doc.exists()) {
      return undefined
    } else {
      const dataTemp: EndpointTransaccion = {
        ...doc.data() as EndpointTransaccion,
        uid: doc.id
      }
      const data = adapterTransaccion(dataTemp)
      return data
    }
  }

  getListener (id: string, idTransaccion: string, fun: (transaccion: Transaccion | undefined) => void) {
    return comonGetDataListener(`User/${id}/Transaction`, idTransaccion, (doc) => {
      if (!doc.exists()) {
        fun(undefined)
      } else {
        const dataTemp: EndpointTransaccion = {
          ...doc.data() as EndpointTransaccion,
          uid: doc.id
        }
        const data = adapterTransaccion(dataTemp)
        fun(data)
      }
    })
  }

  private getIntervalMonth (day: number, month?: number) {
    const date = new Date()
    let monthTemp: number
    if (month !== undefined) {
      monthTemp = month
    } else {
      monthTemp = date.getMonth()
    }
    const primerDia = new Date(date.getFullYear(), monthTemp, day, 0, 0, 0)
    const ultimoDia = new Date(date.getFullYear(), monthTemp + 1, day - 1, 23, 59, 59)
    return [primerDia, ultimoDia]
  }

  async getIntervalTransaction (id: string, dia: number, order: OrderByDirection = 'asc') {
    const interval = this.getIntervalMonth(dia)
    const docs = await comonGetIntervalDate('Transaction', id, interval, order)
    return this.obtainArrayTransaction(docs)
  }

  getIntervalTransactionListener (id: string, dia: number, order: OrderByDirection = 'asc', fun: (data: Transaccion[]) => void) {
    const interval = this.getIntervalMonth(dia)
    return comonGetIntervalDateListener('Transaction', id, interval, order, (docs) => {
      const result = this.obtainArrayTransaction(docs)
      fun(result)
    })
  }
}
