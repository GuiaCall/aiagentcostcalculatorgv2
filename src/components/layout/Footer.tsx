export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full z-50 bg-white/80 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} AI Voice Agent Calculator. All rights reserved.
        </p>
      </div>
    </footer>
  );
}