import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';

// Single-language scaffolding: `lng` fixed rather than detected. To add a
// language: drop a new file in `locales/`, register it in `resources` below,
// then replace the fixed `lng` with device-locale detection
// (`expo-localization`) and/or a persisted user preference.
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
