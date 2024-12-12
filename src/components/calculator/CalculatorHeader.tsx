import { AgencyClientInfo } from "../AgencyClientInfo";
import { ColorPicker } from "../ColorPicker";
import { AgencyInfo, ClientInfo } from "@/types/invoice";

interface CalculatorHeaderProps {
  agencyInfo: AgencyInfo;
  clientInfo: ClientInfo;
  themeColor: string;
  onAgencyInfoChange: (info: AgencyInfo) => void;
  onClientInfoChange: (info: ClientInfo) => void;
  onColorChange: (color: string) => void;
}

export function CalculatorHeader({
  agencyInfo,
  clientInfo,
  themeColor,
  onAgencyInfoChange,
  onClientInfoChange,
  onColorChange,
}: CalculatorHeaderProps) {
  return (
    <>
      <AgencyClientInfo
        agencyInfo={agencyInfo}
        clientInfo={clientInfo}
        onAgencyInfoChange={onAgencyInfoChange}
        onClientInfoChange={onClientInfoChange}
      />
      <ColorPicker value={themeColor} onChange={onColorChange} />
    </>
  );
}