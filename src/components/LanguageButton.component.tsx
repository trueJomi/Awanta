import React from 'react'
import { MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { fullLengaujesArray } from '../contexts/language.context'
import CustomInput from './Custom/CustomInput.component'

const LanguageButton: React.FC = () => {
  const { t, i18n } = useTranslation()

  const saveLang = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    void i18n.changeLanguage(input.target.value)
  }

  return (
    <CustomInput
              type="text"
              change={saveLang}
              value={i18n.language}
              select
              name='languaje'
              label={t('comon.laguaje.input-select')}
            >
            {fullLengaujesArray.map((item) => (
              <MenuItem
                key={item}
                value={item}
              >
              {t(`comon.laguaje.items.${item}`)}
              </MenuItem>
            ))}
        </CustomInput>
  )
}

export default LanguageButton
