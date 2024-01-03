import { type EndpointTasa } from '../models/EndPointModel/EndpointTasa.model'
import { type Tasa } from '../models/Tasa.model'

export const adapterTasa = (tasa: EndpointTasa) => {
  const formatTasa: Tasa = {
    id: tasa.id ?? '0',
    nombre: tasa.name,
    tipo_cuenta: tasa.type_target,
    tasa: tasa.rate,
    mantenimiento: tasa.maintenance,
    img_url: tasa.img
  }
  return formatTasa
}
