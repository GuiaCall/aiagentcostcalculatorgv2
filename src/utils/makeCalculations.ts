export const calculateMakeOperations = (totalMinutes: number, averageCallDuration: number, operationsPerScenario: number) => {
  const safeCallDuration = Math.max(averageCallDuration, 1);
  const totalCalls = Math.ceil(totalMinutes / safeCallDuration);
  const totalOperations = Math.ceil(totalCalls * operationsPerScenario * 1.2); // Adding 20% buffer
  return { totalCalls, totalOperations };
};

export const calculateRequiredPlanPrice = (totalOperations: number, selectedPlanType: string, totalMinutes: number) => {
  const baseOperations = 10000;
  const requiredPlans = Math.max(Math.ceil(totalOperations / baseOperations), 1);
  
  // Use exact pricing from Make.com plans
  const monthlyBasePrice = 10.59;
  const yearlyBasePrice = 9.00;
  
  // Calculate total price based on the number of required plans
  const totalPrice = selectedPlanType === 'monthly' 
    ? monthlyBasePrice * requiredPlans 
    : yearlyBasePrice * requiredPlans;
  
  return {
    totalPrice: Math.round(totalPrice * 100) / 100, // Round to 2 decimal places
    operationsIncluded: baseOperations * requiredPlans,
    costPerMinute: totalMinutes > 0 
      ? Math.round((totalPrice / totalMinutes) * 1000) / 1000 
      : 0
  };
};