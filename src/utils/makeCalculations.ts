export const calculateMakeOperations = (totalMinutes: number, averageCallDuration: number, operationsPerScenario: number) => {
  const safeCallDuration = Math.max(averageCallDuration, 1);
  const totalCalls = Math.ceil(totalMinutes / safeCallDuration);
  const totalOperations = Math.ceil(totalCalls * operationsPerScenario * 1.2); // Adding 20% buffer
  return { totalCalls, totalOperations };
};

export const calculateRequiredPlanPrice = (totalOperations: number, selectedPlanType: string, totalMinutes: number) => {
  const baseOperations = 10000;
  const requiredPlans = Math.max(Math.ceil(totalOperations / baseOperations), 1);
  const basePrice = selectedPlanType === 'monthly' ? 10.59 : 9;
  const totalPrice = Math.ceil(basePrice * requiredPlans);
  
  return {
    totalPrice,
    operationsIncluded: baseOperations * requiredPlans,
    costPerMinute: Math.ceil((totalPrice / totalMinutes) * 1000) / 1000 // Cost per minute based on total minutes
  };
};