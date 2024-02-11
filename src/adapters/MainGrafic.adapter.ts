import { type Categoria } from '../models/Categoria.model'
import { type LimiteGastos } from '../models/LimiteGastos.model'
import { type Transaccion } from '../models/Transaccion.model'
import { type MainGrafic } from '../models/utils/Grrafic.model'
import { filtroChangeDollar, sumaCantidad } from '../utilities/filters.utilities'
import { adapterNumberString, adapterStringtoNumber } from './Numbers.adapter'

const toMainGrafic = (list: Transaccion[], type: string, color: string, limiteGastos: LimiteGastos): MainGrafic => {
  const dataMoney = list.map(filtroChangeDollar)
  const countMoney = sumaCantidad(dataMoney)
  const porcent = (countMoney / limiteGastos.cantidad) * 100
  return {
    type,
    cant: adapterNumberString(countMoney),
    color,
    porcent: adapterNumberString(porcent)
  }
}

export const tranformDataMixerGrafic = (limiteGastos: LimiteGastos, transactions: Transaccion[], categorys: Categoria[], aditionals: boolean = false) => {
  const listData: MainGrafic[] = []
  for (const item of categorys) {
    const dataNoFilter = transactions.filter((x) => { return x.categoria === item.nombre })
    listData.push(toMainGrafic(dataNoFilter, item.nombre, item.color, limiteGastos))
  }
  let countTrans = 0
  for (const item of listData) {
    countTrans = countTrans + adapterStringtoNumber(item.cant)
  }
  const cantMeta = limiteGastos.cantidad - countTrans
  if (aditionals) {
    if (cantMeta > 0) {
      const porcentMeta = (cantMeta / limiteGastos.cantidad) * 100
      const metaData: MainGrafic = {
        type: 'ahorro',
        cant: adapterNumberString(cantMeta),
        porcent: adapterNumberString(porcentMeta),
        color: '#c6c6c6'
      }
      listData.push(metaData)
    } else {
      const cantMetaNegative = (limiteGastos.cantidad - countTrans) * -1
      const porcentMeta = (cantMetaNegative / limiteGastos.cantidad) * 100
      const metaData = {
        type: 'ecxeso',
        cant: adapterNumberString(cantMetaNegative),
        porcent: adapterNumberString(porcentMeta),
        color: '#ff0000'
      }
      listData.push(metaData)
    }
  }
  return listData
}

export const getAcumuladoMainGrafic = (graficData: MainGrafic[]) => {
  const listFuera = graficData.filter((item) => {
    if (item.type === 'ahorro' || item.type === 'ecxeso') {
      return false
    } else {
      return true
    }
  })
  let count = 0
  if (graficData.length === 0) {
    return 0
  } else {
    for (const item of listFuera) {
      count = count + (+item.cant)
    }
    return count
  }
}

export const createLabelsFromMainGrafic = (data: MainGrafic[]) => {
  const Templabel: string[] = []
  const TempData: number[] = []
  const TempBGC: string[] = []
  for (const item of data) {
    TempData.push(adapterStringtoNumber(item.cant))
    TempBGC.push(item.color)
    Templabel.push(item.type)
  }
  const datareturn = {
    label: Templabel,
    data: TempData,
    bgc: TempBGC
  }
  return datareturn
}

export const toLabelsGrafic = (limiteGastos: LimiteGastos, transactions: Transaccion[], categorys: Categoria[], aditionals: boolean = false) => {
  const mainGrafic = tranformDataMixerGrafic(limiteGastos, transactions, categorys, aditionals)
  const data = createLabelsFromMainGrafic(mainGrafic)
  return data
}
