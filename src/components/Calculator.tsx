import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Calculator as CalculatorIcon, Download } from "lucide-react";
import { MakeCalculator } from "./MakeCalculator";
import { SynthflowCalculator } from "./SynthflowCalculator";
import { CalcomCalculator } from "./CalcomCalculator";
import { TwilioCalculator } from "./TwilioCalculator";
import { TwilioSelection } from "@/types/twilio";
import { MakePlan } from "@/types/make";
import { SynthflowPlan } from "@/types/synthflow";
import { CalcomPlan } from "@/types/calcom";
import jsPDF from "jspdf";

interface Technology {
  id: string;
  name: string;
  isSelected: boolean;
  costPerMinute: number;
}

export function Calculator() {
  const { toast } = useToast();
  const [callDuration, setCallDuration] = useState<number>(5);
  const [totalMinutes, setTotalMinutes] = useState<number>(1000);
  const [margin, setMargin] = useState<number>(20);
  const [selectedMakePlan, setSelectedMakePlan] = useState<MakePlan | null>(null);
  const [selectedSynthflowPlan, setSelectedSynthflowPlan] = useState<SynthflowPlan | null>(null);
  const [synthflowBillingType, setSynthflowBillingType] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedCalcomPlan, setSelectedCalcomPlan] = useState<CalcomPlan | null>(null);
  const [calcomUsers, setCalcomUsers] = useState<number>(1);
  const [selectedTwilioRate, setSelectedTwilioRate] = useState<TwilioSelection | null>(null);
  
  const [technologies, setTechnologies] = useState<Technology[]>([
    { id: "vapi", name: "Vapi", isSelected: false, costPerMinute: 0.05 },
    { id: "synthflow", name: "Synthflow", isSelected: false, costPerMinute: 0.03 },
    { id: "twilio", name: "Twilio", isSelected: false, costPerMinute: 0.02 },
    { id: "calcom", name: "Cal.com", isSelected: false, costPerMinute: 0.01 },
    { id: "makecom", name: "Make.com", isSelected: false, costPerMinute: 0.02 },
  ]);

  const [totalCost, setTotalCost] = useState<number | null>(null);

  const handleTechnologyToggle = (techId: string) => {
    setTechnologies(
      technologies.map((tech) =>
        tech.id === techId ? { ...tech, isSelected: !tech.isSelected } : tech
      )
    );
  };

  const handleTwilioRateSelect = (selection: TwilioSelection | null) => {
    if (selection) {
      setTechnologies(prev => 
        prev.map(tech => 
          tech.id === "twilio" 
            ? { ...tech, isSelected: true, costPerMinute: selection.inboundVoicePrice }
            : tech
        )
      );
      setSelectedTwilioRate(selection);
    }
  };

  const handleCostUpdate = (techId: string, newCost: string) => {
    const costValue = parseFloat(newCost);
    if (!isNaN(costValue) && costValue >= 0) {
      setTechnologies(
        technologies.map((tech) =>
          tech.id === techId ? { ...tech, costPerMinute: costValue } : tech
        )
      );
    }
  };

  const calculateCost = () => {
    const selectedTechs = technologies.filter((tech) => tech.isSelected);
    if (selectedTechs.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one technology",
        variant: "destructive",
      });
      return;
    }

    const baseCost = selectedTechs.reduce((acc, tech) => acc + tech.costPerMinute, 0);
    const totalBaseCost = baseCost * totalMinutes;
    
    // Add Make.com plan cost if selected
    const makePlanCostPerMonth = selectedMakePlan ? selectedMakePlan.monthlyPrice : 0;
    
    // Add Cal.com plan cost if selected
    const calcomCostPerMonth = selectedCalcomPlan 
      ? selectedCalcomPlan.basePrice + (selectedCalcomPlan.allowsTeam ? (calcomUsers - 1) * selectedCalcomPlan.pricePerUser : 0)
      : 0;
    
    const finalCost = (totalBaseCost + makePlanCostPerMonth + calcomCostPerMonth) * (1 + margin / 100);
    
    setTotalCost(finalCost);
  };

  const handleMakePlanSelect = (plan: MakePlan) => {
    setSelectedMakePlan(plan);
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === "makecom" 
          ? { ...tech, isSelected: true, costPerMinute: plan.monthlyPrice / totalMinutes }
          : tech
      )
    );
  };

  const handleSynthflowPlanSelect = (plan: SynthflowPlan, billingType: 'monthly' | 'yearly') => {
    setSelectedSynthflowPlan(plan);
    setSynthflowBillingType(billingType);
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === "synthflow" 
          ? { ...tech, isSelected: true, costPerMinute: billingType === 'monthly' 
              ? plan.monthlyPrice / plan.minutesPerMonth 
              : plan.yearlyPrice * 12 / (plan.minutesPerMonth * 12) }
          : tech
      )
    );
  };

  const handleCalcomPlanSelect = (plan: CalcomPlan, users: number) => {
    setSelectedCalcomPlan(plan);
    setCalcomUsers(users);
    const monthlyPrice = plan.basePrice + (plan.allowsTeam ? (users - 1) * plan.pricePerUser : 0);
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === "calcom" 
          ? { ...tech, isSelected: true, costPerMinute: monthlyPrice / totalMinutes }
          : tech
      )
    );
  };

  const exportPDF = () => {
    if (!totalCost) return;

    const doc = new jsPDF();
    const selectedTechs = technologies.filter((tech) => tech.isSelected);
    
    // Add title
    doc.setFontSize(20);
    doc.text("AI Voice Agent Cost Calculation", 20, 20);
    
    // Add calculation details
    doc.setFontSize(12);
    doc.text("Selected Technologies:", 20, 40);
    selectedTechs.forEach((tech, index) => {
      doc.text(`- ${tech.name}: $${tech.costPerMinute}/minute`, 25, 50 + (index * 10));
    });
    
    // Add parameters
    doc.text(`Call Duration: ${callDuration} minutes`, 20, 90);
    doc.text(`Total Minutes: ${totalMinutes}`, 20, 100);
    doc.text(`Margin: ${margin}%`, 20, 110);
    
    // Add results
    doc.text("Results:", 20, 130);
    doc.text(`Base cost per minute: $${(totalCost / totalMinutes / (1 + margin / 100)).toFixed(4)}`, 25, 140);
    doc.text(`Cost per minute with margin: $${(totalCost / totalMinutes).toFixed(4)}`, 25, 150);
    doc.text(`Total Cost: $${totalCost.toFixed(2)}`, 25, 160);
    
    // Save the PDF
    doc.save("voice-agent-cost-calculation.pdf");
    
    toast({
      title: "PDF Generated",
      description: "Your calculation report has been downloaded",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn">
      <Card className="p-6 space-y-6">
        <h2 className="text-2xl font-heading font-bold text-gray-900">Cost Calculator</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Average Call Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={callDuration}
                onChange={(e) => setCallDuration(Number(e.target.value))}
                min="1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="total">Total Minutes</Label>
              <Input
                id="total"
                type="number"
                value={totalMinutes}
                onChange={(e) => setTotalMinutes(Number(e.target.value))}
                min="1"
              />
            </div>
          </div>

          <MakeCalculator 
            totalMinutes={totalMinutes}
            averageCallDuration={callDuration}
            onPlanSelect={handleMakePlanSelect}
          />

          <SynthflowCalculator 
            totalMinutes={totalMinutes}
            onPlanSelect={handleSynthflowPlanSelect}
          />

          <CalcomCalculator 
            onPlanSelect={handleCalcomPlanSelect}
          />

          <TwilioCalculator 
            onRateSelect={handleTwilioRateSelect}
          />

          <div className="space-y-2">
            <Label htmlFor="margin">Margin (%)</Label>
            <Input
              id="margin"
              type="number"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              min="0"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Technologies and Set Costs</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technologies.map((tech) => (
                <div key={tech.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={tech.id}
                      checked={tech.isSelected}
                      onCheckedChange={() => handleTechnologyToggle(tech.id)}
                    />
                    <Label htmlFor={tech.id}>{tech.name}</Label>
                  </div>
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={tech.costPerMinute}
                      onChange={(e) => handleCostUpdate(tech.id, e.target.value)}
                      step="0.01"
                      min="0"
                      placeholder="Cost per minute"
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button onClick={calculateCost} className="bg-primary">
              <CalculatorIcon className="mr-2 h-4 w-4" />
              Calculate
            </Button>
            {totalCost && (
              <Button onClick={exportPDF} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            )}
          </div>

          {totalCost && (
            <div className="mt-6 p-4 bg-secondary rounded-lg animate-fadeIn">
              <h3 className="text-xl font-heading font-semibold mb-2">Results</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Base cost per minute: ${(totalCost / totalMinutes / (1 + margin / 100)).toFixed(4)}
                </p>
                {selectedMakePlan && (
                  <p className="text-gray-700">
                    Make.com Plan: {selectedMakePlan.name} (${selectedMakePlan.monthlyPrice}/month)
                  </p>
                )}
                {selectedSynthflowPlan && (
                  <p className="text-gray-700">
                    Synthflow Plan: {selectedSynthflowPlan.name} (${synthflowBillingType === 'monthly' ? selectedSynthflowPlan.monthlyPrice : selectedSynthflowPlan.yearlyPrice}/month)
                  </p>
                )}
                {selectedCalcomPlan && (
                  <p className="text-gray-700">
                    Cal.com Plan: {selectedCalcomPlan.name} ({calcomUsers} users) - ${selectedCalcomPlan.basePrice + (selectedCalcomPlan.allowsTeam ? (calcomUsers - 1) * selectedCalcomPlan.pricePerUser : 0)}/month
                  </p>
                )}
                <p className="text-gray-700">
                  Cost per minute with margin: ${(totalCost / totalMinutes).toFixed(4)}
                </p>
                <p className="text-xl font-bold text-primary">
                  Total Cost: ${totalCost.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
