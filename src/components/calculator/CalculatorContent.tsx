import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TechnologyParameters } from "../TechnologyParameters";
import { InvoiceHistoryList } from "../InvoiceHistory";
import { CalculatorHeader } from "./CalculatorHeader";
import { CalculatorActions } from "./CalculatorActions";
import { CalculatorPreview } from "./CalculatorPreview";
import { useCalculatorLogic } from "./CalculatorLogic";
import { CalculatorSettings } from "../CalculatorSettings";
import { CurrencyToggle } from "./CurrencyToggle";
import { TechnologyCalculators } from "./TechnologyCalculators";
import { useCalculatorStateContext } from "./CalculatorStateContext";

export function CalculatorContent() {
  const { toast } = useToast();
  const state = useCalculatorStateContext();
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
    return state.currency === 'EUR' ? amount * 0.85 : amount;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-fadeIn">
      <CurrencyToggle />

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

      <TechnologyCalculators />

      <CalculatorActions
        onCalculate={logic.calculateCost}
        onPreviewToggle={() => state.setShowPreview(!state.showPreview)}
        onExportPDF={() => logic.exportPDF()}
        totalCost={convertCurrency(state.totalCost || 0)}
        setupCost={convertCurrency(state.setupCost || 0)}
        currency={state.currency}
        totalMinutes={state.totalMinutes}
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
        onPrint={logic.exportPDF}
        onSave={(invoice) => logic.handleSave(invoice, state.setEditingId, state.setRecalculatedId)}
        editingId={state.editingId}
        recalculatedId={state.recalculatedId}
        currency={state.currency}
      />
    </div>
  );
}