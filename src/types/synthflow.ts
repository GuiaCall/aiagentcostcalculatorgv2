export interface SynthflowPlan {
  name: string;
  minutesPerMonth: number;
  monthlyPrice: number;
  yearlyPrice: number;
}

export interface SynthflowCalculation {
  selectedPlan: SynthflowPlan | null;
  billingType: 'monthly' | 'yearly';
}