import React from 'react'
import { useTranslation } from 'react-i18next'
import { TbMoodEmptyFilled } from 'react-icons/tb'
import { adaptativeColorText } from '../../../utilities/color.utilities'

const EmptyCategory: React.FC<{ color: string }> = ({ color }) => {
  const { t } = useTranslation()
  return (
      <div
        style={{
          color: adaptativeColorText(color)
        }}
       className='text-center text-xl font-black uppercase my-12' >
          {t('comon.transaction.empty')}
          <div className='mt-2' >
          <TbMoodEmptyFilled className='mx-auto text-5xl' />
          </div>
      </div>
  )
}

export default EmptyCategory
