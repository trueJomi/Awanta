import React from 'react'
import { useTranslation } from 'react-i18next'

const Condiciones: React.FC = () => {
  const { t } = useTranslation()
  return (
        <div>
            <h3 className="subtitles" >
            {t('terms.conditions.text-title1')}
            </h3>
            <p>
              {t('terms.conditions.text-body1')}
            </p>
            <h3 className="subtitles" >
            {t('terms.conditions.text-title2')}
            </h3>
            <p>
              {t('terms.conditions.text-body2')}
            </p>
            <h3 className="subtitles" >
            {t('terms.conditions.text-title3')}
            </h3>
            <p>
              {t('terms.conditions.text-body3')}
            </p>
            <h3 className="subtitles" >
            {t('terms.conditions.text-title4')}
            </h3>
            <p>
              {t('terms.conditions.text-body4')}
            </p>
            <h3 className="subtitles" >
            {t('terms.conditions.text-title5')}
            </h3>
            <p>
              {t('terms.conditions.text-body5')}
            </p>
            <h3 className="subtitles" >
            {t('terms.conditions.text-title6')}
            </h3>
            <p>
              {t('terms.conditions.text-body6')}
            </p>
            <h3 className="subtitles" >
            {t('terms.conditions.text-title7')}
            </h3>
            <p>
              {t('terms.conditions.text-body7')}
            </p>
            <h3 className="subtitles" >
            {t('terms.conditions.text-title8')}
            </h3>
            <p>
              {t('terms.conditions.text-body8')}
            </p>
            <h3 className="subtitles" >
            {t('terms.conditions.text-title9')}
            </h3>
            <p className="mb-3">
              {t('terms.conditions.text-body9')}
            </p>
            <p>{t('terms.conditions.button')}</p>
            <h3 className="subtitles" >{t('terms.conditions.update')}</h3>
        </div>
  )
}

export default Condiciones
