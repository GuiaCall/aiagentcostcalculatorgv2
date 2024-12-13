import { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

export function Disclaimer() {
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('disclaimerAccepted');
    if (accepted) {
      setIsAccepted(true);
    }
  }, []);

  const handleAccept = (checked: boolean) => {
    setIsAccepted(checked);
    if (checked) {
      localStorage.setItem('disclaimerAccepted', 'true');
    }
  };

  if (isAccepted) return null;

  return (
    <Card className="p-4 mb-6 bg-white/80 backdrop-blur-sm">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Please note that all calculations provided are approximations. Actual costs may vary based on specific usage patterns, provider pricing changes, and other factors.
        </p>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="disclaimer"
            checked={isAccepted}
            onCheckedChange={handleAccept}
          />
          <Label htmlFor="disclaimer">
            I understand that these are approximate calculations
          </Label>
        </div>
      </div>
    </Card>
  );
}