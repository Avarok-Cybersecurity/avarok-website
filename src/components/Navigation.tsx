import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#6D52D8]/90 backdrop-blur-lg shadow-sm" : "bg-[#6D52D8]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16">
        <a href="/" className="flex items-center">
          <div className="h-16 w-[200px] bg-white flex items-center justify-center p-1">
            <img 
              src="/lovable-uploads/f3daa95e-1ba0-4727-8e80-ef4812bf21c2.png" 
              alt="Avarok Logo" 
              className="h-14 w-auto object-contain"
            />
          </div>
        </a>

        <div className="hidden md:flex items-center space-x-8 pr-8">
          <a href="#source" className="text-white/90 hover:text-white transition-colors">
            Source Code
          </a>
          <a href="#features" className="text-white/90 hover:text-white transition-colors">
            Features
          </a>
          <a href="#contact" className="text-white/90 hover:text-white transition-colors">
            Contact
          </a>
          <a href="#docs" className="text-white/90 hover:text-white transition-colors">
            Docs
          </a>
          <a href="#legal" className="text-white/90 hover:text-white transition-colors">
            Legal
          </a>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <User className="mr-2 h-4 w-4" />
            Log In
          </Button>
        </div>

        <button
          className="md:hidden text-white pr-8"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-white/10 backdrop-blur-lg rounded-lg p-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <a href="#source" className="text-white/90 hover:text-white transition-colors">
              Source Code
            </a>
            <a href="#features" className="text-white/90 hover:text-white transition-colors">
              Features
            </a>
            <a href="#contact" className="text-white/90 hover:text-white transition-colors">
              Contact
            </a>
            <a href="#docs" className="text-white/90 hover:text-white transition-colors">
              Docs
            </a>
            <a href="#legal" className="text-white/90 hover:text-white transition-colors">
              Legal
            </a>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 w-full justify-start"
            >
              <User className="mr-2 h-4 w-4" />
              Log In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};