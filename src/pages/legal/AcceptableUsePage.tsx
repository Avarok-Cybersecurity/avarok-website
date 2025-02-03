import { Navigation } from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AcceptableUsePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="mb-4"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Acceptable Use Policy</h1>
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
        </div>
      </div>
    </div>
  );
};

export default AcceptableUsePage;
