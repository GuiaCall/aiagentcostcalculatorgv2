import { CurrencyDropdown } from "../calculator/CurrencyDropdown";
import { ThemeToggle } from "../theme/ThemeToggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Calculator</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <CurrencyDropdown />
        </div>
      </div>
    </nav>
  );
}