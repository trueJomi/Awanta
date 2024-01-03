import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './Auth.hook'
import Loading from '../components/Loading.component'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authState, user } = useContext(AuthContext)

  if (authState === undefined) {
    return <Loading/>
  }
  if (!authState) {
    return <Navigate to='/auth' />
  }
  if (user !== undefined && !user.TerminosYCondiciones) {
    return <Navigate to="/user/politics" />
  }

  return children
}

export default PrivateRoute
