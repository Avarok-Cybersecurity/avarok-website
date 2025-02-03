import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Linkedin } from "lucide-react";
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
    
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are not set');
      toast({
        title: "Configuration Error",
        description: "Email service is not properly configured.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        to_email: 'thomas@avarok.net',
        message: message,
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
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

        <div className="mt-8 text-center">
          <div className="glass-card p-4 rounded-lg inline-block mx-auto bg-white/10 backdrop-blur-sm">
            <p className="text-white font-medium">251 Little Falls Drive</p>
            <p className="text-white font-medium">Wilmington, DE, 19808</p>
            <a href="mailto:contact@avarok.net" className="text-[#6D52D8] hover:text-[#6D52D8]/80 font-medium transition-colors">
              contact@avarok.net
            </a>
          </div>
        </div>
      </div>

      <div className="relative bg-[#6D52D8] py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <a href="https://www.linkedin.com/company/avarok/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
