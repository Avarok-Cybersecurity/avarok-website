import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  variant?: "white" | "gray";
}

export const FeatureCard = ({ icon: Icon, title, description, index, variant = "white" }: FeatureCardProps) => {
  return (
    <div
      className={`p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group ${
        variant === "gray" ? "bg-gray-50" : "bg-white"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`
      }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};