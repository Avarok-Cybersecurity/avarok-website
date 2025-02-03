import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureSectionProps {
  features: Feature[];
  variant?: "white" | "gray";
  animationRef: any;
  isVisible: boolean;
}

import { FeatureCard } from "./FeatureCard";

export const FeatureSection = ({ features, variant = "white", animationRef, isVisible }: FeatureSectionProps) => {
  return (
    <div 
      ref={animationRef}
      className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          {...feature}
          index={index}
          variant={variant}
        />
      ))}
    </div>
  );
};