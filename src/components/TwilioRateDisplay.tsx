interface TwilioRateDisplayProps {
  selection: {
    country: string;
    type: string;
    phoneNumberPrice: number;
    inboundVoicePrice: number;
    inboundSmsPrice?: number;
  } | null;
}

export function TwilioRateDisplay({ selection }: TwilioRateDisplayProps) {
  if (!selection) return null;
  
  const totalCostPerMinute = selection.inboundVoicePrice + (selection.inboundSmsPrice || 0);

  return (
    <div className="mt-2 space-y-1 bg-white text-gray-900 rounded-lg p-4 shadow-sm border border-border">
      <p className="font-medium">Selected rates for {selection.country} ({selection.type}):</p>
      <ul className="list-disc pl-5">
        <li>Phone Number Cost: ${selection.phoneNumberPrice.toFixed(2)}/month</li>
        <li>Inbound Voice: ${selection.inboundVoicePrice.toFixed(4)}/minute</li>
        {selection.inboundSmsPrice && (
          <li>Inbound SMS: ${selection.inboundSmsPrice.toFixed(4)}/message</li>
        )}
        <li className="font-semibold flex items-center gap-2">
          Total Cost per Minute: ${totalCostPerMinute.toFixed(4)}
          <span className="text-xs">
            (Copy and paste this value in the Technology Parameter for calculation)
          </span>
        </li>
      </ul>
    </div>
  );
}