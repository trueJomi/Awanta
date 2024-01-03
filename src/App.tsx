import React from 'react'
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import Routers from './Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/Auth.hook'
import { GmailProvider } from './hooks/Gmail.hook'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { ModalServiceProvider } from './hooks/Modal.hook'
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true
})

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  )
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <AuthProvider>
          <BrowserRouter>
            <GmailProvider>
              <ModalServiceProvider>
                <Routers/>
              </ModalServiceProvider>
            </GmailProvider>
          </BrowserRouter>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
