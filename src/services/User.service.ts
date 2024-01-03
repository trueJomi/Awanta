import { type DocumentData, type DocumentSnapshot } from 'firebase/firestore'
import { type Usuario } from '../models/Usuario.model'
import { type EndpointUser } from '../models/EndPointModel/EndpointUser.model'
import { adapterEndpointUsuario, adapterUsuario } from '../adapters/Usuario.adapter'
import { comonCreateData, comonGetAllDataWhere, comonGetData, comonGetDataListener, comonUpdateData } from './ComonFirebase.service'
import { type Categoria } from '../models/Categoria.model'
import { adapterEndpointCategoria } from '../adapters/Categoria.adapter'

export class UserService {
  // funtion get
  private getfun (doc: DocumentSnapshot<DocumentData>) {
    if (doc.exists()) {
      const dataRaw: EndpointUser = {
        ...doc.data() as EndpointUser,
        id: doc.id
      }
      const data = adapterUsuario(dataRaw)
      return data
    } else {
      return undefined
    }
  }

  async save (dataRaw: Usuario, id: string) {
    const data = adapterEndpointUsuario(dataRaw)
    await comonCreateData(data, 'User', id)
  }

  // funtion get exports
  async get (id: string) {
    const doc = await comonGetData('User', id)
    const data = this.getfun(doc)
    return data
  }

  getListener = (id: string, fun: (user: Usuario | undefined) => void) => {
    const unSubcribe = comonGetDataListener('User', id, (doc) => {
      const data = this.getfun(doc)
      fun(data)
    })
    return unSubcribe
  }

  async update (data: any, id: string) {
    await comonUpdateData(data, 'User', id)
  }

  async existClientByEmail (email: string) {
    const clientesDocs = await comonGetAllDataWhere('Clients', undefined, 'email', email)
    if (clientesDocs.empty) {
      return false
    } else {
      return true
    }
  }

  async existUserById (id: string) {
    const clientesDocs = await comonGetData('User', id)
    if (clientesDocs.exists()) {
      return true
    } else {
      return false
    }
  }

  async updateCategorias (user: Usuario, categoria: Categoria) {
    const categorysRaw = user.categoria
    categorysRaw.push(categoria)
    const categorys = categorysRaw.map(adapterEndpointCategoria)
    const data = {
      category: categorys
    }
    await comonUpdateData(data, 'User', user.idUser)
  }

  async eliminarCategoria (user: Usuario, categoria: Categoria) {
    const id = user.idUser
    const categorysRaw = user.categoria
    const deletedCategory = categorysRaw.filter((item) => item.nombre !== categoria.nombre)
    const categorys = deletedCategory.map(adapterEndpointCategoria)
    const data = {
      category: categorys
    }
    void comonUpdateData(data, 'User', id)
    const transacciones = await comonGetAllDataWhere('Transaction', id, 'category', categoria.nombre)
    if (!transacciones.empty) {
      transacciones.forEach((docs) => {
        const update = {
          category: 'consumo'
        }
        void comonUpdateData(update, `User/${id}/Transaction`, docs.id)
      })
    }
  }
}
