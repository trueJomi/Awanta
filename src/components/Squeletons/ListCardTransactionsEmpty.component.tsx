import React from 'react'
import { useTranslation } from 'react-i18next'
import { TbMoodEmptyFilled } from 'react-icons/tb'

const ListCardTransactionsEmpty: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className='text-center text-xl font-black uppercase my-48' >
        {t('comon.transaction.empty')}
        <div className='mt-2' >
        <TbMoodEmptyFilled className='mx-auto text-5xl' />
        </div>
    </div>
  )
}

export default ListCardTransactionsEmpty
