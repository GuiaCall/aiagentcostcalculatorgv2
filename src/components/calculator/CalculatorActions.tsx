import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalculatorActionsProps {
  onCalculate: () => void;
  onPreviewToggle: () => void;
  onExportPDF: () => void;
  totalCost: number | null;
  setupCost: number | null;
  currency: string;
  totalMinutes: number;
}

export function CalculatorActions({
  onCalculate,
  onPreviewToggle,
  onExportPDF,
  totalCost,
  setupCost,
  currency,
  totalMinutes,
}: CalculatorActionsProps) {
  const currencySymbol = currency === 'EUR' ? '€' : '$';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button onClick={onCalculate} variant="default">
          Calculate Cost
        </Button>
        <Button onClick={onPreviewToggle} variant="outline">
          Toggle Preview
        </Button>
        <Button onClick={onExportPDF} variant="outline">
          Export PDF
        </Button>
      </div>

      {totalCost !== null && setupCost !== null && (
        <div className="space-y-4">
          <div className={cn(
            "p-4 rounded-lg space-y-2",
            "bg-white text-foreground",
            "shadow-sm border border-border"
          )}>
            <p className="text-sm font-medium">
              Monthly Cost: {currencySymbol} {totalCost.toFixed(2)}
            </p>
            <p className="text-sm font-medium">
              Setup Cost: {currencySymbol} {setupCost.toFixed(2)}
            </p>
            <p className="text-sm font-medium">
              Total Minutes: {totalMinutes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}