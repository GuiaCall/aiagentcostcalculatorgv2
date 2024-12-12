export const calculateMakeOperations = (totalMinutes: number, averageCallDuration: number, operationsPerScenario: number) => {
  // Prevent division by zero by setting a minimum call duration
  const safeCallDuration = Math.max(averageCallDuration, 1);
  const totalCalls = Math.ceil(totalMinutes / safeCallDuration);
  const totalOperations = Math.ceil(totalCalls * operationsPerScenario * 1.2); // Adding 20% buffer
  return { totalCalls, totalOperations };
};

export const calculateRequiredPlanPrice = (totalOperations: number, selectedPlanType: string) => {
  const baseOperations = 10000;
  // Ensure we have at least one plan
  const requiredPlans = Math.max(Math.ceil(totalOperations / baseOperations), 1);
  const basePrice = selectedPlanType === 'monthly' ? 10.59 : 9;
  const totalPrice = Math.ceil(basePrice * requiredPlans);
  
  return {
    totalPrice,
    operationsIncluded: baseOperations * requiredPlans,
    costPerMinute: Math.ceil((basePrice * requiredPlans) / (baseOperations * requiredPlans) * 1000) / 1000 // Round to 3 decimal places
  };
};