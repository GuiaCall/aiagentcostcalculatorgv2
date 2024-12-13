export function CalcomFormula() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Cal.com Plan Cost Calculation</h3>
      <p className="text-gray-600">
        Monthly Cost = Selected Plan Base Price + Team Member Cost
      </p>
      <p className="text-gray-600">
        Team Member Cost = Number of Users × $12
      </p>
      <p className="text-gray-600">
        Cost Per Minute = Monthly Cost ÷ Total Minutes
      </p>
      <p className="text-sm text-gray-500 mt-1">
        For Team and Organization plans, each team member costs $12/month. The total monthly cost is divided by total minutes to get the per-minute rate.
      </p>
    </div>
  );
}