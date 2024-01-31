import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './Auth.hook'
import Loading from '../components/Loading.component'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authState, user } = useContext(AuthContext)

  if (authState === undefined) {
    return <Loading/>
  }
  if (user !== undefined && !user.TerminosYCondiciones) {
    return <Navigate to="/create/politics" />
  }
  if (!authState) {
    return <Navigate to='/auth' />
  }

  return children
}

export default PrivateRoute
