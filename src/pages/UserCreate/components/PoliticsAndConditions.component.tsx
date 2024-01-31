import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Checkbox, FormControlLabel } from '@mui/material'
import { useAuth } from '../../../hooks/Auth.hook'
import { UserService } from '../../../services/User.service'
import Condiciones from '../../../components/Terms/Condiciones'
import Politicas from '../../../components/Terms/Politicas'

const UserSerivice = new UserService()

const PoliticsAndConditions: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [acept, setAcept] = React.useState<boolean>(false)

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
                <div className='mt-4' >
                    <Button className="text-xl !bg-main-yellow p-6 mt-5 py-1 !rounded-lg !font-bold disabled:!bg-gray-200 disabled:!opacity-40 !text-main-brown" type='submit' disabled={!acept} >acepto los terminos </Button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default PoliticsAndConditions
