import { TwilioRate } from "@/types/twilio";
import { northAmericaRates } from "./northAmerica";
import { europeRates } from "./europe";

const allRates: TwilioRate[] = [
  ...northAmericaRates,
  ...europeRates,
];

export const getUniqueCountries = (): string[] => {
  const countries = new Set(allRates.map(rate => rate.country));
  return Array.from(countries).sort();
};

export const getTypesForCountry = (country: string): string[] => {
  const types = new Set(
    allRates
      .filter(rate => rate.country === country)
      .map(rate => rate.type)
  );
  return Array.from(types).sort();
};

export const getRateForCountryAndType = (
  country: string,
  type: string
): TwilioRate | undefined => {
  return allRates.find(
    rate => rate.country === country && rate.type === type
  );
};