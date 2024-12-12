import { TwilioRate } from "@/types/twilio";
import { northAmericanRates } from "./twilioData/northAmerica";

// Combine all regional rates
export const twilioRates: TwilioRate[] = [
  ...northAmericanRates,
  // Add other regional rates as needed
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