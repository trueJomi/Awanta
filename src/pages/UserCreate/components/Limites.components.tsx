import React from 'react'
import CustomInput from '../../../components/Custom/CustomInput.component'
import { generateArray } from '../../../utilities/array.utilites'
import { useAuth } from '../../../hooks/Auth.hook'
import { MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'

const arrayDias = generateArray(28)

const Limites: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuth()

  const [initDay, setInitDay] = React.useState<number | undefined>(user?.diaInicial)

  const handleInitDay = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInitDay(+input.target.value)
  }

  return (
    <>
      <div>
        <CustomInput
          // defaultValue={user?.limiteGasto}
          name='limit '
          type='number'
          label='Limite de gastos'
        />
      </div>
      <div>
        <CustomInput
          defaultValue={user?.salario}
          type='number'
          name='salary'
          label='Salario'
        />
      </div>
      <div>
          <CustomInput
            select
            type='number'
            value={initDay}
            defaultValue={user?.diaInicial}
            onChange={handleInitDay}
            name='init-day'
            label={t('comon.settings.init-day')}
          >
            {arrayDias.map((day) => (
              <MenuItem
                key={day}
                value={day}
              >
                {day}
              </MenuItem>
            ))}
          </CustomInput>
      </div>
    </>
  )
}

export default Limites
