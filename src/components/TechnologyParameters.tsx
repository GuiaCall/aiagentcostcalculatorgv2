import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";

export interface Technology {
  id: string;
  name: string;
  isSelected: boolean;
  costPerMinute: number;
}

export interface TechnologyParametersProps {
  technologies: Technology[];
  onTechnologyChange: (technologies: Technology[]) => void;
  onVisibilityChange: (id: string, isVisible: boolean) => void;
  currency?: string;
}

export function TechnologyParameters({ 
  technologies, 
  onTechnologyChange,
  onVisibilityChange,
  currency = 'USD'
}: TechnologyParametersProps) {
  const handleToggle = (id: string) => {
    const updatedTechs = technologies.map(tech =>
      tech.id === id ? { ...tech, isSelected: !tech.isSelected } : tech
    );
    onTechnologyChange(updatedTechs);
    onVisibilityChange(id, !technologies.find(t => t.id === id)?.isSelected);
  };

  const handleCostChange = (id: string, value: string) => {
    const numericValue = value === '' ? '' : parseFloat(value);
    
    const updatedTechs = technologies.map(tech =>
      tech.id === id ? { ...tech, costPerMinute: numericValue === '' ? 0 : numericValue } : tech
    );
    onTechnologyChange(updatedTechs);
  };

  useEffect(() => {
    const handleTechnologiesUpdate = (event: CustomEvent<Technology[]>) => {
      onTechnologyChange(event.detail);
    };

    window.addEventListener('technologiesUpdated', handleTechnologiesUpdate as EventListener);
    
    return () => {
      window.removeEventListener('technologiesUpdated', handleTechnologiesUpdate as EventListener);
    };
  }, [onTechnologyChange]);

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Technology Parameters</h3>
      <div className="space-y-4">
        {technologies.map((tech) => (
          <div key={tech.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Switch
                  checked={tech.isSelected}
                  onCheckedChange={() => handleToggle(tech.id)}
                  id={`toggle-${tech.id}`}
                />
                <Label htmlFor={`toggle-${tech.id}`} className="flex-1">
                  {tech.name}
                </Label>
              </div>
            </div>
            {tech.isSelected && (
              <div className="ml-14 flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {currency}
                </span>
                <Input
                  type="number"
                  value={tech.costPerMinute || ''}
                  onChange={(e) => handleCostChange(tech.id, e.target.value)}
                  step="0.001"
                  min="0"
                  className="w-32"
                  readOnly={tech.id === 'calcom'}
                />
                <span className="text-sm text-muted-foreground">
                  /minute
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}