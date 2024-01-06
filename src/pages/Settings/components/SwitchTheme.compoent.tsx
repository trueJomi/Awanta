import React from 'react'
import { useMyTheme } from '../../../hooks/Theme.hooks'
import { SwitchDarkMode } from './CustomDarkmodeSwitch.component'

const SwitchTheme: React.FC = () => {
  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }
  const { theme, setTheme } = useMyTheme()
  return (
    <SwitchDarkMode
        checked={theme === 'dark'}
        onClick={handleChangeTheme}
    />
  )
}

export default SwitchTheme
