import React from 'react'
import { useNavigate } from 'react-router-dom'
import { pngTitulo } from '../../contexts/images.context'
import { useTranslation } from 'react-i18next'
import Politicas from '../../components/Terms/Politicas'
import Condiciones from '../../components/Terms/Condiciones'
import { Button } from '@mui/material'
import LanguageButton from '../../components/LanguageButton.component'

const PoliticasHomePage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div>
      <div className="flex items-center justify-between bg-main-blue py-5" >
          <img src={pngTitulo} onClick={() => {
            navigate('/')
          }} className=" ml-7 max-w-56" alt="logo" />
          <div className='mr-12 mt-2' >
            <Button onClick={() => {
              navigate('/')
            }} className="!bg-main-yellow !p-3 !rounded-3xl !font-bold !text-main-brown uppercase" >{t('subscribe.button-init')}</Button>
          </div>
      </div>
      <div className='px-12 py-5 bg-gray-900' >
        <div className='flex mb-5' >
          <LanguageButton/>
        </div>
        <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
          <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
            {t('terms.politics.name')}
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            <Politicas/>
          </div>
        </details>

        <details className=" mt-5 open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
          <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
          {t('terms.conditions.name')}
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            <Condiciones/>
          </div>
        </details>
      </div>
    </div>
  )
}

export default PoliticasHomePage
