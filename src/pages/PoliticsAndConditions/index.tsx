import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/Auth.hook'
import { UserService } from '../../services/User.service'
import { useTranslation } from 'react-i18next'
import Condiciones from '../../components/Terms/Condiciones'
import Politicas from '../../components/Terms/Politicas'
import { Button, Checkbox, FormControlLabel } from '@mui/material'

const UserSerivice = new UserService()

const PoliticsAndConditionsPage: React.FC = () => {
  const { user, authState } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [acept, setAcept] = React.useState<boolean>(false)

  if (authState === false) {
    return <Navigate to="/auth" />
  }

  const agreePolitics = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (user !== undefined) {
      void UserSerivice.update({
        TermsAndCondition: acept
      }, user.idUser).then(() => {
        navigate('/')
      })
    }
  }

  const aceptTerms = () => {
    setAcept(!acept)
  }

  return (
    <form onSubmit={agreePolitics} className="px-12 mt-10">
        <div className='max-w-2xl mx-auto' >
            <div className="">
                <h1 className="font-extrabold mb-5 text-2xl text-main-blue dark:text-main-yellow" >
                    {t('terms.conditions.name')}
                </h1>
            <div className="rounded-xl overflow-auto h-52 border-2 p-3 dark:bg-gray-900" >
                <Condiciones/>
            </div>
            <h1 className="font-extrabold my-5 text-2xl text-main-blue dark:text-main-yellow">
                {t('terms.politics.name')}
            </h1>
            <div className=" rounded-xl  overflow-auto h-52 border-2 p-3 dark:bg-gray-900 " >
                <Politicas/>
            </div>
            </div>
            <div className="text-main-blue my-3" >
                <FormControlLabel control={<Checkbox value={acept} onChange={aceptTerms} />} label={t('terms.read')} />
                {/* <input type="checkbox" checked={acept} onChange={aceptTerms} className="rounded-full w-4 h-4 text-main-blue bg-whiteBase focus:text-main-blue focus:ring-2  focus:ring-whiteBase" />
                <label className='ml-2 font-bold' >{t('terms.read')}</label> */}
                <div className='mt-4' >
                    <Button className="text-xl !bg-main-yellow p-6 mt-5 py-1 !rounded-lg !font-bold disabled:!bg-gray-200 disabled:!opacity-40 !text-main-brown" type='submit' disabled={!acept} >acepto los terminos </Button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default PoliticsAndConditionsPage
