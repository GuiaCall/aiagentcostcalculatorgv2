export const calculateMakeOperations = (totalMinutes: number, averageCallDuration: number, operationsPerScenario: number) => {
  const safeCallDuration = Math.max(averageCallDuration, 1);
  const totalCalls = Math.ceil(totalMinutes / safeCallDuration);
  const totalOperations = Math.ceil(totalCalls * operationsPerScenario * 1.2); // Adding 20% buffer
  return { totalCalls, totalOperations };
};

export const calculateRequiredPlanPrice = (totalOperations: number, selectedPlanType: string, totalMinutes: number) => {
  const baseOperations = 10000;
  const requiredPlans = Math.max(Math.ceil(totalOperations / baseOperations), 1);
  
  // Use exact Make.com pricing tiers
  const monthlyPrices = {
    1: 10.59,  // 1 plan = 10.59
    2: 21.18,  // 2 plans = 10.59 * 2
    3: 31.77,  // 3 plans = 10.59 * 3
    4: 42.36   // 4 plans = 10.59 * 4
  };

  const yearlyPrices = {
    1: 9.00,   // 1 plan = 9.00
    2: 18.00,  // 2 plans = 9.00 * 2
    3: 27.00,  // 3 plans = 9.00 * 3
    4: 36.00   // 4 plans = 9.00 * 4
  };

  // Get the exact price based on required plans
  const prices = selectedPlanType === 'monthly' ? monthlyPrices : yearlyPrices;
  const totalPrice = prices[Math.min(requiredPlans, 4) as keyof typeof prices];
  
  return {
    totalPrice,
    operationsIncluded: baseOperations * requiredPlans,
    costPerMinute: totalMinutes > 0 ? totalPrice / totalMinutes : 0
  };
};