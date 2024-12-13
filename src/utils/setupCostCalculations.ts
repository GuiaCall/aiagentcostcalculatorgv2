import { MakePlan } from "@/types/make";
import { SynthflowPlan } from "@/types/synthflow";
import { CalcomPlan } from "@/types/calcom";
import { TwilioSelection } from "@/types/twilio";

interface Technology {
  id: string;
  isSelected: boolean;
  costPerMinute: number;
}

export const calculateSetupCost = (
  technologies: Technology[],
  makePlan: MakePlan | null,
  synthflowPlan: SynthflowPlan | null,
  calcomPlan: CalcomPlan | null,
  numberOfUsers: number,
  twilioRate: TwilioSelection | null,
  margin: number
): number => {
  let totalSetupCost = 0;

  // Calculate setup costs for each selected technology
  technologies.forEach((tech) => {
    if (tech.isSelected) {
      switch (tech.id) {
        case 'make':
          if (makePlan) {
            totalSetupCost += makePlan.monthlyPrice;
          }
          break;
        case 'synthflow':
          if (synthflowPlan) {
            totalSetupCost += synthflowPlan.monthlyPrice;
          }
          break;
        case 'calcom':
          if (calcomPlan) {
            const teamMemberCost = calcomPlan.allowsTeam ? (numberOfUsers - 1) * calcomPlan.pricePerUser : 0;
            totalSetupCost += calcomPlan.basePrice + teamMemberCost;
          }
          break;
        case 'twilio':
          if (twilioRate) {
            // Two months of phone number cost
            totalSetupCost += twilioRate.phoneNumberPrice * 2;
          }
          break;
      }
    }
  });

  // Apply margin to setup cost
  return totalSetupCost * (1 + margin / 100);
};