import { Card } from "@/components/ui/card";

export function FormulaExplanation() {
  return (
    <Card className="p-6 space-y-6 mt-8">
      <h2 className="text-2xl font-heading font-bold text-gray-900">Formula Explanations</h2>
      
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

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Twilio Cost Calculation</h3>
          <p className="text-gray-600">
            Base Cost = Selected Rate × Total Minutes
          </p>
          <p className="text-sm text-gray-500 mt-1">
            The rate is determined by the selected country and number type. Different rates apply for local, mobile, and toll-free numbers.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Cost Per Minute</h3>
          <p className="text-gray-600">
            Cost Per Minute = Final Cost ÷ Total Minutes
          </p>
          <p className="text-sm text-gray-500 mt-1">
            This gives you the per-minute rate including your margin.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Make.com Operations Calculation</h3>
          <p className="text-gray-600">
            Total Calls = Total Minutes ÷ Average Call Duration
          </p>
          <p className="text-gray-600">
            Required Operations = Total Calls × Operations per Scenario × 1.2
          </p>
          <p className="text-sm text-gray-500 mt-1">
            We multiply by 1.2 to add a 20% buffer for incomplete operations that still consume your Make.com quota.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Synthflow Plan Cost Calculation</h3>
          <p className="text-gray-600">
            Monthly Cost = Selected Plan Monthly Price
          </p>
          <p className="text-gray-600">
            Yearly Total Cost = Selected Plan Yearly Price × 12
          </p>
          <p className="text-gray-600">
            Cost Per Minute = Plan Cost ÷ Minutes Included in Plan
          </p>
          <p className="text-sm text-gray-500 mt-1">
            The cost per minute is automatically adjusted based on your selected plan and billing cycle.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Cal.com Plan Cost Calculation</h3>
          <p className="text-gray-600">
            Base Cost = Selected Plan Base Price
          </p>
          <p className="text-gray-600">
            Team Member Cost = (Number of Users - 1) × Price Per Additional User
          </p>
          <p className="text-gray-600">
            Total Monthly Cost = Base Cost + Team Member Cost
          </p>
          <p className="text-sm text-gray-500 mt-1">
            For Team and Organization plans, additional team members are charged at $12/month each.
          </p>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Default Technology Costs</h3>
          <p className="text-sm text-gray-500 mb-2">These are suggested default values. You can customize the costs in the calculator above.</p>
          <ul className="space-y-2 text-gray-600">
            <li>• Vapi: $0.05 per minute</li>
            <li>• Synthflow: $0.03 per minute</li>
            <li>• Twilio: $0.02 per minute</li>
            <li>• Cal.com: $0.01 per minute</li>
            <li>• Make.com: $0.02 per minute</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
