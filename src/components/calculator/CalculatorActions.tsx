import { Button } from "../ui/button";
import { CalculatorIcon, Download, Eye } from "lucide-react";

interface CalculatorActionsProps {
  onCalculate: () => void;
  onPreviewToggle: () => void;
  onExportPDF: () => void;
  totalCost: number | null;
}

export function CalculatorActions({
  onCalculate,
  onPreviewToggle,
  onExportPDF,
  totalCost,
}: CalculatorActionsProps) {
  return (
    <div className="flex justify-end space-x-4">
      <Button onClick={onCalculate} className="bg-primary">
        <CalculatorIcon className="mr-2 h-4 w-4" />
        Calculate
      </Button>
      {totalCost && (
        <>
          <Button onClick={onPreviewToggle} variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={onExportPDF} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </>
      )}
    </div>
  );
}