import { MakePlan } from "@/types/make";

export const MAKE_PLANS: MakePlan[] = [
  {
    name: "Core",
    operationsPerMonth: 10000,
    monthlyPrice: 10.59,
    yearlyPrice: 9.00
  },
  {
    name: "Pro",
    operationsPerMonth: 10000,
    monthlyPrice: 18.82,
    yearlyPrice: 16.00
  },
  {
    name: "Teams",
    operationsPerMonth: 10000,
    monthlyPrice: 34.12,
    yearlyPrice: 29.00
  }
];

export const MAKE_PRICING_URL = "https://rb.gy/8nusbv";