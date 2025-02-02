import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        to_email: 'thomas@avarok.net',
        message: message,
      };

      await emailjs.send(
        'service_avarok',  // Service ID from EmailJS
        'template_avarok', // Template ID from EmailJS
        templateParams,
        'YOUR_PUBLIC_KEY'  // Public Key from EmailJS
      );

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/99754b9b-d1e8-46f9-9afd-9177f1c99500.png')] bg-cover bg-center bg-no-repeat brightness-[0.15]" />
      
      {/* Contact Form */}
      <div className="relative py-24 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#6D52D8]" />
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
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/90 backdrop-blur-sm border-0"
              required
            />
          </div>
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[150px] bg-white/90 backdrop-blur-sm border-0"
            required
          />
          <Button 
            type="submit" 
            className="w-full bg-[#6D52D8] hover:bg-[#6D52D8]/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </form>

        <div className="mt-12 text-center text-white space-y-2">
          <p>251 Little Falls Drive</p>
          <p>Wilmington, DE, 19808</p>
          <a href="mailto:contact@avarok.net" className="text-[#6D52D8] hover:underline">
            contact@avarok.net
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-[#6D52D8] py-6">
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