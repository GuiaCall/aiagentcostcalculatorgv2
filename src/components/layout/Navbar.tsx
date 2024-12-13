import { CurrencyDropdown } from "../calculator/CurrencyDropdown";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold">AI Voice Agent Calculator</h1>
        <CurrencyDropdown />
      </div>
    </nav>
  );
}