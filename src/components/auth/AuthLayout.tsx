import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export function AuthLayout({ children, mode }: { children: React.ReactNode; mode: 'login' | 'signup' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-6 animate-fadeIn">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">AI Agent Calculator</h1>
          </div>
          <p className="text-gray-600">
            {mode === 'login' 
              ? "Welcome back! Sign in to access your AI-powered calculator."
              : "Join us to start creating intelligent calculations today."}
          </p>
        </div>
        {children}
      </Card>
    </div>
  );
}