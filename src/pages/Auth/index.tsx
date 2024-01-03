import React from 'react'
import { AuthUI } from './components/AuthUI'
import LoginWithGoogle from './components/LoginWithGoogle'

const AuthPage: React.FC = () => {
  return (
        <AuthUI>
            <LoginWithGoogle/>
        </AuthUI>
  )
}

export default AuthPage
