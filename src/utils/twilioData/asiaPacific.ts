import { TwilioRate } from "@/types/twilio";

export const asiaPacificRates: TwilioRate[] = [
  {
    country: "Australia",
    countryCode: "AU",
    type: "Local",
    phoneNumberPrice: 3,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "Japan",
    countryCode: "JP",
    type: "National",
    phoneNumberPrice: 4.5,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "Singapore",
    countryCode: "SG",
    type: "Local",
    phoneNumberPrice: 4,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "Hong Kong",
    countryCode: "HK",
    type: "National",
    phoneNumberPrice: 6,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  }
];
