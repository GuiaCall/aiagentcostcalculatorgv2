import { SynthflowPlan } from "@/types/synthflow";

export const SYNTHFLOW_PLANS: SynthflowPlan[] = [
  {
    name: "Starter",
    minutesPerMonth: 2000,
    monthlyPrice: 450,
    yearlyPrice: 375
  },
  {
    name: "Pro",
    minutesPerMonth: 4000,
    monthlyPrice: 900,
    yearlyPrice: 750
  },
  {
    name: "Agency",
    minutesPerMonth: 6000,
    monthlyPrice: 1400,
    yearlyPrice: 1250
  }
];

export const SYNTHFLOW_PRICING_URL = "https://shorturl.at/J9IYu";