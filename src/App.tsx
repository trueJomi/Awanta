import React from 'react'
import Routers from './Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/Auth.hook'
import { GmailProvider } from './hooks/Gmail.hook'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { registerSW } from 'virtual:pwa-register'
import { ThemeHook } from './hooks/Theme.hooks'

registerSW({
  immediate: true
})

const App: React.FC = () => {
  return (
      <ThemeHook>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <AuthProvider>
            <BrowserRouter>
              <GmailProvider>
                  <Routers/>
              </GmailProvider>
            </BrowserRouter>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeHook>
  )
}

export default App
