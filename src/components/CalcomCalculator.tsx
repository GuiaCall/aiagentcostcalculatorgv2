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
import { calculateCalcomCostPerMinute } from "@/utils/costCalculations";

interface CalcomCalculatorProps {
  onPlanSelect: (plan: CalcomPlan, numberOfUsers: number) => void;
  totalMinutes: number; // Add this prop
}

export function CalcomCalculator({ onPlanSelect, totalMinutes }: CalcomCalculatorProps) {
  const [selectedPlan, setSelectedPlan] = useState<CalcomPlan | null>(null);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(1);
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedPlan) {
      // Calculate team member cost
      const teamMemberCost = (selectedPlan.name === "Team" || selectedPlan.name === "Organization") && numberOfUsers > 0
        ? numberOfUsers * 12 // $12 per team member
        : 0;
      
      // Calculate total monthly cost
      const totalCost = selectedPlan.basePrice + teamMemberCost;
      setMonthlyTotal(totalCost);

      // Calculate cost per minute and update parent
      const costPerMinute = calculateCalcomCostPerMinute(selectedPlan, numberOfUsers, totalMinutes);
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

    // Calculate team member cost
    const teamMemberCost = (selectedPlan.name === "Team" || selectedPlan.name === "Organization") && numberOfUsers > 0
      ? numberOfUsers * 12
      : 0;
    
    // Calculate total monthly cost
    const totalCost = selectedPlan.basePrice + teamMemberCost;
    setMonthlyTotal(totalCost);
    
    toast({
      title: "Monthly Cost Calculated",
      description: `Base Plan Cost: $${selectedPlan.basePrice}\nTeam Members Cost: $${teamMemberCost}\nTotal: $${totalCost}\nCost Per Minute: $${calculateCalcomCostPerMinute(selectedPlan, numberOfUsers, totalMinutes)}`,
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