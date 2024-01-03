import { type DocumentData, type QueryDocumentSnapshot, Timestamp } from 'firebase/firestore'
import { type EndpointUser } from '../models/EndPointModel/EndpointUser.model'
import { type Usuario } from '../models/Usuario.model'
import { adapterCategoria, adapterEndpointCategoria } from './Categoria.adapter'

export const adapterUsuario = (user: EndpointUser) => {
  const formaterUser: Usuario = {
    idUser: user.id,
    nombre: user.name,
    telefono: user.phone,
    apellido: user.lastname,
    FechaInicio: user.dateinit !== undefined ? user.dateinit.toDate() : undefined,
    email: user.email,
    proveedor: user.proveedor,
    img: user.img,
    TerminosYCondiciones: user.TermsAndCondition,
    categoria: user.category.map(adapterCategoria),
    diaInicial: user.initDay,
    salario: user.salary
  }
  return formaterUser
}

export const adapterEndpointUsuario = (user: Usuario) => {
  const formaterEndpointUser: EndpointUser = {

    id: user.idUser,
    name: user.nombre,
    phone: user.telefono,
    dateinit: user.FechaInicio !== undefined ? Timestamp.fromDate(user.FechaInicio) : undefined,
    lastname: user.apellido,
    email: user.email,
    proveedor: user.proveedor,
    img: user.img,
    TermsAndCondition: user.TerminosYCondiciones,
    category: user.categoria.map((x) => adapterEndpointCategoria(x)),
    initDay: user.diaInicial,
    salary: user.salario
  }
  return formaterEndpointUser
}

export const adapterUsuarioDocument = (query: QueryDocumentSnapshot<DocumentData>) => {
  const user = query.data()
  const formaterEndpointUser: EndpointUser = {
    id: query.id,
    name: user.name,
    phone: user.phone,
    dateinit: user.dateinit,
    lastname: user.lastname,
    email: user.email,
    proveedor: user.proveedor,
    img: user.img,
    TermsAndCondition: user.TermsAndCondition,
    category: user.category,
    initDay: user.initDay,
    salary: user.salary
  }
  return formaterEndpointUser
}
