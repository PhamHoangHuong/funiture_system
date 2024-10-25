import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './translations/en.json';
import viTranslations from './translations/vi.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    lng: 'vi',
    debug: true,
    resources: {
      en: { translation: enTranslations },
      vi: { translation: viTranslations },
    },
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;