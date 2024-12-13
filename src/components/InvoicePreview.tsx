import { AgencyInfo, ClientInfo } from "@/types/invoice";

interface InvoicePreviewProps {
  agencyInfo: AgencyInfo;
  clientInfo: ClientInfo;
  totalMinutes: number;
  totalCost: number | null;
  setupCost: number | null;
  taxRate: number;
  themeColor: string;
  onColorChange: (color: string) => void;
  showColorPicker?: boolean;
  currency: 'USD' | 'EUR';
}

export function InvoicePreview({
  agencyInfo,
  clientInfo,
  totalMinutes,
  totalCost,
  setupCost,
  taxRate,
  themeColor,
  onColorChange,
  showColorPicker = false,
  currency,
}: InvoicePreviewProps) {
  const currencySymbol = currency === 'EUR' ? '€' : '$';
  const costPerMinute = totalCost && totalMinutes ? totalCost / totalMinutes : 0;
  
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Invoice Preview</h2>
        {showColorPicker && (
          <input
            type="color"
            value={themeColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-10 h-10 border-0 rounded"
          />
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Agency Information</h3>
        <p>{agencyInfo.name}</p>
        <p>{agencyInfo.phone}</p>
        <p>{agencyInfo.address}</p>
        <p>{agencyInfo.email}</p>
        <p>{agencyInfo.website}</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Client Information</h3>
        <p>{clientInfo.name}</p>
        <p>{clientInfo.address}</p>
        <p>TVA Number: {clientInfo.tvaNumber}</p>
        <p>Contact Person: {clientInfo.contactPerson.name} ({clientInfo.contactPerson.phone})</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Cost Breakdown</h3>
        <div className="grid grid-cols-2 gap-2">
          <span>Setup Cost:</span>
          <span className="text-right">{currencySymbol}{setupCost?.toFixed(2) || '0.00'}</span>
          <span>Monthly Service Cost:</span>
          <span className="text-right">{currencySymbol}{totalCost?.toFixed(2) || '0.00'}</span>
          <span>Cost per Minute:</span>
          <span className="text-right">{currencySymbol}{costPerMinute.toFixed(4)}</span>
          <span>Tax ({taxRate}%):</span>
          <span className="text-right">
            {currencySymbol}{((totalCost || 0) * (taxRate / 100)).toFixed(2)}
          </span>
          <span className="font-semibold">Total:</span>
          <span className="text-right font-semibold">
            {currencySymbol}{((totalCost || 0) * (1 + taxRate / 100) + (setupCost || 0)).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}