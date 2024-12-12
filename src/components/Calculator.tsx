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
import { AgencyClientInfo, AgencyInfo } from "./AgencyClientInfo";
import { ColorPicker } from "./ColorPicker";
import { InvoicePreview } from "./InvoicePreview";
import { TechnologyParameters } from "./TechnologyParameters";
import { InvoiceHistoryList } from "./InvoiceHistory";
import { MakePlan } from "@/types/make";
import { SynthflowPlan } from "@/types/synthflow";
import { CalcomPlan } from "@/types/calcom";
import { TwilioSelection } from "@/types/twilio";
import { ClientInfo, InvoiceHistory } from "@/types/invoice";
import jsPDF from "jspdf";
import { format } from "date-fns";
import html2canvas from "html2canvas";

const initialTechnologies = [
  { id: "make", name: "Make.com", isSelected: true, costPerMinute: 0.001 },
  { id: "synthflow", name: "Synthflow", isSelected: true, costPerMinute: 0.002 },
  { id: "calcom", name: "Cal.com", isSelected: true, costPerMinute: 0.003 },
  { id: "twilio", name: "Twilio", isSelected: true, costPerMinute: 0.004 },
];

export function Calculator() {
  const { toast } = useToast();
  const [callDuration, setCallDuration] = useState<number>(5);
  const [totalMinutes, setTotalMinutes] = useState<number>(1000);
  const [margin, setMargin] = useState<number>(20);
  const [taxRate, setTaxRate] = useState<number>(20);
  const [themeColor, setThemeColor] = useState<string>("#2563eb");
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [calcomUsers, setCalcomUsers] = useState<number>(1);
  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [invoices, setInvoices] = useState<InvoiceHistory[]>([]);
  
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
    contactPerson: { name: "", phone: "" },
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

  const exportPDF = async () => {
    if (!totalCost) {
      toast({
        title: "Error",
        description: "Please calculate the cost first",
        variant: "destructive",
      });
      return;
    }

    const pdf = new jsPDF();
    const element = document.getElementById('invoice-preview');
    if (!element) return;

    const invoiceNumber = `INV-${format(new Date(), 'yyyyMMdd')}-${invoices.length + 1}`;
    
    const newInvoice: InvoiceHistory = {
      id: crypto.randomUUID(),
      invoiceNumber,
      date: new Date(),
      clientInfo,
      agencyInfo,
      totalAmount: totalCost,
      taxRate,
      margin
    };
    setInvoices([...invoices, newInvoice]);

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 277);
    pdf.save(`invoice-${invoiceNumber}.pdf`);
  };

  const handleEdit = (invoice: InvoiceHistory) => {
    setAgencyInfo(invoice.agencyInfo);
    setClientInfo(invoice.clientInfo);
    setTaxRate(invoice.taxRate);
    setMargin(invoice.margin);
    setTotalCost(invoice.totalAmount);
    setShowPreview(true);
  };

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
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
          <TechnologyParameters
            technologies={technologies}
            onTechnologyChange={setTechnologies}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <MakeCalculator 
            totalMinutes={totalMinutes}
            averageCallDuration={callDuration}
            onPlanSelect={setSelectedMakePlan}
          />

          <SynthflowCalculator 
            totalMinutes={totalMinutes}
            onPlanSelect={setSelectedSynthflowPlan}
          />

          <CalcomCalculator 
            onPlanSelect={setSelectedCalcomPlan}
          />

          <TwilioCalculator 
            onRateSelect={setSelectedTwilioRate}
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
            <div id="invoice-preview">
              <InvoicePreview
                agencyInfo={agencyInfo}
                clientInfo={clientInfo}
                totalMinutes={totalMinutes}
                totalCost={totalCost}
                taxRate={taxRate}
                themeColor={themeColor}
              />
            </div>
          )}
        </div>
      </Card>

      <InvoiceHistoryList
        invoices={invoices}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPrint={exportPDF}
      />
    </div>
  );
}
