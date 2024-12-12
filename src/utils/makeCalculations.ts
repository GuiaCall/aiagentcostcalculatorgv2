import { MakePlan } from "@/types/make";

export const calculateMakeOperations = (totalMinutes: number, averageCallDuration: number, operationsPerScenario: number) => {
  const totalCalls = Math.ceil(totalMinutes / averageCallDuration);
  const totalOperations = Math.ceil(totalCalls * operationsPerScenario * 1.2); // Adding 20% buffer
  return { totalCalls, totalOperations };
};

export const calculateRequiredPlanPrice = (totalOperations: number, selectedPlanType: string) => {
  const baseOperations = 10000;
  const requiredPlans = Math.ceil(totalOperations / baseOperations);
  const basePrice = selectedPlanType === 'monthly' ? 9 : 8;
  
  return {
    totalPrice: basePrice * requiredPlans,
    operationsIncluded: baseOperations * requiredPlans,
    costPerMinute: 0.001 * requiredPlans // Base cost per minute multiplied by number of required plans
  };
};