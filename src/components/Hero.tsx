import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    // Lazy load the background image
    const loadImage = async () => {
      try {
        const imageUrl = "/lovable-uploads/c65270fb-3f6f-4f6f-998d-e6f281df9ce3.png";
        const img = new Image();
        img.src = imageUrl;
        await img.decode(); // Wait for the image to be decoded
        console.log("Background image loaded successfully");
        setBgImage(imageUrl);
        setIsImageLoaded(true);
      } catch (error) {
        console.error("Error loading background image:", error);
      }
    };

    loadImage();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Placeholder background color while image loads */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Background image with fade-in effect */}
      {bgImage && (
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight animate-fade-in">
            Cutting Edge<br />
            Cybersecurity For Future<br />
            Web Applications
          </h1>
          
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-white/90 bg-[#5D3FD3]/30 backdrop-blur-sm px-6 py-3 rounded-full inline-block animate-fade-in" style={{ animationDelay: '200ms' }}>
              All-in-one quantum-resistant cryptography, authentication, P2P, file-sharing, and patent-pending messaging SDK
            </p>
            <p className="text-lg text-white/80 animate-fade-in" style={{ animationDelay: '400ms' }}>
              With advanced multi-layered cryptography and ratcheting
            </p>
          </div>

          <div className="pt-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
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