import { CalcomPlan } from "@/types/calcom";
import { TwilioSelection } from "@/types/twilio";

export const calculateCalcomCostPerMinute = (
  plan: CalcomPlan | null,
  numberOfUsers: number,
  totalMinutes: number
): number => {
  if (!plan) return 0;
  const monthlyTotal = plan.basePrice + (plan.allowsTeam ? (numberOfUsers - 1) * plan.pricePerUser : 0);
  return Math.ceil((monthlyTotal / totalMinutes) * 1000) / 1000;
};

export const calculateTwilioCostPerMinute = (selection: TwilioSelection | null): number => {
  if (!selection) return 0;
  return Math.ceil((selection.inboundVoicePrice + (selection.inboundSmsPrice || 0)) * 1000) / 1000;
};

export const calculateSetupCost = (
  makePlanCost: number,
  synthflowPlanCost: number,
  calcomPlanCost: number,
  twilioPhoneNumberCost: number
): number => {
  return Math.ceil(makePlanCost + synthflowPlanCost + calcomPlanCost + twilioPhoneNumberCost);
};

export const calculateTotalCostPerMinute = (
  technologies: Array<{ id: string; isSelected: boolean; costPerMinute: number }>,
  margin: number
): number => {
  const baseCost = technologies
    .filter(tech => tech.isSelected)
    .reduce((acc, tech) => acc + tech.costPerMinute, 0);
  
  return Math.ceil(baseCost * (1 + margin / 100) * 1000) / 1000;
};