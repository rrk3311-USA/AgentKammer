import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Bell, Search } from "lucide-react";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { HappyDocIcon } from "./HappyDocIcon";

export function AppDownload() {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(184,134,11,0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(184,134,11,0.08)_0%,_transparent_50%)]" />
      
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-background/20 border-background/30 text-background">
            <Smartphone className="h-3 w-3 mr-1" />
            Download the App
          </Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4 text-background">
            Your NYC Real Estate Command Center
          </h2>
          <p className="text-base text-background/90 max-w-xl mx-auto">
            Access Manhattan's most exclusive properties, receive instant alerts, and never miss an opportunity
          </p>
        </div>

        <Card className="bg-background/10 border-background/20 backdrop-blur p-6 shadow-lg mb-8">
          <div className="flex items-start gap-6 flex-wrap justify-center">
            <div className="flex items-start gap-3 flex-1 min-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-serif text-base font-semibold mb-1 text-background">
                  Instant Alerts
                </h3>
                <p className="text-xs text-background/80">
                  Real-time notifications for new listings
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 flex-1 min-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-serif text-base font-semibold mb-1 text-background">
                  Smart Search
                </h3>
                <p className="text-xs text-background/80">
                  AI-powered property recommendations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 flex-1 min-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <HappyDocIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-serif text-base font-semibold mb-1 text-background">
                  Market Analytics
                </h3>
                <p className="text-xs text-background/80">
                  Live data and property insights
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 px-8 gap-3"
            data-testid="button-app-store"
          >
            <SiApple className="h-6 w-6" />
            <div className="text-left">
              <div className="text-xs opacity-80">Download on the</div>
              <div className="text-sm font-semibold">App Store</div>
            </div>
          </Button>

          <Button
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 px-8 gap-3"
            data-testid="button-google-play"
          >
            <SiGoogleplay className="h-6 w-6" />
            <div className="text-left">
              <div className="text-xs opacity-80">Get it on</div>
              <div className="text-sm font-semibold">Google Play</div>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
}
