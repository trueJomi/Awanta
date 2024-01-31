import React, { useMemo } from 'react'
import SteperPc from './components/SteperPc.component'
import FormUser from './components/FormUser.component'
import Limites from './components/Limites.components'
import PoliticsAndConditions from './components/PoliticsAndConditions.component'
import SeleccionBanks from './components/SeleccionBanks.component'
import { useTranslation } from 'react-i18next'

interface StepsCreateUser {
  name: string
  step: React.ReactNode
}

const UserCreate: React.FC = () => {
  const { t } = useTranslation()
  const steps: StepsCreateUser[] = useMemo(() => [
    {
      name: t('steps.1'),
      step: <FormUser/>
    },
    {
      name: t('steps.2'),
      step: <Limites/>
    },
    {
      name: t('steps.3'),
      step: <SeleccionBanks/>
    },
    {
      name: t('steps.4'),
      step: <div>agrege categorias</div>
    },
    {
      name: t('steps.5'),
      step: <PoliticsAndConditions/>
    }
  ], [t])
  return (
      <SteperPc steps={steps} />
  )
}

export default UserCreate
