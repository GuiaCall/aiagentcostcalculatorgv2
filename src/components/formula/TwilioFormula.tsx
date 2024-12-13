export function TwilioFormula() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Twilio Cost Calculation</h3>
      <p className="text-gray-600">
        Base Cost = Selected Rate × Total Minutes
      </p>
      <p className="text-sm text-gray-500 mt-1">
        The rate is determined by the selected country and number type. Different rates apply for local, mobile, and toll-free numbers.
      </p>
    </div>
  );
}