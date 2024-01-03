import React from 'react'
import UserUI from './UserUI'
import LayoutReturn from '../../components/LayoutReturn.component'
import { useAuth } from '../../hooks/Auth.hook'
import { useTranslation } from 'react-i18next'

const UserPage: React.FC = () => {
  const { user } = useAuth()
  const { t } = useTranslation()
  return (
    <LayoutReturn name={t('comon.user.header')}>
      <UserUI user={user}/>
    </LayoutReturn>
  )
}

export default UserPage
