import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <nav className="flex flex-col space-y-4 mt-8">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigation("/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigation("/calculator")}
          >
            Calculator
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => handleNavigation("/pricing")}
          >
            Pricing
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}