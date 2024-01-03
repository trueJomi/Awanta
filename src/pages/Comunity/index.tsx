import React from 'react'
import ComunityUI from './components/ComunityUI'
import { useAuth } from '../../hooks/Auth.hook'
const ComunityPage: React.FC = () => {
  const { user } = useAuth()

  const links = [
    'https://www.instagram.com/emprende.broders/',
    'https://www.instagram.com/inversion.simple/',
    'https://www.instagram.com/arenscristian/',
    'https://www.instagram.com/bolsillosllenos/',
    'https://www.instagram.com/ara.retadora.pe/',
    'https://www.instagram.com/therealdeal.blog/',
    'https://www.instagram.com/danielbonifazz/'
  ]

  return (
        <ComunityUI
            name={user?.nombre}
            perfiles={links}
        />
  )
}

export default ComunityPage
