import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

// resoruces
import translateEnglish from './translations/en/translation.json'
import translateEspanish from './translations/es/translation.json'

const resources = {
  es: {
    translation: translateEspanish
  },
  en: {
    translation: translateEnglish
  }
}

void i18next
  .use(initReactI18next).init({
    resources,
    lng: 'en'
  })

export default i18next
