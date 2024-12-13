import { InvoicePreview } from "../InvoicePreview";
import { AgencyInfo, ClientInfo } from "@/types/invoice";

interface CalculatorPreviewProps {
  showPreview: boolean;
  agencyInfo: AgencyInfo;
  clientInfo: ClientInfo;
  totalMinutes: number;
  totalCost: number | null;
  setupCost: number | null;
  taxRate: number;
  themeColor: string;
  currency: 'USD' | 'EUR';
}

export function CalculatorPreview({
  showPreview,
  agencyInfo,
  clientInfo,
  totalMinutes,
  totalCost,
  setupCost,
  taxRate,
  themeColor,
  currency,
}: CalculatorPreviewProps) {
  if (!showPreview || !totalCost) return null;

  return (
    <div id="invoice-preview">
      <InvoicePreview
        agencyInfo={agencyInfo}
        clientInfo={clientInfo}
        totalMinutes={totalMinutes}
        totalCost={totalCost}
        setupCost={setupCost}
        taxRate={taxRate}
        themeColor={themeColor}
        showColorPicker={true}
        onColorChange={() => {}}
        currency={currency}
      />
    </div>
  );
}