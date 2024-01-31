import { type DataLimites } from '../models/DataLimites.model'
import { comonCreateDataWithId, comonGetData } from './ComonFirebase.service'

export class DataLimitesService {
  async save (id: string, data: DataLimites) {
    return await comonCreateDataWithId(data, 'DataLimites', id)
  }

  async get (id: string, idDataLimites: string) {
    return await comonGetData(`User/${id}/DataLimites`, idDataLimites)
  }
}
