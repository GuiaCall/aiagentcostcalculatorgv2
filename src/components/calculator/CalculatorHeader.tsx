import { AgencyClientInfo } from "../AgencyClientInfo";
import { AgencyInfo, ClientInfo } from "@/types/invoice";

interface CalculatorHeaderProps {
  agencyInfo: AgencyInfo;
  clientInfo: ClientInfo;
  onAgencyInfoChange: (info: AgencyInfo) => void;
  onClientInfoChange: (info: ClientInfo) => void;
}

export function CalculatorHeader({
  agencyInfo,
  clientInfo,
  onAgencyInfoChange,
  onClientInfoChange,
}: CalculatorHeaderProps) {
  return (
    <AgencyClientInfo
      agencyInfo={agencyInfo}
      clientInfo={clientInfo}
      onAgencyInfoChange={onAgencyInfoChange}
      onClientInfoChange={onClientInfoChange}
    />
  );
}