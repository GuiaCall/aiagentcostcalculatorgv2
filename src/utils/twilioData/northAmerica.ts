import { TwilioRate } from "@/types/twilio";

export const northAmericaRates: TwilioRate[] = [
  {
    country: "United States",
    countryCode: "US",
    type: "Local",
    inboundVoicePrice: 0.0085,
    outboundVoicePrice: 0.013,
    smsPrice: 0.0079,
    phoneNumberPrice: 1.00
  },
  {
    country: "United States",
    countryCode: "US",
    type: "Toll Free",
    inboundVoicePrice: 0.022,
    outboundVoicePrice: 0.013,
    smsPrice: 0.0079,
    phoneNumberPrice: 2.00
  },
  {
    country: "Canada",
    countryCode: "CA",
    type: "Local",
    inboundVoicePrice: 0.0085,
    outboundVoicePrice: 0.013,
    smsPrice: 0.0079,
    phoneNumberPrice: 1.00
  }
];