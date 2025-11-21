import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

// Import luxury property images
import barImage1 from "@assets/IMG_1357_1762925446647.jpeg";
import barImage2 from "@assets/IMG_1356_1762925446647.jpeg";
import barImage3 from "@assets/IMG_1358_1762925446647.jpeg";
import interiorImage from "@assets/IMG_1355_1762925446647.jpeg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    
    // Show success message
    const toast = document.createElement("div");
    toast.textContent = "Thank you! We'll be in touch within 24 hours.";
    toast.className = "fixed top-4 right-4 bg-[#d4af37] text-black px-6 py-3 rounded-lg shadow-lg z-50 font-semibold";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
    
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Photo Collage */}
      <section className="relative h-[60vh] overflow-hidden">
        {/* Photo Grid Collage */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1">
          <div className="col-span-2 row-span-2 relative overflow-hidden">
            <img 
              src={barImage1} 
              alt="Luxury Bar Interior" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <img 
              src={barImage2} 
              alt="Elegant Lighting Fixtures" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <img 
              src={barImage3} 
              alt="Luxury Bar Details" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 relative overflow-hidden">
            <img 
              src={interiorImage} 
              alt="Elegant Interior Design" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Secure, private, zero-knowledge encrypted communication
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
                  Agent Kammer
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Encrypted Real Estate Concierge serving NYC, California, and Nevada
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6 hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+1 (212) 555-LUXE</p>
                      <p className="text-sm text-muted-foreground">Mon-Sun: 8am - 10pm EST</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">agent@agentkammer.com</p>
                      <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Markets</h3>
                      <p className="text-muted-foreground">New York City</p>
                      <p className="text-muted-foreground">California (SF, LA, SD)</p>
                      <p className="text-muted-foreground">Nevada (Las Vegas)</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover-elevate">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 8am - 8pm</p>
                      <p className="text-muted-foreground">Saturday - Sunday: 9am - 6pm</p>
                      <p className="text-sm text-[#d4af37] mt-1">Available by appointment 24/7</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              {/* AI Chat Reference */}
              <Card className="p-6 bg-gradient-to-br from-[#d4af37]/5 to-[#d4af37]/10 border border-[#d4af37]/30 mb-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎩</div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-[#d4af37]">Quick Questions?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Most questions can be answered instantly with our AI concierge chatbot! Get immediate assistance 24/7.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                      onClick={() => {
                        const chatButton = document.querySelector('[data-testid="button-open-chat"]') as HTMLElement;
                        if (chatButton) chatButton.click();
                      }}
                      data-testid="button-open-chat-from-contact"
                    >
                      Chat with Agent K
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-background to-muted/20 border-2 border-[#d4af37]/20">
                <h3 className="font-serif text-2xl font-bold mb-2">Send Us a Message</h3>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Smith"
                      required
                      className="h-12"
                      data-testid="input-contact-name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="h-12"
                      data-testid="input-contact-email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="h-12"
                      data-testid="input-contact-phone"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your real estate needs..."
                      required
                      rows={6}
                      className="resize-none"
                      data-testid="textarea-contact-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 bg-[#d4af37] text-black font-semibold hover:bg-[#c5a028]"
                    data-testid="button-contact-submit"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] to-[#1a2640] text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Let Agent Kammer guide you through the luxury real estate market with AI-powered insights and personalized service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-12 px-8 bg-[#d4af37] text-black font-semibold hover:bg-[#c5a028]"
              onClick={() => window.location.href = '/'}
              data-testid="button-contact-browse"
            >
              Browse Properties
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-white text-white hover:bg-white/10"
              onClick={() => {
                const chatButton = document.querySelector('[data-testid="button-open-chat"]') as HTMLButtonElement;
                if (chatButton) chatButton.click();
              }}
              data-testid="button-contact-chat"
            >
              Chat with Agent
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
