import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Bell, Search, TrendingUp } from "lucide-react";
import { SiApple, SiGoogleplay } from "react-icons/si";

export function AppDownload() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(184,134,11,0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(184,134,11,0.08)_0%,_transparent_50%)]" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 bg-background/20 border-background/30 text-background">
            <Smartphone className="h-3 w-3 mr-1" />
            Download the App
          </Badge>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-6 text-background">
            Your NYC Real Estate
            <br />
            Command Center
          </h2>
          <p className="text-lg text-background/90 max-w-2xl mx-auto">
            Access Manhattan's most exclusive properties, receive instant alerts, and never miss an opportunity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-background/10 border-background/20 backdrop-blur p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold mb-2 text-background">
              Instant Alerts
            </h3>
            <p className="text-sm text-background/80">
              Real-time notifications for new listings matching your criteria
            </p>
          </Card>

          <Card className="bg-background/10 border-background/20 backdrop-blur p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold mb-2 text-background">
              Smart Search
            </h3>
            <p className="text-sm text-background/80">
              AI-powered recommendations based on your preferences
            </p>
          </Card>

          <Card className="bg-background/10 border-background/20 backdrop-blur p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold mb-2 text-background">
              Market Analytics
            </h3>
            <p className="text-sm text-background/80">
              Live market data and property value insights
            </p>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 text-black px-8 gap-3"
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
            className="rounded-full bg-primary hover:bg-primary/90 text-black px-8 gap-3"
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
