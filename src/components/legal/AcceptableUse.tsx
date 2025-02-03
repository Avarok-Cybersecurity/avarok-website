import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AcceptableUseProps {
  open: boolean;
  onOpenChange: () => void;
}

export const AcceptableUse = ({ open, onOpenChange }: AcceptableUseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Acceptable Use Policy</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p>
            This Acceptable Use Policy outlines the acceptable use of our services and products. By using our services, you agree to comply with this policy.
          </p>
          <p>
            You may not use our services for any unlawful purpose or in a way that could damage, disable, overburden, or impair our services or interfere with any other party's use of our services.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer and account.
          </p>
          <p>
            We reserve the right to terminate or suspend your access to our services if you violate this policy or engage in any conduct that we deem inappropriate.
          </p>
          <p>
            If you have any questions about this Acceptable Use Policy, please contact us.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
