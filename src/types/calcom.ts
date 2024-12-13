export interface CalcomPlan {
  name: string;
  basePrice: number;
  allowsTeam: boolean;
  pricePerUser: number;
  costPerMinute?: number;
}

export interface CalcomCalculation {
  selectedPlan: CalcomPlan | null;
  numberOfUsers: number;
}