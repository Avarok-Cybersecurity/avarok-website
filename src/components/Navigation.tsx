import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CookiePolicy } from "./legal/CookiePolicy";
import { AcceptableUse } from "./legal/AcceptableUse";
import { PrivacyPolicy } from "./legal/PrivacyPolicy";
import { Terms } from "./legal/Terms";
import { LegalMenu } from "./legal/LegalMenu";
import { NavLinks } from "./navigation/NavLinks";

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

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleDialogChange = (open: boolean, setStateFunction: (value: boolean) => void) => {
    if (!open) {
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
      void document.body.offsetHeight;
    }
    setStateFunction(open);
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
            <NavLinks scrollToContact={scrollToContact} />
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
              <NavLinks 
                scrollToContact={scrollToContact} 
                isMobile={true} 
                onMobileMenuClose={() => setIsMobileMenuOpen(false)}
              />
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
        onOpenChange={(open) => handleDialogChange(open, setIsCookiePolicyOpen)}
      />
      <AcceptableUse 
        open={isAcceptableUseOpen} 
        onOpenChange={(open) => handleDialogChange(open, setIsAcceptableUseOpen)}
      />
      <PrivacyPolicy 
        open={isPrivacyPolicyOpen} 
        onOpenChange={(open) => handleDialogChange(open, setIsPrivacyPolicyOpen)}
      />
      <Terms 
        open={isTermsOpen} 
        onOpenChange={(open) => handleDialogChange(open, setIsTermsOpen)}
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