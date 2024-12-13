export function DefaultCosts() {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Default Technology Costs</h3>
      <p className="text-sm text-gray-500 mb-2">
        These are suggested default values. You can customize the costs in the calculator above.
      </p>
      <ul className="space-y-2 text-gray-600">
        <li>• Vapi: $0.05 per minute</li>
        <li>• Synthflow: $0.03 per minute</li>
        <li>• Twilio: $0.02 per minute</li>
        <li>• Cal.com: $0.01 per minute</li>
        <li>• Make.com: $0.02 per minute</li>
      </ul>
    </div>
  );
}