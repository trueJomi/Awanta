import { type EndpointCategory } from '../models/EndPointModel/EndpointCategory.model'
import { type Categoria } from '../models/Categoria.model'

export const adapterCategoria = (category: EndpointCategory) => {
  const formaterCategory: Categoria = {
    nombre: category.name,
    color: category.color
  }
  return formaterCategory
}

export const adapterEndpointCategoria = (category: Categoria) => {
  const formaterEndpointCategory: EndpointCategory = {
    name: category.nombre,
    color: category.color
  }
  return formaterEndpointCategory
}

export const adapterCategoriaNombre = (categorias: Categoria[]) => {
  const dataAll = categorias.map((category) => { return category.nombre })
  const data = dataAll.filter((category) => { return category !== 'consumo' })
  return data
}
