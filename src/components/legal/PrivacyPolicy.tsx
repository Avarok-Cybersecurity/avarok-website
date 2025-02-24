import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PrivacyPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivacyPolicy = ({ open, onOpenChange }: PrivacyPolicyProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
};
