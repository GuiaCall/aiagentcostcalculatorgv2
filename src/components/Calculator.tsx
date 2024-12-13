import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { MakeCalculator } from "./MakeCalculator";
import { SynthflowCalculator } from "./SynthflowCalculator";
import { CalcomCalculator } from "./CalcomCalculator";
import { TwilioCalculator } from "./TwilioCalculator";
import { TechnologyParameters } from "./TechnologyParameters";
import { InvoiceHistoryList } from "./InvoiceHistory";
import { CalculatorSettings } from "./CalculatorSettings";
import { CalculatorHeader } from "./calculator/CalculatorHeader";
import { CalculatorActions } from "./calculator/CalculatorActions";
import { CalculatorPreview } from "./calculator/CalculatorPreview";
import { useCalculatorState } from "./calculator/CalculatorState";
import { useCalculatorLogic } from "./calculator/CalculatorLogic";
import { calculateSetupCost } from "@/utils/setupCostCalculations";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import { InvoiceHistory } from "@/types/invoice";

const EXCHANGE_RATE = 0.85;

export function Calculator() {
  const { toast } = useToast();
  const state = useCalculatorState();
  const logic = useCalculatorLogic({ ...state, currency: state.currency });

  const handleSettingChange = (setting: string, value: number) => {
    switch (setting) {
      case 'callDuration':
        state.setCallDuration(value);
        break;
      case 'totalMinutes':
        state.setTotalMinutes(value);
        break;
      case 'margin':
        state.setMargin(value);
        break;
      case 'taxRate':
        state.setTaxRate(value);
        break;
    }
  };

  const calculateTotalSetupCost = () => {
    const setupCost = calculateSetupCost(
      state.technologies,
      state.selectedMakePlan,
      state.selectedSynthflowPlan,
      state.selectedCalcomPlan,
      state.numberOfUsers,
      state.selectedTwilioRate,
      state.margin
    );
    state.setSetupCost(setupCost);
    return setupCost;
  };

  const exportPDF = async (invoice?: InvoiceHistory) => {
    if (!state.totalCost && !invoice) {
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

    const imgWidth = 210;
    const pageHeight = 297;
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
      const invoiceNumber = `INV-${format(new Date(), 'yyyyMMdd')}-${state.invoices.length + 1}`;
      const newInvoice = {
        id: crypto.randomUUID(),
        invoiceNumber,
        date: new Date(),
        clientInfo: state.clientInfo,
        agencyInfo: state.agencyInfo,
        totalAmount: state.totalCost,
        taxRate: state.taxRate,
        margin: state.margin
      };

      const updatedInvoices = [...state.invoices, newInvoice];
      state.setInvoices(updatedInvoices);
      pdf.save(`invoice-${invoiceNumber}.pdf`);
    } else {
      pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
    }
  };

  useEffect(() => {
    const savedInvoices = localStorage.getItem('invoiceHistory');
    if (savedInvoices) {
      const parsedInvoices = JSON.parse(savedInvoices);
      const processedInvoices = parsedInvoices.map((inv: any) => ({
        ...inv,
        date: new Date(inv.date)
      }));
      state.setInvoices(processedInvoices);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('invoiceHistory', JSON.stringify(state.invoices));
  }, [state.invoices]);

  const convertCurrency = (amount: number) => {
    return state.currency === 'EUR' ? amount * EXCHANGE_RATE : amount;
  };

  const handleCalcomPlanSelect = (plan: CalcomPlan, users: number) => {
    state.setSelectedCalcomPlan(plan);
    state.setNumberOfUsers(users);
    if (plan.costPerMinute !== undefined) {
      state.setTechnologies((techs) =>
        techs.map((tech) =>
          tech.id === "calcom" ? { ...tech, costPerMinute: plan.costPerMinute || 0 } : tech
        )
      );
    }
  };

  useEffect(() => {
    calculateTotalSetupCost();
  }, [
    state.technologies,
    state.selectedMakePlan,
    state.selectedSynthflowPlan,
    state.selectedCalcomPlan,
    state.numberOfUsers,
    state.selectedTwilioRate,
    state.margin
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn">
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          checked={state.currency === 'EUR'}
          onCheckedChange={(checked) => state.setCurrency(checked ? 'EUR' : 'USD')}
          id="currency-toggle"
        />
        <Label htmlFor="currency-toggle">
          Display in {state.currency === 'USD' ? 'EUR' : 'USD'}
        </Label>
      </div>

      <CalculatorHeader
        agencyInfo={state.agencyInfo}
        clientInfo={state.clientInfo}
        themeColor={state.themeColor}
        onAgencyInfoChange={state.setAgencyInfo}
        onClientInfoChange={state.setClientInfo}
        onColorChange={state.setThemeColor}
      />

      <CalculatorSettings
        callDuration={state.callDuration}
        totalMinutes={state.totalMinutes}
        margin={state.margin}
        taxRate={state.taxRate}
        onSettingChange={handleSettingChange}
      />

      <TechnologyParameters
        technologies={state.technologies}
        onTechnologyChange={state.setTechnologies}
        onVisibilityChange={() => {}}
      />

      {state.technologies.find((t) => t.id === "make")?.isSelected && (
        <MakeCalculator
          totalMinutes={state.totalMinutes}
          averageCallDuration={state.callDuration}
          onPlanSelect={state.setSelectedMakePlan}
          onCostPerMinuteChange={(cost) => {
            state.setTechnologies((techs) =>
              techs.map((tech) =>
                tech.id === "make" ? { ...tech, costPerMinute: cost } : tech
              )
            );
          }}
        />
      )}

      {state.technologies.find((t) => t.id === "synthflow")?.isSelected && (
        <SynthflowCalculator
          totalMinutes={state.totalMinutes}
          onPlanSelect={state.setSelectedSynthflowPlan}
        />
      )}

      {state.technologies.find((t) => t.id === "calcom")?.isSelected && (
        <CalcomCalculator 
          onPlanSelect={handleCalcomPlanSelect}
          totalMinutes={state.totalMinutes}
        />
      )}

      {state.technologies.find((t) => t.id === "twilio")?.isSelected && (
        <TwilioCalculator onRateSelect={logic.handleTwilioRateSelect} />
      )}

      <CalculatorActions
        onCalculate={logic.calculateCost}
        onPreviewToggle={() => state.setShowPreview(!state.showPreview)}
        onExportPDF={() => exportPDF()}
        totalCost={convertCurrency(state.totalCost || 0)}
        setupCost={convertCurrency(state.setupCost || 0)}
        currency={state.currency}
      />

      {state.showPreview && (
        <CalculatorPreview
          showPreview={state.showPreview}
          agencyInfo={state.agencyInfo}
          clientInfo={state.clientInfo}
          totalMinutes={state.totalMinutes}
          totalCost={convertCurrency(state.totalCost || 0)}
          setupCost={convertCurrency(state.setupCost || 0)}
          taxRate={state.taxRate}
          themeColor={state.themeColor}
          currency={state.currency}
        />
      )}

      <InvoiceHistoryList
        invoices={state.invoices}
        onEdit={(invoice) => logic.handleEdit(invoice, state.setEditingId, state.setRecalculatedId)}
        onDelete={(id) => state.setInvoices(state.invoices.filter((inv) => inv.id !== id))}
        onPrint={exportPDF}
        onSave={(invoice) => logic.handleSave(invoice, state.setEditingId, state.setRecalculatedId)}
        editingId={state.editingId}
        recalculatedId={state.recalculatedId}
        currency={state.currency}
      />
    </div>
  );
}
