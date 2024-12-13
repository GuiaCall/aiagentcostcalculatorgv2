import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCalculatorStateContext } from "./CalculatorStateContext";

export function CurrencyToggle() {
  const { currency, setCurrency } = useCalculatorStateContext();
  
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Switch
        checked={currency === 'EUR'}
        onCheckedChange={(checked) => setCurrency(checked ? 'EUR' : 'USD')}
        id="currency-toggle"
      />
      <Label htmlFor="currency-toggle">
        Display in {currency === 'USD' ? 'EUR' : 'USD'}
      </Label>
    </div>
  );
}