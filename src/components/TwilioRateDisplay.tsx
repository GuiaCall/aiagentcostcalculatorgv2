import { TwilioSelection } from "@/types/twilio";

interface TwilioRateDisplayProps {
  selection: TwilioSelection | null;
}

export function TwilioRateDisplay({ selection }: TwilioRateDisplayProps) {
  if (!selection) return null;

  const totalCostPerMinute = selection.inboundVoicePrice + (selection.inboundSmsPrice || 0);

  return (
    <div className="mt-2 space-y-1 bg-white dark:bg-white rounded-lg p-4 shadow-sm">
      <p className="text-primary dark:text-primary font-medium">Selected rates for {selection.country} ({selection.type}):</p>
      <ul className="list-disc pl-5 text-primary dark:text-primary">
        <li>Phone Number Cost: ${selection.phoneNumberPrice.toFixed(2)}/month</li>
        <li>Inbound Voice: ${selection.inboundVoicePrice.toFixed(4)}/minute</li>
        {selection.inboundSmsPrice && (
          <li>Inbound SMS: ${selection.inboundSmsPrice.toFixed(4)}/message</li>
        )}
        <li className="font-semibold flex items-center gap-2">
          Total Cost per Minute: ${totalCostPerMinute.toFixed(4)}
          <span className="text-xs text-primary dark:text-primary">
            (Copy and paste this value in the Technology Parameter for calculation)
          </span>
        </li>
      </ul>
    </div>
  );
}