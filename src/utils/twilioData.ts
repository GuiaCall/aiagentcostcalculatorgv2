import { TwilioRate } from "@/types/twilio";

// Données extraites et nettoyées du CSV
export const twilioRates: TwilioRate[] = [
  {
    country: "Argentina",
    countryCode: "AR",
    type: "Local",
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "Australia",
    countryCode: "AU",
    type: "Local",
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  // ... Ajouter toutes les autres données du CSV ici
];

export const getUniqueCountries = (): string[] => {
  const countries = new Set(twilioRates.map(rate => rate.country));
  return Array.from(countries).sort();
};

export const getTypesForCountry = (country: string): string[] => {
  const types = new Set(
    twilioRates
      .filter(rate => rate.country === country)
      .map(rate => rate.type)
  );
  return Array.from(types).sort();
};

export const getRateForCountryAndType = (
  country: string,
  type: string
): TwilioRate | undefined => {
  return twilioRates.find(
    rate => rate.country === country && rate.type === type
  );
};