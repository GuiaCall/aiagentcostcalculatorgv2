import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "title": "AI Voice Agent Calculator",
          "technologyParameters": "Technology Parameters",
          "pleaseAddValue": "Please add a value",
          "perMinute": "/minute",
          // Add more translations as needed
        }
      },
      fr: {
        translation: {
          "title": "Calculateur d'Agent Vocal IA",
          "technologyParameters": "Paramètres Technologiques",
          "pleaseAddValue": "Veuillez ajouter une valeur",
          "perMinute": "/minute",
          // Add more translations as needed
        }
      },
      de: {
        translation: {
          "title": "KI-Sprachagent Rechner",
          "technologyParameters": "Technologie-Parameter",
          "pleaseAddValue": "Bitte Wert hinzufügen",
          "perMinute": "/minute",
          // Add more translations as needed
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;