import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { enCommon, viCommon } from '../locales';
import { I18nResources } from '../types/entity';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<I18nResources>({
    resources: {
      en: {
        common: enCommon,
      },
      vi: {
        common: viCommon,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: true,
    defaultNS: 'common', // Set default namespace for common translations'
  });

export default i18n;
