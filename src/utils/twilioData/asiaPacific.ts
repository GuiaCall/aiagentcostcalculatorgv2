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
    country: "Australia",
    countryCode: "AU",
    type: "Mobile",
    phoneNumberPrice: 6.5,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.0075
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
    country: "Japan",
    countryCode: "JP",
    type: "Mobile",
    phoneNumberPrice: 12,
    inboundVoicePrice: 0.015,
    inboundTrunkingPrice: 0.008,
    inboundSmsPrice: 0.0085
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
    country: "Singapore",
    countryCode: "SG",
    type: "Mobile",
    phoneNumberPrice: 8,
    inboundVoicePrice: 0.012,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0082
  },
  {
    country: "Hong Kong",
    countryCode: "HK",
    type: "National",
    phoneNumberPrice: 6,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006
  },
  {
    country: "Hong Kong",
    countryCode: "HK",
    type: "Mobile",
    phoneNumberPrice: 15,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.04
  },
  {
    country: "South Korea",
    countryCode: "KR",
    type: "National",
    phoneNumberPrice: 5,
    inboundVoicePrice: 0.012,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0078
  },
  {
    country: "India",
    countryCode: "IN",
    type: "National",
    phoneNumberPrice: 3.5,
    inboundVoicePrice: 0.0095,
    inboundTrunkingPrice: 0.005,
    inboundSmsPrice: 0.0065
  },
  {
    country: "Malaysia",
    countryCode: "MY",
    type: "National",
    phoneNumberPrice: 4.25,
    inboundVoicePrice: 0.011,
    inboundTrunkingPrice: 0.0065,
    inboundSmsPrice: 0.0072
  }
];