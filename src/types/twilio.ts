export interface TwilioRate {
  country: string;
  countryCode: string;
  type: string;
  phoneNumberPrice: number;
  inboundVoicePrice: number;
  inboundTrunkingPrice: number;
  inboundSmsPrice?: number;
  inboundMmsPrice?: number;
  inboundVoiceLandlinePrice?: number;
  inboundVoiceMobilePrice?: number;
  inboundTrunkingLandlinePrice?: number;
  inboundTrunkingMobilePrice?: number;
}

export interface TwilioSelection {
  country: string;
  type: string;
  phoneNumberPrice: number;
  inboundVoicePrice: number;
  inboundSmsPrice?: number;
}