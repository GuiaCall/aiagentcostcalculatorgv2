import { TwilioRate } from "@/types/twilio";

export const europeanRates: TwilioRate[] = [
  {
    country: "United Kingdom",
    countryCode: "GB",
    type: "Local",
    phoneNumberPrice: 1.15,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.0075
  },
  {
    country: "Germany",
    countryCode: "DE",
    type: "Local",
    phoneNumberPrice: 1.15,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "France",
    countryCode: "FR",
    type: "Local",
    phoneNumberPrice: 1.6,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "Italy",
    countryCode: "IT",
    type: "Mobile",
    phoneNumberPrice: 30,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "Spain",
    countryCode: "ES",
    type: "Local",
    phoneNumberPrice: 1.5,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "Netherlands",
    countryCode: "NL",
    type: "Mobile",
    phoneNumberPrice: 6,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  }
];
