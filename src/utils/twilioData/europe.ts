import { TwilioRate } from "@/types/twilio";

export const europeanRates: TwilioRate[] = [
  {
    country: "United Kingdom",
    countryCode: "GB",
    type: "Local",
    inboundVoicePrice: 0.0085,
    inboundTrunkingPrice: 0.0055
  },
  {
    country: "United Kingdom",
    countryCode: "GB",
    type: "Mobile",
    inboundVoicePrice: 0.0095,
    inboundTrunkingPrice: 0.0065
  },
  {
    country: "France",
    countryCode: "FR",
    type: "Local",
    inboundVoicePrice: 0.0075,
    inboundTrunkingPrice: 0.0045
  },
  {
    country: "Germany",
    countryCode: "DE",
    type: "Local",
    inboundVoicePrice: 0.0075,
    inboundTrunkingPrice: 0.0045
  },
  {
    country: "Spain",
    countryCode: "ES",
    type: "Local",
    inboundVoicePrice: 0.0085,
    inboundTrunkingPrice: 0.0055
  },
  {
    country: "Italy",
    countryCode: "IT",
    type: "Local",
    inboundVoicePrice: 0.0085,
    inboundTrunkingPrice: 0.0055
  }
];