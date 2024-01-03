import React, { useEffect } from 'react'
import LayoutReturn from '../../components/LayoutReturn.component'
import { useTranslation } from 'react-i18next'
import { SwitchDarkMode } from './components/CustomDarkmodeSwitch.component'
import CustomInput from '../../components/Custom/CustomInput.component'
import { generateArray } from '../../utilities/array.utilites'
import { MenuItem } from '@mui/material'
import { useAuth } from '../../hooks/Auth.hook'
import LanguageButton from '../../components/LanguageButton.component'

const arrayDays = generateArray(28)

const SettingsPage: React.FC = () => {
  const { user } = useAuth()
  const [initDay, setInitDay] = React.useState<number | undefined>(user?.diaInicial)
  const { t } = useTranslation()

  useEffect(() => {
    if (user !== undefined) {
      setInitDay(user.diaInicial)
    }
  }, [user])
  return (
    <LayoutReturn name={t('comon.settings.header')} >
      <div className='max-w-lg px-3 mx-auto' >
        <div className=' flex justify-end' >
          <SwitchDarkMode/>
        </div>
        <div className=' mt-5' >
          <CustomInput
            select
            type='number'
            value={initDay}
            valueDefault={user?.diaInicial}
            change={() => {}}
            name='init-day'
            label={t('comon.settings.init-day')}
          >
            {arrayDays.map((day) => (
              <MenuItem
                key={day}
                value={day}
              >
                {day}
              </MenuItem>
            ))}
          </CustomInput>
        </div>
        <div className=' mt-5' >
          <LanguageButton/>
        </div>
      </div>
    </LayoutReturn>
  )
}

export default SettingsPage
