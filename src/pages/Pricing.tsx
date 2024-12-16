import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Basic voice cost calculation",
        "PDF export",
        "Single currency support",
        "Basic invoice management",
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$29/month",
      features: [
        "All Basic features",
        "Multi-currency support",
        "Advanced analytics",
        "Custom branding",
        "Priority support",
        "Team collaboration"
      ],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "All Pro features",
        "Custom integration",
        "Dedicated support",
        "SLA guarantee",
        "Custom reporting",
        "Volume discounts"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`p-6 flex flex-col ${
                plan.highlighted 
                  ? 'border-primary shadow-lg scale-105' 
                  : ''
              }`}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold">{plan.price}</p>
                {plan.price !== "Custom" && (
                  <p className="text-muted-foreground">per month</p>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => navigate('/calculator')}
                variant={plan.highlighted ? "default" : "outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}