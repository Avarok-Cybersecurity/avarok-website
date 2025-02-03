import { Cpu, Lock, Users, FolderUp, Mail, Zap, KeyRound, Shield, Key, Database, Network, Server } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { FeatureSection } from "./features/FeatureSection";

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

const middleFeatures = [
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

const bottomFeatures = [
  {
    icon: KeyRound,
    title: "Argon2id Password Hashing",
    description:
      "A built-in parameter autotuner and authenticator allows creating secure authenticated sessions seemlessly",
  },
  {
    icon: Shield,
    title: "Passwordless Authentication",
    description:
      "Configure sessions to use passwordless authentication for connections",
  },
  {
    icon: Key,
    title: "Credentialed Authentication",
    description:
      "Configure sessions to use credentials for added security",
  },
];

const extraFeatures = [
  {
    icon: Network,
    title: "Single/Multi-Threaded Modes",
    description:
      "Easily change between single and multi-threaded protocol event loops at compile-time to fine-tune to the requirements of your application",
  },
  {
    icon: Database,
    title: "Scalable Backends",
    description:
      "Configure your application to use a MySQL, PostgreSQL, SQLite, or Redis backends to scale your application across a network",
  },
  {
    icon: Server,
    title: "Distributed Systems",
    description:
      "Build distributed systems with ease using our battle-tested networking and synchronization primitives",
  },
];

export const Features = () => {
  const headerAnimation = useScrollAnimation();
  const topFeaturesAnimation = useScrollAnimation();
  const middleFeaturesAnimation = useScrollAnimation();
  const bottomFeaturesAnimation = useScrollAnimation();
  const extraFeaturesAnimation = useScrollAnimation();

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
          <FeatureSection 
            features={topFeatures}
            animationRef={topFeaturesAnimation.ref}
            isVisible={topFeaturesAnimation.isVisible}
          />
          <FeatureSection 
            features={middleFeatures}
            variant="gray"
            animationRef={middleFeaturesAnimation.ref}
            isVisible={middleFeaturesAnimation.isVisible}
          />
          <FeatureSection 
            features={bottomFeatures}
            animationRef={bottomFeaturesAnimation.ref}
            isVisible={bottomFeaturesAnimation.isVisible}
          />
          <FeatureSection 
            features={extraFeatures}
            variant="gray"
            animationRef={extraFeaturesAnimation.ref}
            isVisible={extraFeaturesAnimation.isVisible}
          />
        </div>
      </div>
    </section>
  );
};