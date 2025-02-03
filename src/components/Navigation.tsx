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
  const [isAcceptableUseOpen, setIsAcceptableUseOpen] = useState(false);

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
                <DropdownMenuItem onSelect={() => setIsAcceptableUseOpen(true)}>
                  Acceptable Use Policy
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
                  <DropdownMenuItem onSelect={() => setIsAcceptableUseOpen(true)}>
                    Acceptable Use Policy
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

      <Dialog open={isAcceptableUseOpen} onOpenChange={setIsAcceptableUseOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Acceptable Use Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p className="font-semibold">Last Modified: March 8 2022</p>

            <h3 className="text-lg font-semibold">Introduction</h3>
            <p>
              Avarok, Inc. (the "Avarok," "we," or "us") provides access to certain cloud-based services (the "Platform"). 
              This Acceptable Use Policy (this "AUP") governs your access to and use of the Platform. Avarok reserves the right 
              to amend, alter, or modify your conduct requirements as set forth in this AUP at any time.
            </p>
            <p>
              By clicking to accept or agreeing to the AUP, you accept and agree to be bound and abide by this AUP. 
              If you do not want to agree to this AUP, you must not access or use the Platform.
            </p>

            <h3 className="text-lg font-semibold">Prohibited Uses</h3>
            <p>You may use the Platform only for lawful purposes and in accordance with this AUP. You agree not to use the Platform:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation (including, without limitation, any laws regarding the export of data or software to and from the US or other countries).</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information, or otherwise.</li>
              <li>To send, knowingly receive, upload, download, use, or re-use any material which violates the rights of any individual or entity established in any jurisdiction.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate the Avarok, a Avarok employee, another user, or any other person or entity (including, without limitation, by using e-mail addresses or screen names associated with any of the foregoing).</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Platform, or which, as determined by us, may harm the Avarok or users of the Platform or expose them to liability.</li>
            </ul>

            <p>Additionally, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Platform in any manner that could disable, overburden, damage, or impair the Platform or interfere with any other party's use of the Platform, including their ability to engage in real-time activities through the Platform.</li>
              <li>Use any robot, spider, or other automatic device, process, or means to access the Platform for any purpose, including monitoring or copying any Platform traffic or resources available on the Platform.</li>
              <li>Use any manual process to monitor or copy any Platform traffic or resources available on the Platform or for any other unauthorized purpose without our prior written consent.</li>
              <li>Use any device, software, or routine that interferes with the proper working of the Platform.</li>
              <li>Introduce any viruses, trojan horses, worms, logic bombs, or other software or material which is malicious or technologically harmful.</li>
              <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Platform or any server, computer, database, or other resource or element connected to the Platform.</li>
              <li>Violate, attempt to violate, or knowingly facilitate the violation of the security or integrity of the Platform.</li>
              <li>Otherwise attempt to interfere with the proper working of the Platform.</li>
            </ul>

            <h3 className="text-lg font-semibold">Content Standards</h3>
            <p>You agree not to use the Platform to send, knowingly receive, upload, download, use, or re-use any material which:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contains any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable.</li>
              <li>Promotes sexually explicit or pornographic material, violence, or discrimination based on race, sex, religion, nationality, disability, sexual orientation, or age.</li>
              <li>Infringes any patent, trademark, trade secret, copyright, or other intellectual property or other rights of any other person.</li>
              <li>Violates the legal rights (including the rights of publicity and privacy) of others or contains any material that could give rise to any civil or criminal liability under applicable laws or regulations.</li>
              <li>Is likely to deceive any person.</li>
              <li>Promotes any illegal activity, or advocates, promotes, or assists any unlawful act.</li>
              <li>Causes annoyance, inconvenience, or needless anxiety or is likely to upset, embarrass, alarm, or annoy any other person.</li>
              <li>Impersonates any person, or misrepresents your identity or affiliation with any person or organization.</li>
              <li>Involves commercial activities or sales, such as contests, sweepstakes, and other sales promotions, barter, or advertising.</li>
              <li>Gives the impression that they emanate from or are endorsed by us or any other person or entity, if this is not the case.</li>
            </ul>

            <h3 className="text-lg font-semibold">Monitoring and Enforcement</h3>
            <p>
              Avarok, in its sole discretion, will determine whether your conduct is in compliance with this AUP. 
              We have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Monitor your use of the Platform for any purpose in our sole discretion and as we see fit.</li>
              <li>Take any action we deem necessary or appropriate in our sole discretion if we believe a user's conduct violates this AUP, infringes any intellectual property right or other right of any person or entity, threatens the personal safety of users of the Platform or the public, or could create liability for the Avarok.</li>
              <li>Disclose your identity or other information about you to any third party who claims that material posted by you violates their rights, including their intellectual property rights or their right to privacy.</li>
              <li>Take appropriate legal action, including without limitation, referral to law enforcement, for any illegal or unauthorized use of the Platform.</li>
              <li>Terminate or suspend your access to all or part of the Platform for any or no reason, including without limitation, any violation of this AUP.</li>
            </ul>

            <p className="mt-4">
              Without limiting the foregoing, we have the right to fully cooperate with any law enforcement authorities or court order requesting or directing us to disclose the identity or other information of anyone who accesses or uses the Platform.
            </p>

            <p className="mt-4 font-semibold">
              YOU WAIVE AND HOLD HARMLESS AVAROK FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY AVAROK DURING, OR TAKEN AS A CONSEQUENCE OF, INVESTIGATIONS BY EITHER AVAROK OR LAW ENFORCEMENT AUTHORITIES.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};