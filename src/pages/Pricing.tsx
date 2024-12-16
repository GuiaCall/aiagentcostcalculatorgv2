import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CalculatorStateProvider } from "@/components/calculator/CalculatorStateContext";
import { CurrencyDropdown } from "@/components/calculator/CurrencyDropdown";
import { ColorPicker } from "@/components/ColorPicker";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PricingTier = ({ 
  name, 
  price, 
  features, 
  isPopular,
  themeColor 
}: { 
  name: string; 
  price: number; 
  features: string[]; 
  isPopular?: boolean;
  themeColor: string;
}) => (
  <div className={`rounded-lg p-8 ${isPopular ? `bg-[${themeColor}] text-primary-foreground ring-2 ring-[${themeColor}]` : 'bg-card'}`}>
    <h3 className="text-2xl font-bold">{name}</h3>
    <div className="mt-4 flex items-baseline">
      <span className="text-4xl font-bold">${price}</span>
      <span className="ml-1 text-sm font-medium">/month</span>
    </div>
    <ul className="mt-6 space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="h-5 w-5 flex-shrink-0" />
          <span className="ml-3">{feature}</span>
        </li>
      ))}
    </ul>
    <Button 
      className="mt-8 w-full" 
      variant={isPopular ? "secondary" : "default"}
      style={{ backgroundColor: isPopular ? themeColor : undefined }}
    >
      Get Started
    </Button>
  </div>
);

export default function Pricing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState('#2563eb');

  const handleColorChange = async (color: string) => {
    setSelectedColor(color);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .update({ 
          theme_color: color,
          invoice_preview_color: color,
          client_info_color: color,
          invoice_details_color: color,
          total_color: color,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast({
        title: "Theme updated",
        description: "Your color preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update theme color. Please try again.",
        variant: "destructive",
      });
    }
  };

  const pricingTiers = [
    {
      name: "Starter",
      price: 29,
      features: [
        "Up to 1,000 minutes",
        "Basic support",
        "1 phone number",
        "Standard analytics"
      ]
    },
    {
      name: "Professional",
      price: 99,
      features: [
        "Up to 5,000 minutes",
        "Priority support",
        "5 phone numbers",
        "Advanced analytics",
        "Custom integrations"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: 299,
      features: [
        "Unlimited minutes",
        "24/7 support",
        "Unlimited phone numbers",
        "Custom analytics",
        "API access",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <CalculatorStateProvider>
      <div className="py-24 px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="flex justify-between items-center mb-8">
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />
            <CurrencyDropdown />
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the perfect plan for your business needs
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingTier 
              key={tier.name} 
              {...tier} 
              themeColor={selectedColor}
            />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button variant="outline" onClick={() => navigate("/calculator")}>
            Try the Calculator
          </Button>
        </div>
      </div>
    </CalculatorStateProvider>
  );
}