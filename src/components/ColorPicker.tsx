import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const colorOptions = [
  { name: "Blue", value: "#2563eb" },
  { name: "Purple", value: "#9b87f5" },
  { name: "Green", value: "#22c55e" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Pink", value: "#ec4899" },
];

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="space-y-4">
      <Label>Select Theme Color</Label>
      <RadioGroup
        value={selectedColor}
        onValueChange={onColorChange}
        className="grid grid-cols-3 gap-4"
      >
        {colorOptions.map((color) => (
          <div
            key={color.value}
            className="flex items-center space-x-2"
          >
            <RadioGroupItem
              value={color.value}
              id={color.value}
              className="peer sr-only"
            />
            <Label
              htmlFor={color.value}
              className="flex items-center space-x-2 rounded-md border-2 border-muted p-4 hover:border-accent cursor-pointer peer-data-[state=checked]:border-primary"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color.value }}
              />
              <span>{color.name}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}