import { Card } from "@/components/ui/card";
import { BaseFormula } from "./formula/BaseFormula";
import { CalcomFormula } from "./formula/CalcomFormula";
import { TwilioFormula } from "./formula/TwilioFormula";
import { MakeFormula } from "./formula/MakeFormula";
import { SynthflowFormula } from "./formula/SynthflowFormula";
import { DefaultCosts } from "./formula/DefaultCosts";

export function FormulaExplanation() {
  return (
    <Card className="p-6 space-y-6 mt-8">
      <h2 className="text-2xl font-heading font-bold text-gray-900">Formula Explanations</h2>
      
      <div className="space-y-4">
        <BaseFormula />
        <CalcomFormula />
        <TwilioFormula />
        <MakeFormula />
        <SynthflowFormula />
        <DefaultCosts />
      </div>
    </Card>
  );
}