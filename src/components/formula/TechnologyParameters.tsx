export function TechnologyParametersFormula() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Technology Parameters Cost Calculation</h3>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-medium">Cal.com:</span> (Base Plan Price + Team Members Cost) ÷ Total Minutes
        </p>
        <p className="text-sm text-gray-500">
          Team Members Cost = Number of Users × $12/month (for Team and Organization plans)
        </p>
        
        <p className="text-gray-600">
          <span className="font-medium">Make.com:</span> Monthly Plan Cost ÷ Total Minutes
        </p>
        
        <p className="text-gray-600">
          <span className="font-medium">Synthflow:</span> Monthly Plan Cost ÷ Total Minutes
        </p>
        
        <p className="text-gray-600">
          <span className="font-medium">Twilio:</span> (Inbound Voice Price + Inbound SMS Price)
        </p>
        
        <p className="text-gray-600">
          <span className="font-medium">Vapi:</span> Fixed Cost per Minute
        </p>
      </div>
    </div>
  );
}