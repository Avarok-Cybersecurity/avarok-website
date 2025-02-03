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
    setStateFunction(open);
    if (!open) {
      // Reset pointer events and remove any lingering styles
      document.body.style.pointerEvents = '';
      document.body.style.overflow = '';
    }
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
                <DropdownMenuItem onSelect={() => setIsPrivacyPolicyOpen(true)}>
                  Privacy Policy
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsTermsOpen(true)}>
                  Terms and Conditions
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
                  <DropdownMenuItem onSelect={() => setIsPrivacyPolicyOpen(true)}>
                    Privacy Policy
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setIsTermsOpen(true)}>
                    Terms and Conditions
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </nav>

      <Dialog 
        open={isCookiePolicyOpen} 
        onOpenChange={(open) => handleDialogChange(open, setIsCookiePolicyOpen)}
      >
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

      <Dialog 
        open={isAcceptableUseOpen} 
        onOpenChange={(open) => handleDialogChange(open, setIsAcceptableUseOpen)}
      >
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

      <Dialog 
        open={isPrivacyPolicyOpen} 
        onOpenChange={(open) => handleDialogChange(open, setIsPrivacyPolicyOpen)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy Notice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p className="text-right">Last updated February 10, 2022</p>
            <p>Thank you for choosing to be part of our community at Avarok Corp ("Company," "we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at contact@avarok.net.</p>
            <p>This privacy notice describes how we might use your information if you:</p>
            <ul>
              <li>Visit our website at https://avarok.net</li>
              <li>Engage with us in other related ways ― including any sales, marketing, or events</li>
            </ul>
            <p>In this privacy notice, if we refer to:</p>
            <ul>
              <li>"Website," we are referring to any website of ours that references or links to this policy</li>
              <li>"Services," we are referring to our Website, and other related services, including any sales, marketing, or events</li>
            </ul>
            <p>The purpose of this privacy notice is to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.</p>
            <p>Please read this privacy notice carefully, as it will help you understand what we do with the information that we collect.</p>
            <h3 className="text-lg font-semibold">TABLE OF CONTENTS</h3>
            <ol className="list-decimal pl-6">
              <li>WHAT INFORMATION DO WE COLLECT?</li>
              <li>HOW DO WE USE YOUR INFORMATION?</li>
              <li>WILL YOUR INFORMATION BE SHARED WITH ANYONE?</li>
              <li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
              <li>HOW DO WE HANDLE YOUR SOCIAL LOGINS?</li>
              <li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
              <li>HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
              <li>DO WE COLLECT INFORMATION FROM MINORS?</li>
              <li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
              <li>CONTROLS FOR DO-NOT-TRACK FEATURES</li>
              <li>DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</li>
              <li>DO WE MAKE UPDATES TO THIS NOTICE?</li>
              <li>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</li>
              <li>HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?</li>
            </ol>
            <h3 className="text-lg font-semibold">1. WHAT INFORMATION DO WE COLLECT?</h3>
            <p>Personal information you disclose to us</p>
            <p>In Short:  We collect personal information that you provide to us.</p>
            <p>We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.</p>
            <p>The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect may include the following:</p>
            <h4 className="font-semibold">Personal Information Provided by You.</h4>
            <p>We collect names; phone numbers; email addresses; mailing addresses; job titles; usernames; passwords; contact preferences; contact or authentication data; billing addresses; debit/credit card numbers; and other similar information.</p>
            <h4 className="font-semibold">Payment Data.</h4>
            <p>We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by PayPal, Apple Pay and Wix Payments. You may find their privacy notice link(s) here: https://www.paypal.com/us/webapps/mpp/ua/privacy-full, https://www.apple.com/legal/privacy/data/en/apple-pay/ and https://www.wix.com/about/privacy.</p>
            <h4 className="font-semibold">Social Media Login Data.</h4>
            <p>We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter or other social media account. If you choose to register in this way, we will collect the information described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.</p>
            <p>All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.</p>
            <h3 className="text-lg font-semibold">2. HOW DO WE USE YOUR INFORMATION?</h3>
            <p>In Short:  We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>
            <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.</p>
            <p>We use the information we collect or receive:</p>
            <ul>
              <li>To facilitate account creation and logon process. If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract. See the section below headed "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" for further information.</li>
              <li>To post testimonials. We post testimonials on our Website that may contain personal information. Prior to posting a testimonial, we will obtain your consent to use your name and the content of the testimonial. If you wish to update, or delete your testimonial, please contact us at contact@avarok.net and be sure to include your name, testimonial location, and contact information.</li>
              <li>Request feedback. We may use your information to request feedback and to contact you about your use of our Website.</li>
              <li>To enable user-to-user communications. We may use your information in order to enable user-to-user communications with each user's consent.</li>
              <li>To manage user accounts. We may use your information for the purposes of managing our account and keeping it in working order.</li>
              <li>To send administrative information to you. We may use your personal information to send you product, service and new feature information and/or information about changes to our terms, conditions, and policies.</li>
              <li>To protect our Services. We may use your information as part of our efforts to keep our Website safe and secure (for example, for fraud monitoring and prevention).</li>
              <li>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
              <li>To respond to legal requests and prevent harm. If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.</li>
              <li>Fulfill and manage your orders. We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the Website.</li>
              <li>Administer prize draws and competitions. We may use your information to administer prize draws and competitions when you elect to participate in our competitions.</li>
              <li>To deliver and facilitate delivery of services to the user. We may use your information to provide you with the requested service.</li>
              <li>To respond to user inquiries/offer support to users. We may use your information to respond to your inquiries and solve any potential issues you might have with the use of our Services.</li>
            </ul>
            <h3 className="text-lg font-semibold">3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h3>
            <p>In Short:  We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
            <p>We may process or share your data that we hold based on the following legal basis:</p>
            <ul>
              <li>Consent: We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
              <li>Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
              <li>Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
              <li>Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
              <li>Vital Interests: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
            </ul>
            <p>More specifically, we may need to process your data or share your personal information in the following situations:</p>
            <ul>
              <li>Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            </ul>
            <h3 className="text-lg font-semibold">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h3>
            <p>In Short:  We may use cookies and other tracking technologies to collect and store your information.</p>
            <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
            <h3 className="text-lg font-semibold">5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h3>
            <p>In Short:  If you choose to register or log in to our services using a social media account, we may have access to certain information about you.</p>
            <p>Our Website offers you the ability to register and login using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, profile picture as well as other information you choose to make public on such social media platform.</p>
            <p>We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Website. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use and share your personal information, and how you can set your privacy preferences on their sites and apps.</p>
            <h3 className="text-lg font-semibold">6. HOW LONG DO WE KEEP YOUR INFORMATION?</h3>
            <p>In Short:  We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</p>
            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
            <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
            <h3 className="text-lg font-semibold">7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h3>
            <p>In Short:  We aim to protect your personal information through a system of organizational and technical security measures.</p>
            <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk. You should only access the Website within a secure environment.</p>
            <h3 className="text-lg font-semibold">8. DO WE COLLECT INFORMATION FROM MINORS?</h3>
            <p>In Short:  We do not knowingly collect data from or market to children under 18 years of age.</p>
            <p>We do not knowingly solicit data from or market to children under 18 years of age. By using the Website, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Website. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at contact@avarok.net.</p>
            <h3 className="text-lg font-semibold">9. WHAT ARE YOUR PRIVACY RIGHTS?</h3>
            <p>In Short:  In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</p>
            <p>In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.</p>
            <p>If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal, nor will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
            <p>If you are a resident in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.</p>
            <p>If you are a resident in Switzerland, the contact details for the data protection authorities are available here: https://www.edoeb.admin.ch/edoeb/en/home.html.</p>
            <p>If you have questions or comments about your privacy rights, you may email us at contact@avarok.net.</p>
            <h3 className="text-lg font-semibold">Account Information</h3>
            <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
            <ul>
              <li>Log in to your account settings and update your user account.</li>
            </ul>
            <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with applicable legal requirements.</p>
            <h3 className="text-lg font-semibold">Cookies and similar technologies:</h3>
            <p>Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Website. To opt-out of interest-based advertising by advertisers on our Website visit http://www.aboutads.info/choices/.</p>
            <h3 className="text-lg font-semibold">Opting out of email marketing:</h3>
            <p>You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list — however, we may still communicate with you, for example to send you service-related emails that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes. To otherwise opt-out, you may:</p>
            <ul>
              <li>Access your account settings and update your preferences.</li>
            </ul>
            <h3 className="text-lg font-semibold">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h3>
            <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>
            <h3 className="text-lg font-semibold">11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h3>
            <p>In Short:  Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</p>
            <p>California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>
            <p>If you are under 18 years of age, reside in California, and have a registered account with the Website, you have the right to request removal of unwanted data that you publicly post on the Website. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Website, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g. backups, etc.).</p>
            <h3 className="text-lg font-semibold">CCPA Privacy Notice</h3>
            <p>The California Code of Regulations defines a "resident" as:</p>
            <ol className="list-decimal pl-6">
              <li>every individual who is in the State of California for other than a temporary or transitory purpose and</li>
              <li>every individual who is domiciled in the State of California who is outside the State of California for a temporary or transitory purpose</li>
            </ol>
            <p>If this definition of "resident" applies to you, we must adhere to certain rights and obligations regarding your personal information.</p>
            <h3 className="text-lg font-semibold">What categories of personal information do we collect?</h3>
            <p>We have collected the following categories of personal information in the past twelve (12) months:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Examples</th>
                    <th className="px-4 py-2 text-left">Collected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">A. Identifiers</td>
                    <td className="px-4 py-2">Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address and account name</td>
                    <td className="px-4 py-2">NO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">B. Personal information categories listed in the California Customer Records statute</td>
                    <td className="px-4 py-2">Name, contact information, education, employment, employment history and financial information</td>
                    <td className="px-4 py-2">YES</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">C. Protected classification characteristics under California or federal law</td>
                    <td className="px-4 py-2">Gender and date of birth</td>
                    <td className="px-4 py-2">NO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">D. Commercial information</td>
                    <td className="px-4 py-2">Transaction information, purchase history, financial details and payment information</td>
                    <td className="px-4 py-2">NO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">E. Biometric information</td>
                    <td className="px-4 py-2">Fingerprints and voiceprints</td>
                    <td className="px-4 py-2">NO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">F. Internet or other similar network activity</td>
                    <td className="px-4 py-2">Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems and advertisements</td>
                    <td className="px-4 py-2">NO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">G. Geolocation data</td>
                    <td className="px-4 py-2">Device location</td>
                    <td className="px-4 py-2">NO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">H. Audio, electronic, visual, thermal, olfactory, or similar information</td>
                    <td className="px-4 py-2">Images and audio, video or call recordings created in connection with our business activities</td>
                    <td className="px-4 py-2">NO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">I. Professional or employment-related information</td>
                    <td className="px-4 py-2">Business contact details in order to provide you our services at a business level, job title as well as work history and professional qualifications if you apply for a job with us</td>
                    <td className="px-4 py-2">NO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">J. Education Information</td>
                    <td className="px-4 py-2">Student records and directory information</td>
                    <td className="px-4 py-2">NO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">K. Inferences drawn from other personal information</td>
                    <td className="px-4 py-2">Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics</td>
                    <td className="px-4 py-2">NO</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>We may also collect other personal information outside of these categories instances where you interact with us in-person, online, or by phone or mail in the context of:</p>
            <ul>
              <li>Receiving help through our customer support channels;</li>
              <li>Participation in customer surveys or contests; and</li>
              <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
            </ul>
            <h3 className="text-lg font-semibold">How do we use and share your personal information?</h3>
            <p>More information about our data collection and sharing practices can be found in this privacy notice.</p>
            <p>You may contact us by email at contact@avarok.net, or by referring to the contact details at the bottom of this document.</p>
            <p>If you are using an authorized agent to exercise your right to opt-out we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf.</p>
            <h3 className="text-lg font-semibold">Will your information be shared with anyone else?</h3>
            <p>We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes the information on our behalf.</p>
            <p>We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal data.</p>
            <p>Avarok Corp has not disclosed or sold any personal information to third parties for a business or commercial purpose in the preceding 12 months. Avarok Corp will not sell personal information in the future belonging to website visitors, users and other consumers.</p>
            <h3 className="text-lg font-semibold">Your rights with respect to your personal data</h3>
            <p>Right to request deletion of the data - Request to delete</p>
            <p>You can ask for the deletion of your personal information. If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law, such as (but not limited to) the exercise by another consumer of his or her right to free speech, our compliance requirements resulting from a legal obligation or any processing that may be required to protect against illegal activities.</p>
            <p>Right to be informed - Request to know</p>
            <p>Depending on the circumstances, you have a right to know:</p>
            <ul>
              <li>whether we collect and use your personal information;</li>
              <li>the categories of personal information that we collect;</li>
              <li>the purposes for which the collected personal information is used;</li>
              <li>whether we sell your personal information to third parties;</li>
              <li>the categories of personal information that we sold or disclosed for a business purpose;</li>
              <li>the categories of third parties to whom the personal information was sold or disclosed for a business purpose; and</li>
              <li>the business or commercial purpose for collecting or selling personal information.</li>
            </ul>
            <p>In accordance with applicable law, we are not obligated to provide or delete consumer information that is de-identified in response to a consumer request or to re-identify individual data to verify a consumer request.</p>
            <p>Right to Non-Discrimination for the Exercise of a Consumer’s Privacy Rights</p>
            <p>We will not discriminate against you if you exercise your privacy rights.</p>
            <h3 className="text-lg font-semibold">Verification process</h3>
            <p>Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. These verification efforts require us to ask you to provide information so that we can match it with information you have previously provided us. For instance, depending on the type of request you submit, we may ask you to provide certain information so that we can match the information you provide with the information we already have on file, or we may contact you through a communication method (e.g. phone or email) that you have previously provided to us. We may also use other verification methods as the circumstances dictate.</p>
            <p>We will only use personal information provided in your request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting additional information from you for the purposes of verification. If, however, we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity, and for security or fraud-prevention purposes. We will delete such additionally provided information as soon as we finish verifying you.</p>
            <h3 className="text-lg font-semibold">Other privacy rights</h3>
            <ul>
              <li>you may object to the processing of your personal data.</li>
              <li>you may request correction of your personal data if it is incorrect or no longer relevant, or ask to restrict the processing of the data.</li>
              <li>you can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with the CCPA.</li>
              <li>you may request to opt-out from future selling of your personal information to third parties. Upon receiving a request to opt-out, we will act upon the request as soon as feasibly possible, but no later than 15 days from the date of the request submission.</li>
            </ul>
            <p>To exercise these rights, you can contact us by email at contact@avarok.net, or by referring to the contact details at the bottom of this document. If you have a complaint about how we handle your data, we would like to hear from you.</p>
            <h3 className="text-lg font-semibold">12. DO WE MAKE UPDATES TO THIS NOTICE?</h3>
            <p>In Short:  Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
            <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
            <h3 className="text-lg font-semibold">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h3>
            <p>If you have questions or comments about this notice, you may email us at contact@avarok.net or by post to:</p>
            <p>Avarok Corp</p>
            <p>251 Little Falls Drive</p>
            <p>Wilmington, DE 19808</p>
            <p>United States</p>
            <h3 className="text-lg font-semibold">14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h3>
            <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please visit: https://www.avarok.net/account/my-account.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isTermsOpen} onOpenChange={(open) => handleDialogChange(open, setIsTermsOpen)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>Welcome to Avarok Cybersecurity!</p>
            <p>These terms and conditions outline the rules and regulations for the use of Avarok Corp's Website, located at https://avarok.net.</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Avarok Cybersecurity if you do not agree to take all of the terms and conditions stated on this page.</p>
            <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
            <h3 className="text-lg font-semibold">Cookies</h3>
            <p>We employ the use of cookies. By accessing Avarok Cybersecurity, you agreed to use cookies in agreement with the Avarok Corp's Privacy Policy.</p>
            <p>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>
            <h3 className="text-lg font-semibold">License</h3>
            <p>Unless otherwise stated, Avarok Corp and/or its licensors own the intellectual property rights for all material on Avarok Cybersecurity. All intellectual property rights are reserved. You may access this from Avarok Cybersecurity for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <p>You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Republish material from Avarok Cybersecurity</li>
              <li>Sell, rent or sub-license material from Avarok Cybersecurity</li>
              <li>Reproduce, duplicate or copy material from Avarok Cybersecurity</li>
              <li>Redistribute content from Avarok Cybersecurity</li>
            </ul>
            <p>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the Terms And Conditions Template.</p>
            <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Avarok Corp does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Avarok Corp, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Avarok Corp shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
            <p>Avarok Corp reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>
            <p>You warrant and represent that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
              <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
              <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
              <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
            </ul>
            <p>You hereby grant Avarok Corp a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>
            <h3 className="text-lg font-semibold">Hyperlinking to our Content</h3>
            <p>The following organizations may link to our Website without prior written approval:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
              <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
            </ul>
            <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>
            <p>We may consider and approve other link requests from the following types of organizations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>commonly-known consumer and/or business information sources;</li>
              <li>dot.com community sites;</li>
              <li>associations or other groups representing charities;</li>
              <li>online directory distributors;</li>
              <li>internet portals;</li>
              <li>accounting, law and consulting firms; and</li>
              <li>educational institutions and trade associations.</li>
            </ul>
            <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Avarok Corp; and (d) the link is in the context of general resource information.</p>
            <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</p>
            <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Avarok Corp. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>
            <p>Approved organizations may hyperlink to our Website as follows:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>By use of our corporate name; or</li>
              <li>By use of the uniform resource locator being linked to; or</li>
              <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
            </ul>
            <p>No use of Avarok Corp's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>
            <h3 className="text-lg font-semibold">iFrames</h3>
            <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>
            <h3 className="text-lg font-semibold">Content Liability</h3>
            <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
            <h3 className="text-lg font-semibold">Your Privacy</h3>
            <p>Please read Privacy Policy</p>
            <h3 className="text-lg font-semibold">Reservation of Rights</h3>
            <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>
            <h3 className="text-lg font-semibold">Removal of links from our website</h3>
            <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>
            <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>
            <h3 className="text-lg font-semibold">Disclaimer</h3>
            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>limit or exclude our or your liability for death or personal injury;</li>
              <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
            <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
          </div>
        </DialogContent>
      </Dialog>

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
