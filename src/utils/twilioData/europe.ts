import { TwilioRate } from "@/types/twilio";

export const europeRates: TwilioRate[] = [
  {
    country: "United Kingdom",
    countryCode: "GB",
    type: "Local",
    inboundVoicePrice: 0.0085,
    outboundVoicePrice: 0.013,
    smsPrice: 0.0079,
    phoneNumberPrice: 1.00
  },
  {
    country: "France",
    countryCode: "FR",
    type: "Local",
    inboundVoicePrice: 0.0085,
    outboundVoicePrice: 0.023,
    smsPrice: 0.089,
    phoneNumberPrice: 1.00
  },
  {
    country: "Germany",
    countryCode: "DE",
    type: "Local",
    inboundVoicePrice: 0.0085,
    outboundVoicePrice: 0.023,
    smsPrice: 0.089,
    phoneNumberPrice: 1.00
  }
  // ... Add other European countries with their respective rates
];