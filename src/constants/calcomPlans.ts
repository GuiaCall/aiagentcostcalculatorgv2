import { CalcomPlan } from "@/types/calcom";

export const CALCOM_PLANS: CalcomPlan[] = [
  {
    name: "Individual",
    basePrice: 0,
    allowsTeam: false,
    pricePerUser: 0
  },
  {
    name: "Team",
    basePrice: 12,
    allowsTeam: true,
    pricePerUser: 12
  },
  {
    name: "Organization",
    basePrice: 37,
    allowsTeam: true,
    pricePerUser: 12
  }
];

export const CALCOM_PRICING_URL = "https://cal.com/pricing";