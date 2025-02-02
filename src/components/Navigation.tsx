import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  Legal
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-sm">
                <DropdownMenuItem onSelect={() => setIsCookiePolicyOpen(true)}>
                  Cookie Policy
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
                  <DropdownMenuItem onSelect={() => setIsCookiePolicyOpen(true)}>
                    Cookie Policy
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

      <Dialog open={isCookiePolicyOpen} onOpenChange={setIsCookiePolicyOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cookie Policy for Avarok</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>This is the Cookie Policy for Avarok, accessible from avarok.net</p>

            <h3 className="text-lg font-semibold">What Are Cookies</h3>
            <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>

            <h3 className="text-lg font-semibold">How We Use Cookies</h3>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>

            <h3 className="text-lg font-semibold">Disabling Cookies</h3>
            <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.</p>

            <h3 className="text-lg font-semibold">The Cookies We Set</h3>
            
            <h4 className="font-semibold">Account related cookies</h4>
            <p>If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.</p>

            <h4 className="font-semibold">Login related cookies</h4>
            <p>We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.</p>

            <h4 className="font-semibold">Email newsletters related cookies</h4>
            <p>This site offers newsletter or email subscription services and cookies may be used to remember if you are already registered and whether to show certain notifications which might only be valid to subscribed/unsubscribed users.</p>

            <h4 className="font-semibold">Orders processing related cookies</h4>
            <p>This site offers e-commerce or payment facilities and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.</p>

            <h4 className="font-semibold">Surveys related cookies</h4>
            <p>From time to time we offer user surveys and questionnaires to provide you with interesting insights, helpful tools, or to understand our user base more accurately. These surveys may use cookies to remember who has already taken part in a survey or to provide you with accurate results after you change pages.</p>

            <h4 className="font-semibold">Forms related cookies</h4>
            <p>When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.</p>

            <h4 className="font-semibold">Site preferences cookies</h4>
            <p>In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>

            <h3 className="text-lg font-semibold">Third Party Cookies</h3>
            <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
            <p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</p>
            <p>For more information on Google Analytics cookies, see the official Google Analytics page.</p>

            <h3 className="text-lg font-semibold">More Information</h3>
            <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
            <p>For more general information on cookies, please read "Cookies" article from the Privacy Policy Generator.</p>
            <p>However if you are still looking for more information then you can contact us through one of our preferred contact methods:</p>
            <p>Email: contact@avarok.net</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};