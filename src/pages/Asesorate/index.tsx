import React, { useState } from 'react'
import AsesorateUI from './components/AsesorateUI'
import { type Tasa } from '../../models/Tasa.model'
import { MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TasaService } from '../../services/Tasa.service'
import { useAuth } from '../../hooks/Auth.hook'
import CustomInput from '../../components/Custom/CustomInput.component'

const AsesoratePage: React.FC = () => {
  const { user } = useAuth()
  const tasaService = new TasaService()
  const { t } = useTranslation()
  const [tasas, setTasas] = useState<Tasa[] | undefined>(undefined)
  const [amount, setAmount] = React.useState<number>(0)
  const [comp1, setComp1] = React.useState<number>(0)
  const [comp2, setComp2] = React.useState<number>(1)
  const [comp3, setComp3] = React.useState<number>(2)

  const saveAmount = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (+input.target.value >= 0) {
      setAmount(+input.target.value)
    }
  }

  const saveComp1 = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComp1(+input.target.value)
  }

  const saveComp2 = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComp2(+input.target.value)
  }

  const saveComp3 = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComp3(+input.target.value)
  }

  const getTasas = () => {
    tasaService.getListener(setTasas)
  }

  React.useEffect(getTasas, [user])

  return (
    <AsesorateUI
    inputAmount={
      <CustomInput
        required
        valueDefault={0}
        name="Dinero incial"
        label={t('tab-4.input-money')}
        change={saveAmount}
        type="number"
        inputProps={{
          placeholder: '0.00',
          startAdornment: <span className="mr-3" >S/</span>
        }}
      />}
    inputTasa1={
      <CustomInput
          select
          type="number"
          name="comparation 1"
          value={comp1}
          change={saveComp1}
      >
          { tasas !== undefined
            ? tasas.map((item, indx) => (
                <MenuItem
                key={item.id}
                value={indx}
                >{item.nombre}</MenuItem>
            ))
            : <MenuItem
              value={0} >
              {t('tab-4.bank')}
              </MenuItem>
          }
      </CustomInput>}
         inputTasa2={<CustomInput
          select
          type="number"
          name="comparation 1"
          value={comp2}
          change={saveComp2}
      >
        { tasas !== undefined
          ? tasas.map((item, indx) => (
                <MenuItem
                key={item.id}
                value={indx}
                >{item.nombre}</MenuItem>
          ))
          : <MenuItem
              value={0} >
              {t('tab-4.bank')}
              </MenuItem>
          }
    </CustomInput>}
        inputTasa3={<CustomInput
          select
          type="number"
          name="comparation 1"
          value={comp3}
          change={saveComp3}
      >
        { tasas !== undefined
          ? tasas.map((item, indx) => (
                <MenuItem
                key={item.id}
                value={indx}
                >{item.nombre}</MenuItem>
          ))
          : <MenuItem
              value={0} >
              {t('tab-4.bank')}
              </MenuItem>
          }
    </CustomInput>}
    amount={amount}
    tasas={tasas}
    tasa1={comp1}
    tasa2={comp2}
    tasa3={comp3}
    />
  )
}

export default AsesoratePage
