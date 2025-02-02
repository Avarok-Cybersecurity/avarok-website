import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    
    // Show success toast
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/284df137-173c-4f8e-bcd6-b482ea4a6af1.png')] bg-cover bg-center bg-no-repeat brightness-[0.15]" />
      
      {/* Contact Form */}
      <div className="relative py-24 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-primary" />
            Contact
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/90 backdrop-blur-sm border-0"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/90 backdrop-blur-sm border-0"
            />
          </div>
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[150px] bg-white/90 backdrop-blur-sm border-0"
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>

        <div className="mt-12 text-center text-white space-y-2">
          <p>251 Little Falls Drive</p>
          <p>Wilmington, DE, 19808</p>
          <a href="mailto:contact@avarok.net" className="text-primary hover:underline">
            contact@avarok.net
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-white hover:text-white/80 transition-colors">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};