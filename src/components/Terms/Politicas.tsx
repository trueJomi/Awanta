import React from 'react'
import { useTranslation } from 'react-i18next'

const Politicas: React.FC = () => {
  const { t } = useTranslation()

  return (
        <div>
          {t('terms.politics.text-title')}
          <h3 className="subtitles" >
          <p>{t('terms.politics.text-title1')}</p>
          </h3>
          <p>{t('terms.politics.text-body1')}</p>
          <h3 className="subtitles" >{t('terms.politics.text-title2')}</h3>
          <p>{t('terms.politics.text-body2')}</p>
          <h3 className="subtitles" >{t('terms.politics.text-title3')}</h3>
          <p>{t('terms.politics.text-body3')}</p>
          <h3 className="subtitles" >{t('terms.politics.text-title4')}</h3>
          <p>{t('terms.politics.text-body4')}</p>
          <h3 className="subtitles" >{t('terms.politics.text-title5')}</h3>
          <p>{t('terms.politics.text-body5')}</p>
          <h3 className="subtitles" >{t('terms.politics.update')}</h3>
        </div>
  )
}

export default Politicas
