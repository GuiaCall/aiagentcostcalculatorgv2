import { TwilioRate } from "@/types/twilio";
import { northAmericanRates } from "./twilioData/northAmerica";
import { europeanRates } from "./twilioData/europe";
import { asiaPacificRates } from "./twilioData/asiaPacific";
import { otherRates } from "./twilioData/other";

// Combine all regional rates
export const twilioRates: TwilioRate[] = [
  ...northAmericanRates,
  ...europeanRates,
  ...asiaPacificRates,
  ...otherRates
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