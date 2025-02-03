import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TermsProps {
  open: boolean;
  onOpenChange: () => void;
}

export const Terms = ({ open, onOpenChange }: TermsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p>Welcome to our Terms and Conditions. These terms outline the rules and regulations for the use of our service.</p>
          <p>By accessing this service, we assume you accept these terms. Do not continue to use the service if you do not agree to all of the terms and conditions stated on this page.</p>
          <p>The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice: "Client", "You", and "Your" refers to you, the person accessing this service and compliant to the Company’s terms and conditions.</p>
          <p>"The Company", "Ourselves", "We", "Our", and "Us", refers to our Company.</p>
          <p>All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of the Netherlands.</p>
          <p>Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
          <p>We reserve the right to amend these terms at any time. Your continued use of the service after any changes constitutes your acceptance of the new terms.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
