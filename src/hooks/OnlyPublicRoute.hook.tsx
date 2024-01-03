import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './Auth.hook'
import Loading from '../components/Loading.component'

const OnlyPublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authState } = useContext(AuthContext)

  if (authState === undefined) {
    return <Loading/>
  }

  if (authState) {
    return <Navigate to='/' />
  }

  return children
}

export default OnlyPublicRoute
