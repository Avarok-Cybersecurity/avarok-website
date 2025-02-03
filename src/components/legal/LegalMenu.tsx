import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AcceptableUse } from "./AcceptableUse";
import { CookiePolicy } from "./CookiePolicy";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { Terms } from "./Terms";

export const LegalMenu = () => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const closeDialog = () => {
    setActiveDialog(null);
    // Force a reflow to ensure styles are properly reset
    document.body.style.removeProperty('pointer-events');
    document.body.style.removeProperty('overflow');
    console.log('Dialog closed, styles reset');
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <Button
        variant="link"
        className="text-sm text-muted-foreground hover:text-primary"
        onClick={() => setActiveDialog('terms')}
      >
        Terms
      </Button>
      <Button
        variant="link"
        className="text-sm text-muted-foreground hover:text-primary"
        onClick={() => setActiveDialog('privacy')}
      >
        Privacy
      </Button>
      <Button
        variant="link"
        className="text-sm text-muted-foreground hover:text-primary"
        onClick={() => setActiveDialog('cookies')}
      >
        Cookies
      </Button>
      <Button
        variant="link"
        className="text-sm text-muted-foreground hover:text-primary"
        onClick={() => setActiveDialog('acceptable-use')}
      >
        Acceptable Use
      </Button>

      <Terms 
        open={activeDialog === 'terms'} 
        onOpenChange={() => closeDialog()} 
      />
      <PrivacyPolicy 
        open={activeDialog === 'privacy'} 
        onOpenChange={() => closeDialog()} 
      />
      <CookiePolicy 
        open={activeDialog === 'cookies'} 
        onOpenChange={() => closeDialog()} 
      />
      <AcceptableUse 
        open={activeDialog === 'acceptable-use'} 
        onOpenChange={() => closeDialog()} 
      />
    </div>
  );
};