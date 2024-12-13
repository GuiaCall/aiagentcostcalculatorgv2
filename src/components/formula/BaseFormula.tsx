import { Card } from "@/components/ui/card";

export function BaseFormula() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Base Cost Calculation</h3>
        <p className="text-gray-600">
          Base Cost = Σ(Selected Technology Costs per Minute) × Total Minutes
        </p>
        <p className="text-sm text-gray-500 mt-1">
          We sum the cost per minute of each selected technology and multiply by the total minutes.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">Margin Application</h3>
        <p className="text-gray-600">
          Final Cost = Base Cost × (1 + Margin%)
        </p>
        <p className="text-sm text-gray-500 mt-1">
          The margin percentage is applied to the base cost to determine the final price.
        </p>
      </div>
    </div>
  );
}