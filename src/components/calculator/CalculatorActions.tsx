import { Button } from "../ui/button";
import { CalculatorIcon, Download, Eye } from "lucide-react";

interface CalculatorActionsProps {
  onCalculate: () => void;
  onPreviewToggle: () => void;
  onExportPDF: () => void;
  totalCost: number | null;
  setupCost: number | null;
  currency: 'USD' | 'EUR';
  totalMinutes: number;
  isEditing?: boolean;
}

export function CalculatorActions({
  onCalculate,
  onPreviewToggle,
  onExportPDF,
  totalCost,
  setupCost,
  currency,
  totalMinutes,
  isEditing = false,
}: CalculatorActionsProps) {
  const currencySymbol = currency === 'EUR' ? '€' : '$';
  
  return (
    <div className="space-y-4">
      <Button onClick={onCalculate} className="w-full bg-primary">
        <CalculatorIcon className="mr-2 h-4 w-4" />
        {isEditing ? 'Recalculate' : 'Calculate'}
      </Button>
      
      {totalCost !== null && setupCost !== null && (
        <div className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg space-y-2">
            <p className="text-sm font-medium">
              Monthly Cost: {currencySymbol} {totalCost.toFixed(2)}
            </p>
            <p className="text-sm font-medium">
              Setup Cost: {currencySymbol} {setupCost.toFixed(2)}
            </p>
            <p className="text-sm font-medium">
              Cost per Minute: {currencySymbol} {(totalCost / (totalMinutes || 1)).toFixed(4)}
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Button onClick={onPreviewToggle} variant="outline" className="flex-1">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={onExportPDF} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}