import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <div className="flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-primary" />
          <Link to="/" className="font-bold text-xl">
            AI Agent Calculator
          </Link>
        </div>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/calculator")}
          >
            Calculator
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/pricing")}
          >
            Pricing
          </Button>
        </nav>
      </div>
    </header>
  );
}