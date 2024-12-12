import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Calculator as CalculatorIcon, Download, Eye } from "lucide-react";
import { MakeCalculator } from "./MakeCalculator";
import { SynthflowCalculator } from "./SynthflowCalculator";
import { CalcomCalculator } from "./CalcomCalculator";
import { TwilioCalculator } from "./TwilioCalculator";
import { AgencyClientInfo } from "./AgencyClientInfo";
import { ColorPicker } from "./ColorPicker";
import { InvoicePreview } from "./InvoicePreview";
import { TechnologyParameters } from "./TechnologyParameters";
import { InvoiceHistoryList } from "./InvoiceHistory";
import { CalculatorSettings } from "./CalculatorSettings";
import { MakePlan } from "@/types/make";
import { SynthflowPlan } from "@/types/synthflow";
import { CalcomPlan } from "@/types/calcom";
import { TwilioSelection } from "@/types/twilio";
import { AgencyInfo, ClientInfo, InvoiceHistory } from "@/types/invoice";
import jsPDF from "jspdf";
import { format } from "date-fns";
import html2canvas from "html2canvas";

const initialTechnologies = [
  { id: "make", name: "Make.com", isSelected: true, costPerMinute: 0.001 },
  { id: "synthflow", name: "Synthflow", isSelected: true, costPerMinute: 0.002 },
  { id: "calcom", name: "Cal.com", isSelected: true, costPerMinute: 0.003 },
  { id: "twilio", name: "Twilio", isSelected: true, costPerMinute: 0.004 },
  { id: "vapi", name: "Vapi", isSelected: true, costPerMinute: 0.005 },
];

export function Calculator() {
  const { toast } = useToast();
  const [callDuration, setCallDuration] = useState<number>(5);
  const [totalMinutes, setTotalMinutes] = useState<number>(1000);
  const [margin, setMargin] = useState<number>(20);
  const [taxRate, setTaxRate] = useState<number>(20);
  const [themeColor, setThemeColor] = useState<string>("#2563eb");
  const [showPreview, setShowPreview] = useState<boolean>(false);
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
    contactPerson: {
      name: "",
      phone: ""
    }
  });

  const [selectedMakePlan, setSelectedMakePlan] = useState<MakePlan | null>(null);
  const [selectedSynthflowPlan, setSelectedSynthflowPlan] = useState<SynthflowPlan | null>(null);
  const [selectedCalcomPlan, setSelectedCalcomPlan] = useState<CalcomPlan | null>(null);
  const [selectedTwilioRate, setSelectedTwilioRate] = useState<TwilioSelection | null>(null);
  
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [recalculatedId, setRecalculatedId] = useState<string | undefined>();

  const handleSettingChange = (setting: string, value: number) => {
    switch (setting) {
      case 'callDuration':
        setCallDuration(value);
        break;
      case 'totalMinutes':
        setTotalMinutes(value);
        break;
      case 'margin':
        setMargin(value);
        break;
      case 'taxRate':
        setTaxRate(value);
        break;
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
    
    const makePlanCostPerMonth = selectedMakePlan ? selectedMakePlan.monthlyPrice : 0;
    const finalCost = (totalBaseCost + makePlanCostPerMonth) * (1 + margin / 100);
    
    setTotalCost(finalCost);
  };

  const exportPDF = async (invoice?: InvoiceHistory) => {
    if (!totalCost && !invoice) {
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

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      imgWidth,
      Math.min(imgHeight, pageHeight)
    );

    if (!invoice) {
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

      const updatedInvoices = [...invoices, newInvoice];
      setInvoices(updatedInvoices);
      pdf.save(`invoice-${invoiceNumber}.pdf`);
    } else {
      pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
    }
  };

  const handleEdit = (invoice: InvoiceHistory) => {
    if (editingId === invoice.id) {
      calculateCost();
      setRecalculatedId(invoice.id);
    } else {
      setAgencyInfo(invoice.agencyInfo);
      setClientInfo(invoice.clientInfo);
      setTaxRate(invoice.taxRate);
      setMargin(invoice.margin);
      setTotalCost(invoice.totalAmount);
      setShowPreview(true);
      setEditingId(invoice.id);
    }
  };

  const handleSave = (invoice: InvoiceHistory) => {
    const updatedInvoices = invoices.map(inv => 
      inv.id === invoice.id 
        ? { ...inv, totalAmount: totalCost, taxRate, margin }
        : inv
    );
    setInvoices(updatedInvoices);
    setEditingId(undefined);
    setRecalculatedId(undefined);
    toast({
      title: "Success",
      description: "Invoice updated successfully",
    });
  };

  // Load invoice history from localStorage on component mount
  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoiceHistory');
    if (savedInvoices) {
      const parsedInvoices = JSON.parse(savedInvoices);
      const processedInvoices = parsedInvoices.map((inv: any) => ({
        ...inv,
        date: new Date(inv.date)
      }));
      setInvoices(processedInvoices);
    }
  }, []);

  // Save invoices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('invoiceHistory', JSON.stringify(invoices));
  }, [invoices]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn">
      <AgencyClientInfo
        agencyInfo={agencyInfo}
        clientInfo={clientInfo}
        onAgencyInfoChange={setAgencyInfo}
        onClientInfoChange={setClientInfo}
      />

      <CalculatorSettings
        callDuration={callDuration}
        totalMinutes={totalMinutes}
        margin={margin}
        taxRate={taxRate}
        onSettingChange={handleSettingChange}
      />

      <TechnologyParameters
        technologies={technologies}
        onTechnologyChange={setTechnologies}
        onVisibilityChange={() => {}}
      />

      {technologies.find(t => t.id === 'make')?.isSelected && (
        <MakeCalculator 
          totalMinutes={totalMinutes}
          averageCallDuration={callDuration}
          onPlanSelect={setSelectedMakePlan}
          onCostPerMinuteChange={(cost) => {
            setTechnologies(techs => 
              techs.map(tech => 
                tech.id === 'make' ? { ...tech, costPerMinute: cost } : tech
              )
            );
          }}
        />
      )}

      {technologies.find(t => t.id === 'synthflow')?.isSelected && (
        <SynthflowCalculator 
          totalMinutes={totalMinutes}
          onPlanSelect={setSelectedSynthflowPlan}
        />
      )}

      {technologies.find(t => t.id === 'calcom')?.isSelected && (
        <CalcomCalculator 
          onPlanSelect={setSelectedCalcomPlan}
        />
      )}

      {technologies.find(t => t.id === 'twilio')?.isSelected && (
        <TwilioCalculator 
          onRateSelect={setSelectedTwilioRate}
        />
      )}

      <div className="flex justify-end space-x-4">
        <Button onClick={calculateCost} className="bg-primary">
          <CalculatorIcon className="mr-2 h-4 w-4" />
          Calculate
        </Button>
        {totalCost && (
          <>
            <Button onClick={() => setShowPreview(true)} variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={() => exportPDF()} variant="outline">
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
            onColorChange={setThemeColor}
            showColorPicker={true}
          />
        </div>
      )}

      <InvoiceHistoryList
        invoices={invoices}
        onEdit={handleEdit}
        onDelete={(id) => setInvoices(invoices.filter(inv => inv.id !== id))}
        onPrint={exportPDF}
        onSave={handleSave}
        editingId={editingId}
        recalculatedId={recalculatedId}
      />
    </div>
  );
}
