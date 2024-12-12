export interface MakePlan {
  name: string;
  operationsPerMonth: number;
  monthlyPrice: number;
  yearlyPrice: number;
}

export interface OperationsCalculation {
  totalCalls: number;
  operationsPerScenario: number;
  totalOperations: number;
  recommendedPlan: MakePlan | null;
}