import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#6D52D8]/90 backdrop-blur-lg shadow-sm" : "bg-[#6D52D8]"
      }`}
    >
      <div className="flex items-center justify-between h-16">
        <a href="/" className="flex items-center">
          <div className="h-16 w-[200px] bg-white flex items-center justify-center p-1">
            <img 
              src="/lovable-uploads/f3daa95e-1ba0-4727-8e80-ef4812bf21c2.png" 
              alt="Avarok Logo" 
              className="h-14 w-auto object-contain"
            />
          </div>
        </a>

        <div className="hidden md:flex items-center space-x-8 mr-8">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            asChild
          >
            <a href="https://github.com/Avarok-Cybersecurity/Citadel-Protocol" target="_blank" rel="noopener noreferrer">Source Code</a>
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            asChild
          >
            <a href="#features">Features</a>
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={scrollToContact}
          >
            Contact
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            asChild
          >
            <a href="https://avarok-cybersecurity.github.io/Citadel-Protocol/docs/" target="_blank" rel="noopener noreferrer">Docs</a>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Legal
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-sm">
              <DropdownMenuItem asChild>
                <a href="/cookie-policy" className="w-full">Cookie Policy</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/acceptable-use" className="w-full">Acceptable Use Policy</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/privacy-policy" className="w-full">Privacy Policy</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/terms" className="w-full">Terms and Conditions</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          className="md:hidden text-white mr-8"
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
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 w-full justify-start"
              asChild
            >
              <a href="https://github.com/Avarok-Cybersecurity/Citadel-Protocol" target="_blank" rel="noopener noreferrer">Source Code</a>
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 w-full justify-start"
              asChild
            >
              <a href="#features">Features</a>
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 w-full justify-start"
              onClick={scrollToContact}
            >
              Contact
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 w-full justify-start"
              asChild
            >
              <a href="https://avarok-cybersecurity.github.io/Citadel-Protocol/docs/" target="_blank" rel="noopener noreferrer">Docs</a>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/20 w-full justify-start">
                  Legal
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-sm">
                <DropdownMenuItem asChild>
                  <a href="/cookie-policy" className="w-full">Cookie Policy</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/acceptable-use" className="w-full">Acceptable Use Policy</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/privacy-policy" className="w-full">Privacy Policy</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/terms" className="w-full">Terms and Conditions</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </nav>
  );
};