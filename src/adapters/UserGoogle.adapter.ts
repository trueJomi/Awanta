import { cartegorysDefault } from '../contexts/transactions.context'
import { type Usuario } from '../models/Usuario.model'
import { type UserGoogle } from '../models/utils/UserGoogle.model'

export const adapterGoogleUser = (user: UserGoogle) => {
  const userFormat: Usuario = {
    idUser: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    img: user.img,
    proveedor: user.proveedor,
    FechaInicio: new Date(),
    TerminosYCondiciones: false,
    telefono: '',
    categoria: cartegorysDefault,
    diaInicial: 1,
    salario: 0
  }
  return userFormat
}
