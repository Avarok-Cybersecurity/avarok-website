import { Button } from "@/components/ui/button";

interface NavLinksProps {
  scrollToContact: () => void;
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

export const NavLinks = ({ scrollToContact, isMobile = false, onMobileMenuClose }: NavLinksProps) => {
  const handleClick = () => {
    scrollToContact();
    onMobileMenuClose?.();
  };

  const baseClassName = isMobile 
    ? "text-white hover:bg-white/20 w-full justify-start"
    : "text-white hover:bg-white/20";

  return (
    <>
      <Button
        variant="ghost"
        className={baseClassName}
        asChild
      >
        <a href="https://github.com/Avarok-Cybersecurity/Citadel-Protocol" target="_blank" rel="noopener noreferrer">Source Code</a>
      </Button>
      <Button
        variant="ghost"
        className={baseClassName}
        asChild
      >
        <a href="#features">Features</a>
      </Button>
      <Button
        variant="ghost"
        className={baseClassName}
        onClick={handleClick}
      >
        Contact
      </Button>
      <Button
        variant="ghost"
        className={baseClassName}
        asChild
      >
        <a href="https://avarok-cybersecurity.github.io/Citadel-Protocol/docs/" target="_blank" rel="noopener noreferrer">Docs</a>
      </Button>
    </>
  );
};