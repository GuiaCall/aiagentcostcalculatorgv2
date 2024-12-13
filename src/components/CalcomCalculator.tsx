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
  totalMinutes: number;
}

export function CalcomCalculator({ onPlanSelect, totalMinutes }: CalcomCalculatorProps) {
  const [selectedPlan, setSelectedPlan] = useState<CalcomPlan | null>(null);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(1);
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedPlan && totalMinutes > 0) {
      const teamMemberCost = (selectedPlan.name === "Team" || selectedPlan.name === "Organization") && numberOfUsers > 0
        ? numberOfUsers * 12
        : 0;
      
      const totalCost = selectedPlan.basePrice + teamMemberCost;
      setMonthlyTotal(totalCost);

      onPlanSelect(selectedPlan, numberOfUsers);
    }
  }, [selectedPlan, numberOfUsers, totalMinutes, onPlanSelect]);

  const computeMonthlyCost = () => {
    if (!selectedPlan) {
      toast({
        title: "Error",
        description: "Please select a plan first",
        variant: "destructive",
      });
      return;
    }

    const teamMemberCost = (selectedPlan.name === "Team" || selectedPlan.name === "Organization") && numberOfUsers > 0
      ? numberOfUsers * 12
      : 0;
    
    const totalCost = selectedPlan.basePrice + teamMemberCost;
    setMonthlyTotal(totalCost);
    
    const costPerMinute = totalMinutes > 0 ? Number((totalCost / totalMinutes).toFixed(3)) : 0;

    // Update the technologies array with the new cost per minute
    const updatedPlan = {
      ...selectedPlan,
      costPerMinute
    };
    onPlanSelect(updatedPlan, numberOfUsers);
    
    toast({
      title: "Monthly Cost Calculated",
      description: `Base Plan Cost: $${selectedPlan.basePrice}
Team Members Cost: $${teamMemberCost}
Total Monthly Cost: $${totalCost}
Cost Per Minute: $${costPerMinute}`,
    });
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
        onValueChange={(value) => {
          const plan = CALCOM_PLANS.find(p => p.name === value);
          if (plan) {
            setSelectedPlan(plan);
            if (!plan.allowsTeam) {
              setNumberOfUsers(1);
            }
          }
        }}
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

      {selectedPlan?.name === "Team" || selectedPlan?.name === "Organization" ? (
        <div className="space-y-2">
          <Label htmlFor="numberOfUsers">Number of Team Members</Label>
          <Input
            id="numberOfUsers"
            type="number"
            min="0"
            value={numberOfUsers}
            onChange={(e) => setNumberOfUsers(Math.max(0, parseInt(e.target.value) || 0))}
          />
          <p className="text-sm text-muted-foreground">
            Team members cost $12/month each
          </p>
        </div>
      ) : null}

      <div className="flex justify-between items-center pt-4">
        <Button 
          onClick={computeMonthlyCost}
          className="w-full"
          variant="outline"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Compute Monthly Cost
        </Button>
      </div>

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