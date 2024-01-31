import React, { useState } from 'react'
import AsesorateUI from './components/AsesorateUI'
import { type Tasa } from '../../models/Tasa.model'
import { TasaService } from '../../services/Tasa.service'
import { useAuth } from '../../hooks/Auth.hook'

const tasaService = new TasaService()

const AsesoratePage: React.FC = () => {
  const { user } = useAuth()
  const [tasas, setTasas] = useState<Tasa[] | undefined>(undefined)

  const getTasas = () => {
    tasaService.getListener(setTasas)
  }

  React.useEffect(getTasas, [user])

  return (
    <AsesorateUI
      tasas={tasas}
    />
  )
}

export default AsesoratePage
