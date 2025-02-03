import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PrivacyPolicyProps {
  open: boolean;
  onOpenChange: () => void;
}

export const PrivacyPolicy = ({ open, onOpenChange }: PrivacyPolicyProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p>Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information when you use our services.</p>
          <h2>Information We Collect</h2>
          <p>We may collect personal information such as your name, email address, and any other information you provide to us when you use our services.</p>
          <h2>How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, communicate with you, and comply with legal obligations.</p>
          <h2>Data Security</h2>
          <p>We take reasonable measures to protect your information from unauthorized access, use, or disclosure.</p>
          <h2>Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. You can also object to the processing of your information in certain circumstances.</p>
          <h2>Changes to This Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website.</p>
          <h2>Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at contact@avarok.net.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
