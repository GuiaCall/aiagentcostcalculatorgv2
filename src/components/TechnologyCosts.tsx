import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Technology {
  id: string;
  name: string;
  isSelected: boolean;
  costPerMinute: number;
}

interface TechnologyCostsProps {
  technologies: Technology[];
  onTechnologyChange: (technologies: Technology[]) => void;
}

export function TechnologyCosts({ technologies, onTechnologyChange }: TechnologyCostsProps) {
  const handleCostChange = (id: string, cost: number) => {
    const updatedTechs = technologies.map(tech =>
      tech.id === id ? { ...tech, costPerMinute: cost } : tech
    );
    onTechnologyChange(updatedTechs);
  };

  const PRICING_LINKS: Record<string, string> = {
    make: 'https://www.make.com/en/pricing',
    synthflow: 'https://www.synthflow.com/pricing',
    vapi: 'https://rb.gy/m1p0f7'
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-xl font-semibold">Technology Costs</h3>
      <div className="space-y-4">
        {technologies.map((tech) => (
          <div key={tech.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`cost-${tech.id}`}>{tech.name} Cost per Minute ($)</Label>
              {PRICING_LINKS[tech.id] && (
                <Button 
                  variant="outline"
                  size="sm"
                  className="animate-pulse hover:animate-none bg-primary/10 hover:bg-primary/20 text-primary font-semibold"
                  onClick={() => window.open(PRICING_LINKS[tech.id], '_blank')}
                >
                  View {tech.name} Pricing <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            <Input
              id={`cost-${tech.id}`}
              type="number"
              value={tech.costPerMinute}
              onChange={(e) => handleCostChange(tech.id, Number(e.target.value))}
              step="0.001"
              min="0"
              className="w-32"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}