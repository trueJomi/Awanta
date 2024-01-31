import { type Money } from '../models/utils/Money.model'
import { svgBanderaColombia, svgBanderaPeru, svgBanderaUnitedState } from './images.context'

export const AllMoney: Money[] = [
  {
    name: 'PEN',
    url: svgBanderaPeru,
    simbol: 'S/'
  },
  {
    name: 'USD',
    url: svgBanderaUnitedState,
    simbol: '$'
  },
  {
    name: 'COP',
    url: svgBanderaColombia,
    simbol: '$'
  },
  {
    name: 'CLP',
    url: svgBanderaColombia,
    simbol: '$'
  }
]

export const moneyString = {
  PEN: 'PEN',
  USD: 'USD',
  COP: 'COP',
  CLP: 'CLP'
}

export const telefonos = [
  {
    name: 'PE',
    number: '51',
    digits: 9
  },
  {
    name: 'COL',
    number: '57',
    digits: 10
  },
  {
    name: 'CL',
    number: '56',
    digits: 9
  }
]
