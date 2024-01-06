import React from 'react'
import Routers from './Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/Auth.hook'
import { GmailProvider } from './hooks/Gmail.hook'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { ModalServiceProvider } from './hooks/Modal.hook'
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
                <ModalServiceProvider>
                  <Routers/>
                </ModalServiceProvider>
              </GmailProvider>
            </BrowserRouter>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeHook>
  )
}

export default App
