export function SynthflowFormula() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Synthflow Plan Cost Calculation</h3>
      <p className="text-gray-600">
        Monthly Cost = Selected Plan Monthly Price
      </p>
      <p className="text-gray-600">
        Cost Per Minute = Monthly Cost ÷ Minutes Included in Plan
      </p>
      <p className="text-sm text-gray-500 mt-1">
        The cost per minute is automatically adjusted based on your selected plan.
      </p>
    </div>
  );
}