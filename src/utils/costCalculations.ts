import { CalcomPlan } from "@/types/calcom";
import { TwilioSelection } from "@/types/twilio";

export const calculateCalcomCostPerMinute = (
  plan: CalcomPlan | null,
  numberOfUsers: number,
  totalMinutes: number
): number => {
  if (!plan || totalMinutes <= 0) return 0;
  
  // Calculate team member cost only for Team and Organization plans
  const teamMemberCost = (plan.name === "Team" || plan.name === "Organization") && numberOfUsers > 0
    ? numberOfUsers * 12 // $12 per team member
    : 0;
  
  // Calculate total monthly cost: plan base price + team member cost
  const monthlyTotal = plan.basePrice + teamMemberCost;
  
  // Convert to cost per minute
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