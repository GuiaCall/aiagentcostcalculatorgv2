import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SYNTHFLOW_PLANS, SYNTHFLOW_PRICING_URL } from "@/constants/synthflowPlans";
import { ExternalLink } from "lucide-react";
import { SynthflowPlan } from "@/types/synthflow";
import { useState, useEffect } from "react";

export function SynthflowCalculator({
  totalMinutes,
  onPlanSelect,
}: {
  totalMinutes: number;
  onPlanSelect: (plan: SynthflowPlan, billingType: 'monthly' | 'yearly') => void;
}) {
  const [billingType, setBillingType] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<SynthflowPlan | null>(null);

  const handlePlanSelect = (planName: string) => {
    const plan = SYNTHFLOW_PLANS.find(p => p.name === planName);
    if (plan) {
      const monthlyPrice = billingType === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
      const baseCostPerMinute = plan.minutesPerMonth > 0 ? monthlyPrice / plan.minutesPerMonth : 0;
      const finalCostPerMinute = baseCostPerMinute * 1.2; // Adding 20% margin
      
      // Update the selected plan with both base and final cost per minute
      const updatedPlan = {
        ...plan,
        monthlyPrice: monthlyPrice,
        costPerMinute: finalCostPerMinute,
        baseCostPerMinute: baseCostPerMinute
      };
      
      setSelectedPlan(updatedPlan);
      onPlanSelect(updatedPlan, billingType);

      // Update the technology parameters with the new cost per minute
      const technologies = JSON.parse(localStorage.getItem('technologies') || '[]');
      const updatedTechnologies = technologies.map((tech: any) =>
        tech.id === 'synthflow' ? { ...tech, costPerMinute: finalCostPerMinute } : tech
      );
      localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
      
      // Dispatch a storage event to notify other components
      window.dispatchEvent(new Event('storage'));
    }
  };

  useEffect(() => {
    if (selectedPlan) {
      handlePlanSelect(selectedPlan.name);
    }
  }, [billingType]);

  const recommendedPlan = SYNTHFLOW_PLANS.find(
    plan => plan.minutesPerMonth >= totalMinutes
  );

  // Update recommended plan when billing type changes or when total minutes change
  useEffect(() => {
    if (recommendedPlan && (!selectedPlan || selectedPlan.name !== recommendedPlan.name)) {
      handlePlanSelect(recommendedPlan.name);
    }
  }, [recommendedPlan, billingType, totalMinutes]);

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Synthflow Plan Calculator</h3>
        <a 
          href={SYNTHFLOW_PRICING_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center gap-2"
        >
          View Synthflow Pricing <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Billing Type</Label>
          <RadioGroup
            defaultValue={billingType}
            onValueChange={(value: 'monthly' | 'yearly') => setBillingType(value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Monthly Billing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="yearly" />
              <Label htmlFor="yearly">Yearly Billing (Save up to 20%)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Select Plan</Label>
          <Select
            onValueChange={handlePlanSelect}
            defaultValue={recommendedPlan?.name}
            value={selectedPlan?.name}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select plan" />
            </SelectTrigger>
            <SelectContent>
              {SYNTHFLOW_PLANS.map((plan) => (
                <SelectItem key={plan.name} value={plan.name}>
                  {plan.name} - {plan.minutesPerMonth} mins/month (${billingType === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}/month{billingType === 'yearly' ? ' billed yearly' : ''})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {recommendedPlan && (
          <div className="p-4 bg-secondary rounded-lg space-y-3">
            <p className="font-semibold">Recommended Plan: {recommendedPlan.name}</p>
            <p className="text-sm text-gray-600">
              Based on your estimated usage of {totalMinutes} minutes per month
            </p>
            <div className="text-sm text-gray-600">
              <p>Monthly Price: ${billingType === 'monthly' ? recommendedPlan.monthlyPrice : recommendedPlan.yearlyPrice}/month</p>
              <p>Base Cost per Minute: ${((billingType === 'monthly' ? recommendedPlan.monthlyPrice : recommendedPlan.yearlyPrice) / recommendedPlan.minutesPerMonth).toFixed(4)}/min</p>
              <p className="font-medium text-primary">
                Final Cost per Minute (including margin): ${(((billingType === 'monthly' ? recommendedPlan.monthlyPrice : recommendedPlan.yearlyPrice) / recommendedPlan.minutesPerMonth) * 1.2).toFixed(4)}/min
              </p>
              {billingType === 'yearly' && (
                <p className="font-medium text-primary">
                  Total Yearly Cost: ${(recommendedPlan.yearlyPrice * 12).toFixed(2)}/year
                </p>
              )}
            </div>
            <Button 
              variant="outline"
              className="w-full mt-2"
              onClick={() => window.open(SYNTHFLOW_PRICING_URL, '_blank')}
            >
              Get This Plan <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}