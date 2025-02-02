import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F9FF] to-[#F3F0FF] px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-up">
          <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Welcome to Avarok
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Transform Your Digital Experience with{" "}
            <span className="text-primary">Avarok</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of digital innovation with our cutting-edge
            solutions designed to elevate your online presence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white min-w-[200px]"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 min-w-[200px]"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};