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

  // Additional African Countries
  {
    country: "Nigeria",
    countryCode: "NG",
    type: "Local",
    phoneNumberPrice: 3.5,
    inboundVoicePrice: 0.012,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0085
  },
  {
    country: "Kenya",
    countryCode: "KE",
    type: "Local",
    phoneNumberPrice: 3.0,
    inboundVoicePrice: 0.011,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.008
  },
  {
    country: "Ghana",
    countryCode: "GH",
    type: "Local",
    phoneNumberPrice: 2.75,
    inboundVoicePrice: 0.011,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.0078
  },
  {
    country: "Egypt",
    countryCode: "EG",
    type: "Local",
    phoneNumberPrice: 4.0,
    inboundVoicePrice: 0.013,
    inboundTrunkingPrice: 0.008,
    inboundSmsPrice: 0.009
  },
  {
    country: "Morocco",
    countryCode: "MA",
    type: "Local",
    phoneNumberPrice: 3.75,
    inboundVoicePrice: 0.012,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0085
  },
  {
    country: "Tanzania",
    countryCode: "TZ",
    type: "Local",
    phoneNumberPrice: 2.5,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.0075
  },
  {
    country: "Uganda",
    countryCode: "UG",
    type: "Local",
    phoneNumberPrice: 2.75,
    inboundVoicePrice: 0.011,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.008
  },
  {
    country: "Ethiopia",
    countryCode: "ET",
    type: "Local",
    phoneNumberPrice: 3.25,
    inboundVoicePrice: 0.012,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0085
  },
  {
    country: "Côte d'Ivoire",
    countryCode: "CI",
    type: "Local",
    phoneNumberPrice: 3.0,
    inboundVoicePrice: 0.011,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.008
  },
  {
    country: "Senegal",
    countryCode: "SN",
    type: "Local",
    phoneNumberPrice: 2.75,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.0075
  }
];
