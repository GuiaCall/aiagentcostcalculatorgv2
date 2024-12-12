export interface TwilioRate {
  country: string;
  countryCode: string;
  type: 'Local' | 'Mobile' | 'Toll Free' | 'National';
  inboundVoicePrice: number;
  outboundVoicePrice: number;
  smsPrice: number;
  phoneNumberPrice: number;
}

export interface TwilioSelection {
  country: string;
  type: string;
  inboundVoicePrice: number;
  outboundVoicePrice: number;
  smsPrice: number;
  phoneNumberPrice: number;
}