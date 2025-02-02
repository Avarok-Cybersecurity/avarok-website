import { Zap, Shield, Smartphone, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Experience blazing-fast performance with our optimized infrastructure.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description:
      "Your data is protected with enterprise-grade security measures.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Perfectly optimized for all devices, ensuring a seamless experience.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Deploy worldwide with our distributed network of servers.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Features
          </span>
          <h2 className="mt-8 text-4xl font-bold text-gray-900">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Powerful features to help you take control of your digital presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};