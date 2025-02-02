import { Cpu, Lock, Users, FolderUp, Mail, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const topFeatures = [
  {
    icon: Cpu,
    title: "Rust/Tokio",
    description:
      "SDK built using 100% safe rust for maximum security and performance. Powered using the Tokio asynchronous runtime",
  },
  {
    icon: Lock,
    title: "Extreme Security",
    description:
      "Post-quantum key exchange, multi-layered ratcheting, per-message adjustable multi-layered cryptography, and many other adjustable options",
  },
  {
    icon: Users,
    title: "P2P",
    description:
      "Includes built-in NAT traversal for enabling the use of peer to peer applications",
  },
];

const bottomFeatures = [
  {
    icon: FolderUp,
    title: "File Transfer Scrambling",
    description:
      "All files transferred between client/server or peer-to-peer are scrambled with an independent key for higher security",
  },
  {
    icon: Mail,
    title: "Perfect Forward Secrecy + Best Effort Mode",
    description:
      "Each session can be configured to enforce perfect forward secrecy for maximum security, or best-effort mode for maximum throughput",
  },
  {
    icon: Zap,
    title: "Hybrid Cryptography",
    description:
      "Each session by default uses TLS or QUIC as a base layer coupled with the post-quantum Lusna Protocol for quantum resistance",
  },
];

export const Features = () => {
  const headerAnimation = useScrollAnimation();
  const topFeaturesAnimation = useScrollAnimation();
  const bottomFeaturesAnimation = useScrollAnimation();

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={headerAnimation.ref}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 transform ${
            headerAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Features
          </span>
          <h2 className="mt-8 text-4xl font-bold text-gray-900">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Powerful solutions to enable digital security and sovereignty for people, businesses, and government
          </p>
        </div>

        <div className="space-y-12">
          {/* Top row */}
          <div 
            ref={topFeaturesAnimation.ref}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 transform ${
              topFeaturesAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            {topFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
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

          {/* Bottom row with different background */}
          <div 
            ref={bottomFeaturesAnimation.ref}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 transform ${
              bottomFeaturesAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            {bottomFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
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
      </div>
    </section>
  );
};