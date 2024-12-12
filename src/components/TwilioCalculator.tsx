import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUniqueCountries, getTypesForCountry, getRateForCountryAndType } from "@/utils/twilioData";
import { TwilioSelection } from "@/types/twilio";

interface TwilioCalculatorProps {
  onRateSelect: (selection: TwilioSelection | null) => void;
}

export function TwilioCalculator({ onRateSelect }: TwilioCalculatorProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

  const countries = getUniqueCountries();

  useEffect(() => {
    if (selectedCountry) {
      const types = getTypesForCountry(selectedCountry);
      setAvailableTypes(types);
      setSelectedType("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedType) {
      const rate = getRateForCountryAndType(selectedCountry, selectedType);
      if (rate) {
        onRateSelect({
          country: selectedCountry,
          type: selectedType,
          inboundVoicePrice: rate.inboundVoicePrice,
          outboundVoicePrice: rate.outboundVoicePrice,
          smsPrice: rate.smsPrice,
          phoneNumberPrice: rate.phoneNumberPrice
        });
      }
    } else {
      onRateSelect(null);
    }
  }, [selectedCountry, selectedType, onRateSelect]);

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Twilio Configuration</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Country</Label>
          <Select
            value={selectedCountry}
            onValueChange={setSelectedCountry}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Number Type</Label>
          <Select
            value={selectedType}
            onValueChange={setSelectedType}
            disabled={!selectedCountry}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a number type" />
            </SelectTrigger>
            <SelectContent>
              {availableTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCountry && selectedType && (
          <div className="space-y-2 text-sm text-gray-600">
            <p>Phone Number Cost: ${getRateForCountryAndType(selectedCountry, selectedType)?.phoneNumberPrice.toFixed(2)}/month</p>
            <p>Inbound Voice: ${getRateForCountryAndType(selectedCountry, selectedType)?.inboundVoicePrice.toFixed(4)}/minute</p>
            <p>Outbound Voice: ${getRateForCountryAndType(selectedCountry, selectedType)?.outboundVoicePrice.toFixed(4)}/minute</p>
            <p>SMS: ${getRateForCountryAndType(selectedCountry, selectedType)?.smsPrice.toFixed(4)}/message</p>
          </div>
        )}
      </div>
    </Card>
  );
}