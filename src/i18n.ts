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
          "calculatorSettings": "Calculator Settings",
          "averageCallDuration": "Average Call Duration (minutes)",
          "totalMinutesPerMonth": "Total Minutes per Month",
          "margin": "Margin (%)",
          "taxRate": "Tax Rate (%)",
          "agencyInformation": "Agency Information",
          "clientInformation": "Client Information",
          "calculate": "Calculate",
          "preview": "Preview",
          "export": "Export PDF",
          "totalCost": "Total Cost",
          "setupCost": "Setup Cost"
        }
      },
      fr: {
        translation: {
          "title": "Calculateur d'Agent Vocal IA",
          "technologyParameters": "Paramètres Technologiques",
          "pleaseAddValue": "Veuillez ajouter une valeur",
          "perMinute": "/minute",
          "calculatorSettings": "Paramètres du Calculateur",
          "averageCallDuration": "Durée Moyenne d'Appel (minutes)",
          "totalMinutesPerMonth": "Minutes Totales par Mois",
          "margin": "Marge (%)",
          "taxRate": "Taux de Taxe (%)",
          "agencyInformation": "Informations de l'Agence",
          "clientInformation": "Informations du Client",
          "calculate": "Calculer",
          "preview": "Aperçu",
          "export": "Exporter PDF",
          "totalCost": "Coût Total",
          "setupCost": "Coût d'Installation"
        }
      },
      de: {
        translation: {
          "title": "KI-Sprachagent Rechner",
          "technologyParameters": "Technologie-Parameter",
          "pleaseAddValue": "Bitte Wert hinzufügen",
          "perMinute": "/minute",
          "calculatorSettings": "Rechner-Einstellungen",
          "averageCallDuration": "Durchschnittliche Anrufdauer (Minuten)",
          "totalMinutesPerMonth": "Gesamtminuten pro Monat",
          "margin": "Marge (%)",
          "taxRate": "Steuersatz (%)",
          "agencyInformation": "Agenturinformationen",
          "clientInformation": "Kundeninformationen",
          "calculate": "Berechnen",
          "preview": "Vorschau",
          "export": "PDF Exportieren",
          "totalCost": "Gesamtkosten",
          "setupCost": "Einrichtungskosten"
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
    }
  });

export default i18n;