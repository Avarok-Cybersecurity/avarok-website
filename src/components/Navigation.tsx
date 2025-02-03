import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CookiePolicy } from "./legal/CookiePolicy";
import { AcceptableUse } from "./legal/AcceptableUse";
import { PrivacyPolicy } from "./legal/PrivacyPolicy";
import { Terms } from "./legal/Terms";
import { LegalMenu } from "./legal/LegalMenu";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);
  const [isAcceptableUseOpen, setIsAcceptableUseOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resetDialogStyles = () => {
    document.body.style.removeProperty('pointer-events');
    document.body.style.removeProperty('overflow');
    document.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
      el.removeAttribute('aria-hidden');
    });
    void document.body.offsetHeight;
    console.log('Dialog styles reset');
  };

  const handleDialogChange = (setStateFunction: (value: boolean) => void) => {
    setStateFunction(false);
    resetDialogStyles();
    setTimeout(resetDialogStyles, 100);
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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
            <LegalMenu 
              onSelectCookiePolicy={() => setIsCookiePolicyOpen(true)}
              onSelectAcceptableUse={() => setIsAcceptableUseOpen(true)}
              onSelectPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
              onSelectTerms={() => setIsTermsOpen(true)}
            />
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
              <LegalMenu 
                onSelectCookiePolicy={() => setIsCookiePolicyOpen(true)}
                onSelectAcceptableUse={() => setIsAcceptableUseOpen(true)}
                onSelectPrivacyPolicy={() => setIsPrivacyPolicyOpen(true)}
                onSelectTerms={() => setIsTermsOpen(true)}
              />
            </div>
          </div>
        )}
      </nav>

      <CookiePolicy 
        open={isCookiePolicyOpen} 
        onOpenChange={() => handleDialogChange(setIsCookiePolicyOpen)}
      />
      <AcceptableUse 
        open={isAcceptableUseOpen} 
        onOpenChange={() => handleDialogChange(setIsAcceptableUseOpen)}
      />
      <PrivacyPolicy 
        open={isPrivacyPolicyOpen} 
        onOpenChange={() => handleDialogChange(setIsPrivacyPolicyOpen)}
      />
      <Terms 
        open={isTermsOpen} 
        onOpenChange={() => handleDialogChange(setIsTermsOpen)}
      />

      <div 
        className="fixed bottom-0 left-0 w-full h-screen z-[-1]"
        style={{
          backgroundImage: 'url("/lovable-uploads/ea981cab-aac9-46fa-943a-ee45b534cdb2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
    </>
  );
};
