import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageSquare, TrendingDown, Home, Bell } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import agentKammerImg from "@assets/generated_images/Transparent_background_luxury_character_6779407b.png";

interface DigestProperty {
  id: string;
  image: string;
  price: number;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

interface EmailDigestPreviewProps {
  properties: DigestProperty[];
}

export function EmailDigestPreview({ properties }: EmailDigestPreviewProps) {
  const { toast } = useToast();
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SMS signup:", phone);
    toast({
      title: "Success!",
      description: "You'll start receiving property alerts via text.",
    });
    setPhone("");
  };

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side: Agent Kammer with floating modules */}
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Agent Kammer Image */}
            <div className="relative z-10">
              <img 
                src={agentKammerImg} 
                alt="Agent Kammer" 
                className="h-[400px] lg:h-[500px] w-auto object-contain"
              />
            </div>

            {/* Floating Module - Top Left */}
            <Card className="absolute top-8 left-4 lg:left-12 bg-white/95 backdrop-blur-xl border-white/60 shadow-2xl p-5 max-w-[200px] hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-gray-800">Instant Alerts</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Get notified the second a new listing matches your criteria
              </p>
            </Card>

            {/* Floating Module - Right side (where hand points) - LIFTED STYLE */}
            <Card className="absolute top-32 right-8 lg:right-16 bg-white/95 backdrop-blur-xl border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-5 max-w-[220px] hover:scale-105 transition-all transform hover:-translate-y-2">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">Text Alerts</span>
                </div>
                <Input
                  id="phone-number-float"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-10 text-sm bg-white border-gray-200"
                  data-testid="input-phone-number"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="w-full text-sm h-9 bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid="button-subscribe-sms"
                >
                  Subscribe
                </Button>
              </form>
            </Card>

            {/* Floating Module - Bottom Left */}
            <Card className="absolute bottom-12 left-8 bg-white/95 backdrop-blur-xl border-white/60 shadow-2xl p-5 max-w-[180px] hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-green-600" />
                <span className="text-sm font-bold text-gray-800">Price Drops</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Track price changes on your favorites
              </p>
            </Card>

            {/* Floating Module - Bottom Right */}
            <Card className="absolute bottom-20 right-4 lg:right-8 bg-white/95 backdrop-blur-xl border-white/60 shadow-2xl p-4 max-w-[160px] hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-2">
                <Home className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-gray-800">New Listings</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">47</div>
              <p className="text-xs text-gray-600">this week</p>
            </Card>
          </div>

          {/* Right side: Welcome text */}
          <div className="text-white space-y-4">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
              Hello,<br />
              <span className="text-white/90">Welcome to Agent Kammer</span>
            </h2>
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
              Get the texts that matter to you. Instant property alerts delivered right to your phone.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-white/80">Properties</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-white/80">Monitoring</div>
              </div>
              <div>
                <div className="text-2xl font-bold">Instant</div>
                <div className="text-sm text-white/80">Alerts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
