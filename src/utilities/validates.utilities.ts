import { fullLengaujesArray } from '../contexts/language.context'
import { type Categoria } from '../models/Categoria.model'

export function validateLanguage (language: string) {
  if (language in fullLengaujesArray) {
    return true
  } else {
    return false
  }
}

export const validateCategory = (category: string, allCategorys: Categoria[]) => {
  if (category.trim() === '') {
    return false
  }
  const filtred = allCategorys.filter((cat) => cat.nombre === category)
  if (filtred.length > 0) {
    return false
  } else {
    return true
  }
}

export const validateSearch = (search: string | undefined) => {
  if (search === undefined) return false
  if (search.trim() === '') {
    return false
  } else {
    return true
  }
}
