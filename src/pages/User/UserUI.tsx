import React from 'react'
import { useTranslation } from 'react-i18next'
import { type Usuario } from '../../models/Usuario.model'

const UserUI: React.FC<{ user: Usuario | undefined }> = ({ user }) => {
  const { t } = useTranslation()

  return (
    <div className="max-w-lg px-3 mx-auto">
        <div className="my-5" >
          <img
              className="mx-auto border-2 border-black w-32 h-32 rounded-full"
              src={user?.img}
              alt="useIcon"
          />
        </div>
      <div className='grid grid-cols-1 md:grid-cols-1 px-7 mb-10'>
          <div className="mb-5" >
            <h3 className="uppercase font-bold" >{t('comon.user.input-name')}</h3>
            <div className="border-2 border-black rounded-full py-4 text-center text-xl font-medium bg-slate-100 dark:bg-gray-800" >
              {user?.nombre}
            </div>
          </div>
          <div className="mb-5" >
            <h3 className="uppercase font-bold" >{t('comon.user.input-lastname')}</h3>
            <div className="border-2 border-black rounded-full py-4 text-center text-xl font-medium bg-slate-100 dark:bg-gray-800" >
              {user?.apellido}
            </div>
          </div>
          <div className="mb-5" >
            <h3 className="uppercase font-bold">{t('comon.user.input-email')}</h3>
            <div className="border-2 border-black rounded-full py-4 text-center text-xl font-medium bg-slate-100 dark:bg-gray-800" >
              {user?.email}
            </div>
          </div>
          <div className="mb-5" >
            <h3 className="uppercase font-bold" >{t('comon.user.input-origin')}</h3>
            <div className="text-center font-bold text-2xl capitalize" >
              <img
                className="h-20 w-20 inline-block mr-10"
                src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
              />
              google
            </div>
          </div>
      </div>
    </div>
  )
}

export default UserUI
