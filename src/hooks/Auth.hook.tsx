import React from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, getUserId } from '../services/AuthFirebase.service'
import { type Usuario } from '../models/Usuario.model'
import { UserService } from '../services/User.service'

interface ContextProps {
  authState: boolean | undefined
  user: Usuario | undefined
}

const userService = new UserService()
export const AuthContext = React.createContext<ContextProps>({ authState: undefined, user: undefined })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = React.useState<boolean | undefined >(undefined)
  const [user, setUser] = React.useState<Usuario | undefined>(undefined)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthState(Boolean(user))
    })
  }, [])

  React.useEffect(() => {
    if (authState === true) {
      userService.getListener(getUserId(), setUser)
    }
  }, [authState])

  return (
    <AuthContext.Provider
        value={{
          authState,
          user
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
