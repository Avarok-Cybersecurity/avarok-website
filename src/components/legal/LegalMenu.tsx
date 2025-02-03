import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
  onSelectTerms,
}: LegalMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-white/20">
          Legal
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-sm">
        <DropdownMenuItem onSelect={onSelectCookiePolicy}>
          Cookie Policy
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onSelectAcceptableUse}>
          Acceptable Use Policy
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onSelectPrivacyPolicy}>
          Privacy Policy
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onSelectTerms}>
          Terms and Conditions
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};