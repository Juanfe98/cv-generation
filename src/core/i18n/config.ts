import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { I18N_STORAGE_KEY, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './constants'

// English translations
import enCommon from './locales/en/common.json'
import enLanding from './locales/en/landing.json'
import enEditor from './locales/en/editor.json'
import enValidation from './locales/en/validation.json'
import enWizard from './locales/en/wizard.json'

// Spanish translations
import esCommon from './locales/es/common.json'
import esLanding from './locales/es/landing.json'
import esEditor from './locales/es/editor.json'
import esValidation from './locales/es/validation.json'
import esWizard from './locales/es/wizard.json'

export const resources = {
  en: {
    common: enCommon,
    landing: enLanding,
    editor: enEditor,
    validation: enValidation,
    wizard: enWizard,
  },
  es: {
    common: esCommon,
    landing: esLanding,
    editor: esEditor,
    validation: esValidation,
    wizard: esWizard,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: 'common',
    ns: ['common', 'landing', 'editor', 'validation', 'wizard'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: I18N_STORAGE_KEY,
      caches: ['localStorage'],
    },
  })

export default i18n
