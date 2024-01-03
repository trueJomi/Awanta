import { type DocumentData, type QuerySnapshot } from 'firebase/firestore'
import { type EndpointTasa } from '../models/EndPointModel/EndpointTasa.model'
import { adapterTasa } from '../adapters/TasaAdapter.adapter'
import { type Tasa } from '../models/Tasa.model'
import { comonGetOrderByParam, comonGetOrderByParamListener } from './ComonFirebase.service'

export class TasaService {
  private getTasaArray (docs: QuerySnapshot<DocumentData>) {
    const data: Tasa[] = []
    if (docs.empty) return []
    docs.forEach((item) => {
      const dataTemp: EndpointTasa = {
        ...item.data() as EndpointTasa,
        id: item.id
      }
      const dataTranformed = adapterTasa(dataTemp)
      data.push(dataTranformed)
    })
    return data
  }

  async get () {
    const tasaDoc = await comonGetOrderByParam('Tasas', undefined, 'rate', 12, 'desc')
    return this.getTasaArray(tasaDoc)
  }

  getListener = (fun: (data: Tasa[]) => void) => {
    return comonGetOrderByParamListener('Tasas', undefined, 'rate', 12, 'desc', (data) => {
      const result = this.getTasaArray(data)
      fun(result)
    })
  }
}
