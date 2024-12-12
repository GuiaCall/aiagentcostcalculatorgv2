import { TwilioRate } from "@/types/twilio";

export const otherRates: TwilioRate[] = [
  {
    country: "Argentina",
    countryCode: "AR",
    type: "Local",
    phoneNumberPrice: 8,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "Argentina",
    countryCode: "AR",
    type: "Mobile",
    phoneNumberPrice: 12,
    inboundVoicePrice: 0.012,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0085
  },
  {
    country: "Brazil",
    countryCode: "BR",
    type: "Local",
    phoneNumberPrice: 4.25,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "Brazil",
    countryCode: "BR",
    type: "Mobile",
    phoneNumberPrice: 7,
    inboundVoicePrice: 0.013,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0082
  },
  {
    country: "Mexico",
    countryCode: "MX",
    type: "Local",
    phoneNumberPrice: 6.25,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.02
  },
  {
    country: "Mexico",
    countryCode: "MX",
    type: "Mobile",
    phoneNumberPrice: 9,
    inboundVoicePrice: 0.012,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.025
  },
  {
    country: "South Africa",
    countryCode: "ZA",
    type: "Local",
    phoneNumberPrice: 1.5,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "South Africa",
    countryCode: "ZA",
    type: "Mobile",
    phoneNumberPrice: 4,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.0075
  },
  {
    country: "Israel",
    countryCode: "IL",
    type: "Local",
    phoneNumberPrice: 3.5,
    inboundVoicePrice: 0.011,
    inboundTrunkingPrice: 0.0065,
    inboundSmsPrice: 0.0077
  },
  {
    country: "United Arab Emirates",
    countryCode: "AE",
    type: "Local",
    phoneNumberPrice: 5,
    inboundVoicePrice: 0.012,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0085
  }
];