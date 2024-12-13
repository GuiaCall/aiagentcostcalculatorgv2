export function MakeFormula() {
  return (
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
  );
}