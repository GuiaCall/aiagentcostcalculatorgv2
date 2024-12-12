import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CALCOM_PLANS, CALCOM_PRICING_URL } from "@/constants/calcomPlans";
import { CalcomPlan } from "@/types/calcom";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ExternalLink, Calculator } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface CalcomCalculatorProps {
  onPlanSelect: (plan: CalcomPlan, numberOfUsers: number) => void;
}

export function CalcomCalculator({ onPlanSelect }: CalcomCalculatorProps) {
  const [selectedPlan, setSelectedPlan] = useState<CalcomPlan | null>(null);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(1);
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const { toast } = useToast();

  const computeMonthlyCost = () => {
    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a plan first",
        variant: "destructive",
      });
      return;
    }

    const basePrice = selectedPlan.basePrice;
    const additionalUsersCost = selectedPlan.allowsTeam ? (numberOfUsers - 1) * selectedPlan.pricePerUser : 0;
    const total = basePrice + additionalUsersCost;
    
    setMonthlyTotal(total);
    
    // Update the parent component with new values
    onPlanSelect(selectedPlan, numberOfUsers);
    
    toast({
      title: "Monthly Cost Calculated",
      description: `Base Price: $${basePrice}\nTeam Members Cost: $${additionalUsersCost}\nTotal: $${total}`,
    });
  };

  const handlePlanChange = (planName: string) => {
    const plan = CALCOM_PLANS.find(p => p.name === planName);
    if (plan) {
      setSelectedPlan(plan);
      if (!plan.allowsTeam) {
        setNumberOfUsers(1);
      }
      // Reset monthly total when plan changes
      setMonthlyTotal(0);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Cal.com Plan</h3>
        <Button variant="ghost" size="sm" onClick={() => window.open(CALCOM_PRICING_URL, '_blank')}>
          View Pricing <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <RadioGroup
        onValueChange={handlePlanChange}
      >
        {CALCOM_PLANS.map((plan) => (
          <div key={plan.name} className="flex items-center space-x-2">
            <RadioGroupItem value={plan.name} id={`calcom-${plan.name}`} />
            <Label htmlFor={`calcom-${plan.name}`}>
              {plan.name} (${plan.basePrice}/month)
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedPlan?.allowsTeam && (
        <div className="space-y-2">
          <Label htmlFor="numberOfUsers">Number of Team Members</Label>
          <Input
            id="numberOfUsers"
            type="number"
            min="1"
            value={numberOfUsers}
            onChange={(e) => {
              const value = Math.max(1, parseInt(e.target.value) || 1);
              setNumberOfUsers(value);
              setMonthlyTotal(0); // Reset monthly total when number of users changes
            }}
          />
          <p className="text-sm text-muted-foreground">
            Additional team members cost ${selectedPlan.pricePerUser}/month each
          </p>
        </div>
      )}

      <Button 
        onClick={computeMonthlyCost}
        className="w-full"
        variant="outline"
      >
        <Calculator className="mr-2 h-4 w-4" />
        Compute Monthly Cost
      </Button>

      {monthlyTotal > 0 && (
        <div className="mt-4 p-4 bg-primary/10 rounded-lg">
          <p className="text-sm font-medium">
            Total Monthly Cost: ${monthlyTotal.toFixed(2)}
          </p>
        </div>
      )}
    </Card>
  );
}