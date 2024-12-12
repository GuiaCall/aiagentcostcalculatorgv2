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
    country: "Brazil",
    countryCode: "BR",
    type: "Local",
    phoneNumberPrice: 4.25,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
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
  }
];