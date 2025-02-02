import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-black bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Cutting Edge<br />
            Cybersecurity For Future<br />
            Web Applications
          </h1>
          
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-white/90 bg-[#5D3FD3]/30 backdrop-blur-sm px-6 py-3 rounded-full inline-block">
              All-in-one quantum-resistant cryptography, authentication, P2P, file-sharing, and patent-pending messaging SDK
            </p>
            <p className="text-lg text-white/80">
              With advanced multi-layered cryptography and ratcheting
            </p>
          </div>

          <div className="pt-4">
            <Button
              size="lg"
              className="bg-[#5D3FD3] hover:bg-[#5D3FD3]/90 text-white min-w-[200px] text-lg"
            >
              Explore SDK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};