import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Calculator as CalculatorIcon, Download, Eye } from "lucide-react";
import { MakeCalculator } from "./MakeCalculator";
import { SynthflowCalculator } from "./SynthflowCalculator";
import { CalcomCalculator } from "./CalcomCalculator";
import { TwilioCalculator } from "./TwilioCalculator";
import { AgencyClientInfo, AgencyInfo, ClientInfo } from "./AgencyClientInfo";
import { ColorPicker } from "./ColorPicker";
import { InvoicePreview } from "./InvoicePreview";
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
  const [taxRate, setTaxRate] = useState<number>(20);
  const [themeColor, setThemeColor] = useState<string>("#2563eb");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  
  const [agencyInfo, setAgencyInfo] = useState<AgencyInfo>({
    name: "",
    phone: "",
    address: "",
    email: "",
    website: "",
  });

  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: "",
    address: "",
    tvaNumber: "",
  });

  const [selectedMakePlan, setSelectedMakePlan] = useState<MakePlan | null>(null);
  const [selectedSynthflowPlan, setSelectedSynthflowPlan] = useState<SynthflowPlan | null>(null);
  const [selectedCalcomPlan, setSelectedCalcomPlan] = useState<CalcomPlan | null>(null);
  const [selectedTwilioRate, setSelectedTwilioRate] = useState<TwilioSelection | null>(null);
  
  const [totalCost, setTotalCost] = useState<number | null>(null);

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
    
    const makePlanCostPerMonth = selectedMakePlan ? selectedMakePlan.monthlyPrice : 0;
    
    const calcomCostPerMonth = selectedCalcomPlan 
      ? selectedCalcomPlan.basePrice + (selectedCalcomPlan.allowsTeam ? (calcomUsers - 1) * selectedCalcomPlan.pricePerUser : 0)
      : 0;
    
    const finalCost = (totalBaseCost + makePlanCostPerMonth + calcomCostPerMonth) * (1 + margin / 100);
    
    setTotalCost(finalCost);
  };

  const handlePreview = () => {
    if (!totalCost) {
      toast({
        title: "Error",
        description: "Please calculate the cost first",
        variant: "destructive",
      });
      return;
    }
    setShowPreview(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn">
      <AgencyClientInfo
        agencyInfo={agencyInfo}
        clientInfo={clientInfo}
        onAgencyInfoChange={setAgencyInfo}
        onClientInfoChange={setClientInfo}
      />

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
            <Label htmlFor="tax">Tax Rate (%)</Label>
            <Input
              id="tax"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              min="0"
              max="100"
            />
          </div>

          <ColorPicker
            selectedColor={themeColor}
            onColorChange={setThemeColor}
          />

          <div className="flex justify-end space-x-4">
            <Button onClick={calculateCost} className="bg-primary">
              <CalculatorIcon className="mr-2 h-4 w-4" />
              Calculate
            </Button>
            {totalCost && (
              <>
                <Button onClick={handlePreview} variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button onClick={exportPDF} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </>
            )}
          </div>

          {showPreview && totalCost && (
            <InvoicePreview
              agencyInfo={agencyInfo}
              clientInfo={clientInfo}
              totalMinutes={totalMinutes}
              totalCost={totalCost}
              taxRate={taxRate}
              themeColor={themeColor}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
