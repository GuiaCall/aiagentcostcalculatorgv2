export interface TwilioRate {
  country: string;
  countryCode: string;
  type: 'Local' | 'Mobile' | 'Toll Free' | 'National';
  inboundVoicePrice: number;
  inboundTrunkingPrice: number;
}

export interface TwilioSelection {
  country: string;
  type: string;
  price: number;
}