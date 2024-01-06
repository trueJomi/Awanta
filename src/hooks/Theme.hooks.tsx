import React, { createContext, useEffect } from 'react'
import { getCurrentTheme } from '../utilities/localStorage.utilities'
import { ThemeProvider, createTheme, useMediaQuery, useTheme } from '@mui/material'

interface PropsTheme {
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
  theme: 'light' | 'dark'
}

const themeContext = createContext<PropsTheme>({ setTheme: () => {}, theme: 'light' })

export const ThemeHook: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    const theme = getCurrentTheme()
    if (theme === null) {
      if (prefersDarkMode) {
        return 'dark'
      } else {
        return 'light'
      }
    }
    return theme
  })
  const themeMUI = useTheme()

  const themeMui = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme
        }
      }),
    [theme]
  )

  useEffect(() => {
    if (theme === 'light') {
      setTheme('light')
      themeMUI.palette.mode = 'light'
      document.querySelector('html')?.classList.remove('dark')
    } else {
      setTheme('dark')
      themeMUI.palette.mode = 'dark'
      document.querySelector('html')?.classList.add('dark')
    }
  }, [theme])

  const val: PropsTheme = {
    theme,
    setTheme
  }

  return (
    <themeContext.Provider value = {val}>
        <ThemeProvider theme={themeMui}>
            {children}
        </ThemeProvider>
    </themeContext.Provider>
  )
}

export const useMyTheme = () => React.useContext(themeContext)
