import { TwilioSelection } from "@/types/twilio";

interface TwilioRateDisplayProps {
  selection: TwilioSelection | null;
}

export function TwilioRateDisplay({ selection }: TwilioRateDisplayProps) {
  if (!selection) return null;

  const totalCostPerMinute = selection.inboundVoicePrice + (selection.inboundSmsPrice || 0);

  return (
    <div className="mt-2 space-y-1 text-sm text-gray-600">
      <p>Selected rates for {selection.country} ({selection.type}):</p>
      <ul className="list-disc pl-5">
        <li>Phone Number Cost: ${selection.phoneNumberPrice.toFixed(2)}/month</li>
        <li>Inbound Voice: ${selection.inboundVoicePrice.toFixed(4)}/minute</li>
        {selection.inboundSmsPrice && (
          <li>Inbound SMS: ${selection.inboundSmsPrice.toFixed(4)}/message</li>
        )}
        <li className="font-semibold">Total Cost per Minute: ${totalCostPerMinute.toFixed(4)}</li>
      </ul>
    </div>
  );
}