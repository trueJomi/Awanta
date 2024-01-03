import React from 'react'
import { loginWithGoogle } from '../../../services/AuthFirebase.service'
import { useTranslation } from 'react-i18next'

const LoginWithGoogle: React.FC = () => {
  const { t } = useTranslation()
  return (
        <>
            <button
                className="p-2 px-3 w-full shadow-lg text-center bg-gray-800 text-main-white dark:bg-white border border-gray-300 rounded-full dark:text-main-brown "
                onClick={() => { void loginWithGoogle() }}>
                <img
                className="h-6 inline-block mr-2"
                src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK" alt="google"/>
                {t('auth.google')}
            </button>
        </>
  )
}

export default LoginWithGoogle
