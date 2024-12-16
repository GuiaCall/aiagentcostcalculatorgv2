import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/pricing');
      }
    };
    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          AI Voice Cost Calculator
        </h1>
        
        <p className="text-xl mb-8 max-w-2xl text-foreground/80">
          Optimize your voice technology costs with our intelligent calculator. 
          Get precise estimates for Make.com, Synthflow, Cal.com, and more.
        </p>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            className="px-8 py-6 text-lg"
          >
            Get Started
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/pricing')}
            className="px-8 py-6 text-lg"
          >
            View Pricing
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-card rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Accurate Estimates</h3>
            <p className="text-muted-foreground">Get precise cost calculations for your voice technology stack</p>
          </div>
          
          <div className="p-6 bg-card rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Multiple Providers</h3>
            <p className="text-muted-foreground">Compare costs across different voice technology providers</p>
          </div>
          
          <div className="p-6 bg-card rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Export & Share</h3>
            <p className="text-muted-foreground">Generate professional PDF reports for your estimates</p>
          </div>
        </div>
      </div>
    </div>
  );
}