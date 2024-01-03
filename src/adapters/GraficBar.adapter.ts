import { type Transaccion } from '../models/Transaccion.model'
import { type GraficBarModel } from '../models/utils/BarGrafic.model'

export const toGraficBarModel = (transactions: Transaccion[]): GraficBarModel => {
  const labels: string[] = []
  const data: number[] = []
  let acumulado: number = 0
  for (const item of transactions) {
    if (item.moneda === 'USD') {
      acumulado = acumulado + (3.68 * (+item.cantidad))
    } else {
      acumulado = acumulado + (+item.cantidad)
    }
    data.push(acumulado)
    labels.push(item.fecha
      .toLocaleDateString('es-PE', { month: 'short', day: 'numeric' }))
  }
  return {
    labels,
    data
  }
}
