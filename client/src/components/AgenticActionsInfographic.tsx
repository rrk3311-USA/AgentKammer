import { Clock, Zap, TrendingUp, Search, Bell, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AgenticActionsInfographic() {
  const actions = [
    { icon: Search, label: "Continuous Market Scanning", color: "text-blue-600" },
    { icon: Zap, label: "Instant Alert Processing", color: "text-yellow-600" },
    { icon: TrendingUp, label: "Price Trend Analysis", color: "text-green-600" },
    { icon: Bell, label: "Smart Notifications", color: "text-purple-600" },
    { icon: Shield, label: "Competitive Bidding Intelligence", color: "text-red-600" },
  ];

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Powered by AI
          </Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-2">
            Agentic Actions
          </h2>
          <p className="text-muted-foreground">
            While you sleep, Agent Kammer works — performing massive compute to find your perfect home
          </p>
        </div>

        {/* Top Hat Icon at Center */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center shadow-xl">
            <div className="text-4xl">🎩</div>
          </div>
        </div>

        {/* Connecting Line */}
        <div className="flex justify-center mb-8">
          <div className="w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent" />
        </div>

        {/* Branching Actions */}
        <div className="relative mb-16">
          {/* Center Node */}
          <div className="flex justify-center mb-8">
            <div className="bg-card border border-border rounded-xl px-6 py-3 shadow-lg">
              <p className="font-semibold text-sm">Massive Compute Engine</p>
            </div>
          </div>

          {/* Branch Lines */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full h-24">
            <svg className="w-full h-full" style={{ overflow: 'visible' }}>
              {/* Left branches */}
              <path
                d="M 50% 0 Q 30% 50, 15% 100"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.3"
                strokeDasharray="4 4"
              />
              <path
                d="M 50% 0 Q 40% 50, 35% 100"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.3"
                strokeDasharray="4 4"
              />
              {/* Center branch */}
              <path
                d="M 50% 0 L 50% 100"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.3"
                strokeDasharray="4 4"
              />
              {/* Right branches */}
              <path
                d="M 50% 0 Q 60% 50, 65% 100"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.3"
                strokeDasharray="4 4"
              />
              <path
                d="M 50% 0 Q 70% 50, 85% 100"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                opacity="0.3"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-24">
            {actions.map((action, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-4 text-center hover-elevate transition-all shadow-md"
                data-testid={`card-action-${index}`}
              >
                <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <p className="text-xs font-medium leading-tight">{action.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Banner */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 lg:p-10 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-4xl lg:text-5xl font-serif font-bold text-primary">240hrs</p>
                  <p className="text-sm text-muted-foreground">Average time buyers spend searching</p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left border-l-0 md:border-l-2 border-primary/20 md:pl-8">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Zap className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-4xl lg:text-5xl font-serif font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Agent Kammer works for you</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-primary/20">
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-serif font-semibold text-foreground mb-2">
                "When brokers compete, you win"
              </p>
              <p className="text-sm text-muted-foreground">
                Our AI negotiates on your behalf, finding the best deals across all listings
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
