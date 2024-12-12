import { TwilioRate } from "@/types/twilio";

export const northAmericanRates: TwilioRate[] = [
  {
    country: "United States",
    countryCode: "US",
    type: "Local",
    inboundVoicePrice: 0.0045,
    inboundTrunkingPrice: 0.0025
  },
  {
    country: "United States",
    countryCode: "US",
    type: "Toll Free",
    inboundVoicePrice: 0.0065,
    inboundTrunkingPrice: 0.0035
  },
  {
    country: "Canada",
    countryCode: "CA",
    type: "Local",
    inboundVoicePrice: 0.0045,
    inboundTrunkingPrice: 0.0025
  },
  {
    country: "Mexico",
    countryCode: "MX",
    type: "Local",
    inboundVoicePrice: 0.0095,
    inboundTrunkingPrice: 0.0065
  }
];