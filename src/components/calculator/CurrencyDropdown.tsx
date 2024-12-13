import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCalculatorStateContext } from "./CalculatorStateContext";

export function CurrencyDropdown() {
  const { currency, setCurrency } = useCalculatorStateContext();
  
  return (
    <div className="w-[180px]">
      <Select value={currency} onValueChange={(value: 'USD' | 'EUR') => setCurrency(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD ($)</SelectItem>
          <SelectItem value="EUR">EUR (€)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}