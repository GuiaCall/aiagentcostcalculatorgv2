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
    country: "United Kingdom",
    countryCode: "GB",
    type: "Mobile",
    phoneNumberPrice: 8,
    inboundVoicePrice: 0.012,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0085
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
    country: "Germany",
    countryCode: "DE",
    type: "Mobile",
    phoneNumberPrice: 10,
    inboundVoicePrice: 0.015,
    inboundTrunkingPrice: 0.008,
    inboundSmsPrice: 0.0082
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
    country: "France",
    countryCode: "FR",
    type: "Mobile",
    phoneNumberPrice: 9,
    inboundVoicePrice: 0.014,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0079
  },
  {
    country: "Italy",
    countryCode: "IT",
    type: "Mobile",
    phoneNumberPrice: 30,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.02
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
    country: "Spain",
    countryCode: "ES",
    type: "Mobile",
    phoneNumberPrice: 8.5,
    inboundVoicePrice: 0.013,
    inboundTrunkingPrice: 0.007,
    inboundSmsPrice: 0.0078
  },
  {
    country: "Netherlands",
    countryCode: "NL",
    type: "Mobile",
    phoneNumberPrice: 6,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.0075
  },
  {
    country: "Belgium",
    countryCode: "BE",
    type: "Local",
    phoneNumberPrice: 2.5,
    inboundVoicePrice: 0.011,
    inboundTrunkingPrice: 0.0065,
    inboundSmsPrice: 0.0077
  },
  {
    country: "Belgium",
    countryCode: "BE",
    type: "Toll Free",
    phoneNumberPrice: 25,
    inboundVoicePrice: 0.3083,
    inboundTrunkingPrice: 0.3043
  },
  {
    country: "Sweden",
    countryCode: "SE",
    type: "Mobile",
    phoneNumberPrice: 3,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.0075
  },
  {
    country: "Ireland",
    countryCode: "IE",
    type: "Local",
    phoneNumberPrice: 2,
    inboundVoicePrice: 0.0105,
    inboundTrunkingPrice: 0.0063,
    inboundSmsPrice: 0.0076
  },
  {
    country: "Poland",
    countryCode: "PL",
    type: "Mobile",
    phoneNumberPrice: 4.5,
    inboundVoicePrice: 0.0115,
    inboundTrunkingPrice: 0.0068,
    inboundSmsPrice: 0.0074
  }
];