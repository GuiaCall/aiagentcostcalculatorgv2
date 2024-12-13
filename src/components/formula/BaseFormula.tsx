import { Card } from "@/components/ui/card";

export function BaseFormula() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Setup Cost Calculation</h3>
        <p className="text-gray-600">
          Setup Cost = Σ(Selected Technology Fixed Costs) × (1 + Margin%)
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Fixed costs include:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-500 ml-4">
          <li>Make.com plan for first month</li>
          <li>Synthflow plan for first month</li>
          <li>Cal.com cost (including team members) for first month</li>
          <li>Twilio phone number cost for two months</li>
        </ul>
      </div>

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
          The margin percentage is applied to both the setup cost and the base cost to determine the final prices.
        </p>
      </div>
    </div>
  );
}