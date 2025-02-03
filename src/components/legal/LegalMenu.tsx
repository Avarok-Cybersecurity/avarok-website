import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AcceptableUse } from "./AcceptableUse";
import { CookiePolicy } from "./CookiePolicy";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { Terms } from "./Terms";

interface LegalMenuProps {
  onSelectCookiePolicy: () => void;
  onSelectAcceptableUse: () => void;
  onSelectPrivacyPolicy: () => void;
  onSelectTerms: () => void;
}

export const LegalMenu = ({
  onSelectCookiePolicy,
  onSelectAcceptableUse,
  onSelectPrivacyPolicy,
  onSelectTerms
}: LegalMenuProps) => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const closeDialog = () => {
    setActiveDialog(null);
    // Reset any lingering styles
    document.body.style.removeProperty('pointer-events');
    document.body.style.removeProperty('overflow');
    console.log('Dialog closed, styles reset');
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Button
        variant="link"
        className="text-sm text-muted-foreground hover:text-primary"
        onClick={() => onSelectTerms()}
      >
        Terms
      </Button>
      <Button
        variant="link"
        className="text-sm text-muted-foreground hover:text-primary"
        onClick={() => onSelectPrivacyPolicy()}
      >
        Privacy
      </Button>
      <Button
        variant="link"
        className="text-sm text-muted-foreground hover:text-primary"
        onClick={() => onSelectCookiePolicy()}
      >
        Cookies
      </Button>
      <Button
        variant="link"
        className="text-sm text-muted-foreground hover:text-primary"
        onClick={() => onSelectAcceptableUse()}
      >
        Acceptable Use
      </Button>
    </div>
  );
};