import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

const DEFAULT_TECHNOLOGIES = [
  { id: "make", name: "Make.com", isSelected: true, costPerMinute: 0.001 },
  { id: "synthflow", name: "Synthflow", isSelected: true, costPerMinute: 0.002 },
  { id: "calcom", name: "Cal.com", isSelected: true, costPerMinute: 0.003 },
  { id: "twilio", name: "Twilio", isSelected: true, costPerMinute: 0.004 },
  { id: "vapi", name: "Vapi", isSelected: true, costPerMinute: 0.005 },
];

export function TechnologyParameters({ 
  technologies: propTechnologies, 
  onTechnologyChange,
  onVisibilityChange 
}: TechnologyParametersProps) {
  const { toast } = useToast();
  const [technologies, setTechnologies] = useState<Technology[]>(propTechnologies || DEFAULT_TECHNOLOGIES);

  useEffect(() => {
    // Initialize from localStorage or props
    const storedTechs = localStorage.getItem('technologies');
    if (storedTechs) {
      try {
        const parsedTechs = JSON.parse(storedTechs);
        setTechnologies(parsedTechs);
        onTechnologyChange(parsedTechs);
      } catch (error) {
        console.error('Error parsing stored technologies:', error);
        setTechnologies(DEFAULT_TECHNOLOGIES);
      }
    } else if (propTechnologies && propTechnologies.length > 0) {
      setTechnologies(propTechnologies);
    } else {
      setTechnologies(DEFAULT_TECHNOLOGIES);
    }
  }, []);

  const handleToggle = (id: string) => {
    const updatedTechs = technologies.map(tech =>
      tech.id === id ? { ...tech, isSelected: !tech.isSelected } : tech
    );
    setTechnologies(updatedTechs);
    onTechnologyChange(updatedTechs);
    onVisibilityChange(id, !technologies.find(t => t.id === id)?.isSelected);
    localStorage.setItem('technologies', JSON.stringify(updatedTechs));
  };

  const handleCostChange = (id: string, cost: number) => {
    const updatedTechs = technologies.map(tech =>
      tech.id === id ? { ...tech, costPerMinute: cost } : tech
    );
    setTechnologies(updatedTechs);
    onTechnologyChange(updatedTechs);
    localStorage.setItem('technologies', JSON.stringify(updatedTechs));
  };

  useEffect(() => {
    const handleTechnologiesUpdate = (event: Event) => {
      if (event instanceof CustomEvent) {
        const updatedTechs = event.detail;
        setTechnologies(updatedTechs);
        onTechnologyChange(updatedTechs);
      }
    };

    window.addEventListener('technologiesUpdated', handleTechnologiesUpdate);
    return () => {
      window.removeEventListener('technologiesUpdated', handleTechnologiesUpdate);
    };
  }, [onTechnologyChange]);

  if (!technologies || technologies.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Technology Parameters</h3>
        <p className="text-muted-foreground mt-2">No technologies available</p>
      </Card>
    );
  }

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
              {PRICING_LINKS[tech.id as keyof typeof PRICING_LINKS] && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="animate-pulse hover:animate-none bg-primary/10 hover:bg-primary/20 text-primary font-semibold"
                  onClick={() => window.open(PRICING_LINKS[tech.id as keyof typeof PRICING_LINKS], '_blank')}
                >
                  View Pricing <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            {tech.isSelected && (
              <div className="ml-14">
                <Input
                  type="number"
                  value={tech.costPerMinute}
                  onChange={(e) => handleCostChange(tech.id, Number(e.target.value))}
                  step="0.001"
                  min="0"
                  className="w-32"
                  readOnly={tech.id === 'calcom' || tech.id === 'synthflow'}
                />
                {(tech.id === 'calcom' || tech.id === 'synthflow') && (
                  <p className="text-sm text-muted-foreground mt-1">
                    This value is automatically calculated from {tech.id === 'calcom' ? 'Cal.com' : 'Synthflow'} plan settings
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