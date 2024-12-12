import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Technology {
  id: string;
  name: string;
  isSelected: boolean;
  costPerMinute: number;
}

interface TechnologyParametersProps {
  technologies: Technology[];
  onTechnologyChange: (technologies: Technology[]) => void;
}

export function TechnologyParameters({ technologies, onTechnologyChange }: TechnologyParametersProps) {
  const handleToggle = (id: string) => {
    const updatedTechs = technologies.map(tech =>
      tech.id === id ? { ...tech, isSelected: !tech.isSelected } : tech
    );
    onTechnologyChange(updatedTechs);
  };

  const handleCostChange = (id: string, cost: number) => {
    const updatedTechs = technologies.map(tech =>
      tech.id === id ? { ...tech, costPerMinute: cost } : tech
    );
    onTechnologyChange(updatedTechs);
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Technology Parameters</h3>
      <div className="space-y-4">
        {technologies.map((tech) => (
          <div key={tech.id} className="flex items-center space-x-4">
            <Switch
              checked={tech.isSelected}
              onCheckedChange={() => handleToggle(tech.id)}
              id={`toggle-${tech.id}`}
            />
            <Label htmlFor={`toggle-${tech.id}`} className="flex-1">
              {tech.name}
            </Label>
            <div className="w-32">
              <Input
                type="number"
                value={tech.costPerMinute}
                onChange={(e) => handleCostChange(tech.id, Number(e.target.value))}
                step="0.001"
                min="0"
                disabled={!tech.isSelected}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}