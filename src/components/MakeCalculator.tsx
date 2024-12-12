import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MAKE_PLANS, MAKE_PRICING_URL } from "@/constants/makePlans";
import { ExternalLink } from "lucide-react";
import { MakePlan, OperationsCalculation } from "@/types/make";

export function MakeCalculator({
  totalMinutes,
  averageCallDuration,
  onPlanSelect,
}: {
  totalMinutes: number;
  averageCallDuration: number;
  onPlanSelect: (plan: MakePlan) => void;
}) {
  const [operationsPerScenario, setOperationsPerScenario] = useState<number>(100);
  const [selectedPlanType, setSelectedPlanType] = useState<string>("monthly");
  const [calculation, setCalculation] = useState<OperationsCalculation | null>(null);

  const calculateOperations = () => {
    const totalCalls = Math.ceil(totalMinutes / averageCallDuration);
    const totalOperations = Math.ceil(totalCalls * operationsPerScenario * 1.2); // Adding 20% buffer
    
    const recommendedPlan = MAKE_PLANS.find(
      plan => plan.operationsPerMonth >= totalOperations
    ) || MAKE_PLANS[MAKE_PLANS.length - 1];

    setCalculation({
      totalCalls,
      operationsPerScenario,
      totalOperations,
      recommendedPlan
    });

    if (recommendedPlan) {
      onPlanSelect(recommendedPlan);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Make.com Operations Calculator</h3>
        <a 
          href={MAKE_PRICING_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center gap-2"
        >
          View Make.com Pricing <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="operations">Operations per Scenario</Label>
          <Input
            id="operations"
            type="number"
            value={operationsPerScenario}
            onChange={(e) => setOperationsPerScenario(Number(e.target.value))}
            min="1"
          />
          <p className="text-sm text-gray-500">
            Enter the number of operations consumed by your Make.com scenarios
          </p>
        </div>

        <div className="space-y-2">
          <Label>Billing Cycle</Label>
          <Select
            value={selectedPlanType}
            onValueChange={setSelectedPlanType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select billing cycle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly (Save up to 15%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculateOperations} className="w-full">
          Calculate Required Operations
        </Button>

        {calculation && (
          <div className="space-y-4 p-4 bg-secondary rounded-lg">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Estimated Total Calls: {calculation.totalCalls}
              </p>
              <p className="text-sm text-gray-600">
                Operations per Call: {calculation.operationsPerScenario}
              </p>
              <p className="text-sm text-gray-600">
                Total Operations Needed (including 20% buffer): {calculation.totalOperations}
              </p>
            </div>

            {calculation.recommendedPlan && (
              <div className="space-y-2">
                <p className="font-semibold">Recommended Plan: {calculation.recommendedPlan.name}</p>
                <p className="text-sm text-gray-600">
                  Price: ${selectedPlanType === "monthly" 
                    ? calculation.recommendedPlan.monthlyPrice 
                    : calculation.recommendedPlan.yearlyPrice
                  }/{selectedPlanType === "monthly" ? "month" : "month (billed yearly)"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}