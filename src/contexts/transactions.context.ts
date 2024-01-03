import { type Categoria } from '../models/Categoria.model'
import { orderByCantidad, orderByDate } from '../utilities/filters.utilities'
import { bbvaLogo, bcpLogo, cmrLogo, interbankLogo, yapeLogo } from './images.context'

export const allOriginis = [
  {
    name: 'EFECTIVO',
    logo: undefined
  },
  {
    name: 'BCP',
    color: 'white',
    logo: bcpLogo
  },
  {
    name: 'BBVA',
    color: 'white',
    logo: bbvaLogo
  },
  {
    name: 'INTERBANK',
    color: 'white',
    logo: interbankLogo
  },
  {
    name: 'YAPE',
    color: 'white',
    logo: yapeLogo
  },
  {
    name: 'CMR',
    color: 'white',
    logo: cmrLogo
  }
]

export const arrayOrigins = allOriginis.map((item) => item.name)
export const cartegorysDefault: Categoria[] = [
  { nombre: 'consumo', color: '#3a5c92' },
  { nombre: 'Entretenimiento', color: '#f77c00' },
  { nombre: 'Alimento', color: '#ffc34d' },
  { nombre: 'Transporte', color: '#3e3e3e' }
]

export const filtersTransactions = [
  {
    name: 'date',
    filter: orderByDate
  },
  {
    name: 'amount',
    filter: orderByCantidad
  }
]
