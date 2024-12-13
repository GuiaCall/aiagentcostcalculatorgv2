import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface Technology {
  id: string;
  name: string;
  isSelected: boolean;
  costPerMinute: number;
}

interface TechnologyParametersProps {
  technologies: Technology[];
  onTechnologyChange: (technologies: Technology[]) => void;
  onVisibilityChange: (techId: string, isVisible: boolean) => void;
}

const PRICING_LINKS = {
  make: 'https://www.make.com/en/pricing',
  synthflow: 'https://www.synthflow.com/pricing',
  vapi: 'https://rb.gy/m1p0f7'
};

export function TechnologyParameters({ 
  technologies, 
  onTechnologyChange,
  onVisibilityChange 
}: TechnologyParametersProps) {
  const handleToggle = (id: string) => {
    const updatedTechs = technologies.map(tech =>
      tech.id === id ? { ...tech, isSelected: !tech.isSelected } : tech
    );
    onTechnologyChange(updatedTechs);
    onVisibilityChange(id, !technologies.find(t => t.id === id)?.isSelected);
  };

  const handleCostChange = (id: string, cost: number) => {
    const margin = 0.2; // 20% margin
    const finalCost = cost * (1 + margin);
    const updatedTechs = technologies.map(tech =>
      tech.id === id ? { ...tech, costPerMinute: finalCost } : tech
    );
    onTechnologyChange(updatedTechs);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTechs = localStorage.getItem('technologies');
      if (storedTechs) {
        onTechnologyChange(JSON.parse(storedTechs));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [onTechnologyChange]);

  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technology Parameters</h3>
      <div className="space-y-6">
        {technologies.map((tech) => (
          <div key={tech.id} className="space-y-3 border-b pb-4 last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Switch
                  checked={tech.isSelected}
                  onCheckedChange={() => handleToggle(tech.id)}
                  id={`toggle-${tech.id}`}
                />
                <Label htmlFor={`toggle-${tech.id}`} className="text-base font-medium">
                  {tech.name}
                </Label>
              </div>
              {PRICING_LINKS[tech.id as keyof typeof PRICING_LINKS] && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-primary/10 hover:bg-primary/20 text-primary font-semibold"
                  onClick={() => window.open(PRICING_LINKS[tech.id as keyof typeof PRICING_LINKS], '_blank')}
                >
                  View Pricing <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            {tech.isSelected && (
              <div className="ml-14">
                <Label htmlFor={`cost-${tech.id}`} className="block text-sm text-muted-foreground mb-2">
                  Cost per minute ($)
                </Label>
                <Input
                  id={`cost-${tech.id}`}
                  type="number"
                  value={tech.costPerMinute}
                  onChange={(e) => handleCostChange(tech.id, Number(e.target.value))}
                  step="0.001"
                  min="0"
                  className="w-32"
                  readOnly={tech.id === 'calcom' || tech.id === 'synthflow'}
                />
                {tech.id === 'calcom' && (
                  <p className="text-sm text-muted-foreground mt-1">
                    This value is automatically calculated from Cal.com plan settings
                  </p>
                )}
                {tech.id === 'synthflow' && (
                  <p className="text-sm text-muted-foreground mt-1">
                    This value is automatically calculated from Synthflow plan settings
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}