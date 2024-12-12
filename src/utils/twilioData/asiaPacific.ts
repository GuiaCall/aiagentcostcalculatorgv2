import { TwilioRate } from "@/types/twilio";

export const asiaPacificRates: TwilioRate[] = [
  {
    country: "Australia",
    countryCode: "AU",
    type: "Local",
    inboundVoicePrice: 0.0075,
    inboundTrunkingPrice: 0.0045
  },
  {
    country: "Japan",
    countryCode: "JP",
    type: "Local",
    inboundVoicePrice: 0.0085,
    inboundTrunkingPrice: 0.0055
  },
  {
    country: "Singapore",
    countryCode: "SG",
    type: "Local",
    inboundVoicePrice: 0.0075,
    inboundTrunkingPrice: 0.0045
  },
  {
    country: "Hong Kong",
    countryCode: "HK",
    type: "Local",
    inboundVoicePrice: 0.0085,
    inboundTrunkingPrice: 0.0055
  }
];