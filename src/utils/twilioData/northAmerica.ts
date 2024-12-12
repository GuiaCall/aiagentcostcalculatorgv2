import { TwilioRate } from "@/types/twilio";

export const northAmericanRates: TwilioRate[] = [
  {
    country: "United States",
    countryCode: "US",
    type: "Local",
    phoneNumberPrice: 1.15,
    inboundVoicePrice: 0.0085,
    inboundTrunkingPrice: 0.0034,
    inboundSmsPrice: 0.0079
  },
  {
    country: "United States",
    countryCode: "US",
    type: "Toll Free",
    phoneNumberPrice: 2.15,
    inboundVoicePrice: 0.022,
    inboundTrunkingPrice: 0.013,
    inboundSmsPrice: 0.0079
  },
  {
    country: "Canada",
    countryCode: "CA",
    type: "Local",
    phoneNumberPrice: 1.15,
    inboundVoicePrice: 0.0085,
    inboundTrunkingPrice: 0.0045,
    inboundSmsPrice: 0.0079
  },
  {
    country: "Canada",
    countryCode: "CA",
    type: "Toll Free",
    phoneNumberPrice: 2.15,
    inboundVoicePrice: 0.022,
    inboundTrunkingPrice: 0.013,
    inboundSmsPrice: 0.0079
  },
  {
    country: "Puerto Rico",
    countryCode: "PR",
    type: "Local",
    phoneNumberPrice: 3.25,
    inboundVoicePrice: 0.01,
    inboundTrunkingPrice: 0.006,
    inboundSmsPrice: 0.0075
  },
  {
    country: "Virgin Islands, U.S.",
    countryCode: "VI",
    type: "Local",
    phoneNumberPrice: 1.15,
    inboundVoicePrice: 0.0085,
    inboundTrunkingPrice: 0.0034,
    inboundSmsPrice: 0.0079
  }
];