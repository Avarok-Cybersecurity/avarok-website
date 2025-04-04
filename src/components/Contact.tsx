import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Linkedin } from "lucide-react";
import emailjs from '@emailjs/browser';

// These are public keys, safe to expose in frontend code
const EMAILJS_SERVICE_ID = "service_f8jjzfg";
const EMAILJS_TEMPLATE_ID = "template_rigpoba";
const EMAILJS_PUBLIC_KEY = "ciBuyXvR_S4IDbXnl";

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
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
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
    <section id="contact" className="relative">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/99754b9b-d1e8-46f9-afd-9177f1c99500.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-[#1A1F2C]/90" />
      </div>
      
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
              className="bg-white/95 backdrop-blur-sm border-0 text-[#1A1F2C]"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/95 backdrop-blur-sm border-0 text-[#1A1F2C]"
              required
            />
          </div>
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[150px] bg-white/95 backdrop-blur-sm border-0 text-[#1A1F2C]"
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
      </div>

      <div className="relative bg-[#6D52D8] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-white">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a href="https://www.linkedin.com/company/avarok/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors">
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <div className="text-white/90 font-medium">
                <span className="mr-2">251 Little Falls Drive, Wilmington, DE, 19808</span>
                <span className="mx-2">|</span>
                <a href="mailto:contact@avarok.net" className="text-white hover:text-white/80 transition-colors">
                  contact@avarok.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
