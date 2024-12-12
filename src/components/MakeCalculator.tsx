import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MAKE_PRICING_URL } from "@/constants/makePlans";
import { ExternalLink } from "lucide-react";
import { MakePlan, OperationsCalculation } from "@/types/make";
import { calculateMakeOperations, calculateRequiredPlanPrice } from "@/utils/makeCalculations";

export function MakeCalculator({
  totalMinutes,
  averageCallDuration,
  onPlanSelect,
  onCostPerMinuteChange,
}: {
  totalMinutes: number;
  averageCallDuration: number;
  onPlanSelect: (plan: MakePlan) => void;
  onCostPerMinuteChange: (cost: number) => void;
}) {
  const [operationsPerScenario, setOperationsPerScenario] = useState<number>(100);
  const [selectedPlanType, setSelectedPlanType] = useState<string>("monthly");
  const [calculation, setCalculation] = useState<OperationsCalculation | null>(null);

  const calculateOperations = () => {
    const { totalCalls, totalOperations } = calculateMakeOperations(
      totalMinutes,
      averageCallDuration,
      operationsPerScenario
    );
    
    const { totalPrice, operationsIncluded, costPerMinute } = calculateRequiredPlanPrice(
      totalOperations,
      selectedPlanType
    );

    const recommendedPlan: MakePlan = {
      name: `Custom Plan (${operationsIncluded} ops)`,
      operationsPerMonth: operationsIncluded,
      monthlyPrice: totalPrice,
      yearlyPrice: totalPrice * 0.85 // 15% discount for yearly
    };

    setCalculation({
      totalCalls,
      operationsPerScenario,
      totalOperations,
      recommendedPlan
    });

    onPlanSelect(recommendedPlan);
    onCostPerMinuteChange(costPerMinute);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Make.com Operations Calculator</h3>
        <Button 
          variant="outline"
          className="animate-pulse hover:animate-none bg-primary/10 hover:bg-primary/20 text-primary font-semibold"
          onClick={() => window.open(MAKE_PRICING_URL, '_blank')}
        >
          View Make.com Pricing <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
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