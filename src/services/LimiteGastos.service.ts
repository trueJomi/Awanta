import { adapterEndpointLimiteGastos, adapterLimiteGastos } from '../adapters/LimiteGasto.adapter'
import { type EndpointLimiteGastos } from '../models/EndPointModel/EndpointLimiteGastos.model'
import { type LimiteGastos } from '../models/LimiteGastos.model'
import { comonCreateDataWithId, comonGetOrderByParam, comonGetOrderByParamListener, comonUpdateData } from './ComonFirebase.service'

export class LimiteGastoService {
  async save (dataRaw: LimiteGastos, id: string) {
    const data = adapterEndpointLimiteGastos(dataRaw)
    return await comonCreateDataWithId(data, 'Meta', id)
  }

  async getMetaActual (id: string) {
    const doc = await comonGetOrderByParam('Meta', id, 'date', 1)
    if (doc.empty) {
      return undefined
    }
    const data: EndpointLimiteGastos = {
      ...doc.docs[0].data() as EndpointLimiteGastos,
      id: doc.docs[0].id
    }
    return adapterLimiteGastos(data)
  }

  getMetaActualListener (id: string, fun: (data: LimiteGastos | undefined) => void) {
    return comonGetOrderByParamListener('Meta', id, 'date', 1, undefined, (doc) => {
      if (doc.empty) {
        fun(undefined)
      }
      const data: EndpointLimiteGastos = {
        ...doc.docs[0].data() as EndpointLimiteGastos,
        id: doc.docs[0].id
      }
      fun(adapterLimiteGastos(data))
    })
  }

  async updateMeta (data: any, id: string) {
    await comonUpdateData(data, 'Meta', id)
  }
}
