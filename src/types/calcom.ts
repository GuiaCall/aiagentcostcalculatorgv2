export interface CalcomPlan {
  name: string;
  basePrice: number;
  allowsTeam: boolean;
  pricePerUser: number;
}

export interface CalcomCalculation {
  selectedPlan: CalcomPlan | null;
  numberOfUsers: number;
}