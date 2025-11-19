import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sparkles, Heart, TrendingUp, Target, Lightbulb, Users, Calendar, ArrowRight, CheckCircle2, Star } from "lucide-react";

interface CoachingOffer {
  id: string;
  title: string;
  duration: string;
  sessions: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  available: boolean;
}

export default function Coaching() {
  const [email, setEmail] = useState("");

  const coachingOffers: CoachingOffer[] = [
    {
      id: "clarity",
      title: "Clarity & Vision Session",
      duration: "90 minutes",
      sessions: "Single Session",
      price: "$497",
      description: "Get crystal clear on your next chapter. Identify what's holding you back and create a roadmap for transformational change.",
      features: [
        "Deep dive into your current state and desired future",
        "Identify limiting beliefs and breakthrough barriers",
        "Create your personal transformation roadmap",
        "90-day action plan with accountability milestones"
      ],
      available: true
    },
    {
      id: "alignment",
      title: "Alignment Accelerator",
      duration: "6 weeks",
      sessions: "6 Sessions",
      price: "$2,997",
      description: "Transform your relationship with success. Align your daily actions with your deepest values and watch everything shift.",
      features: [
        "Weekly 60-minute 1-on-1 coaching calls",
        "Personalized alignment framework",
        "Daily check-in support via text/email",
        "Custom exercises and practices",
        "Values clarification workshop",
        "Success metrics and tracking system"
      ],
      highlight: true,
      available: true
    },
    {
      id: "mastery",
      title: "Mastery & Integration",
      duration: "12 weeks",
      sessions: "12 Sessions",
      price: "$5,997",
      description: "The complete transformation journey. Master the art of aligned living and create lasting change that compounds over time.",
      features: [
        "Weekly 90-minute deep-dive sessions",
        "Unlimited text/email support",
        "Custom transformation toolkit",
        "Quarterly vision board & planning session",
        "Life design framework",
        "Habit architecture system",
        "Integration practices for sustainable change",
        "6-month follow-up session"
      ],
      available: true
    },
    {
      id: "vip",
      title: "VIP Transformation Day",
      duration: "Full Day",
      sessions: "Intensive",
      price: "$7,500",
      description: "An immersive, full-day experience designed for high-achievers ready to breakthrough and redesign their entire life strategy.",
      features: [
        "8-hour intensive 1-on-1 session",
        "Manhattan location (private setting)",
        "Complete life audit and redesign",
        "Strategic planning for all life areas",
        "Custom transformation playbook",
        "30 days of post-intensive support",
        "Luxury lunch included"
      ],
      available: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 via-background to-background" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-[#d4af37]" />
            <Badge variant="outline" className="text-sm font-medium border-[#d4af37] text-[#d4af37]">
              Live Offerings
            </Badge>
            <Sparkles className="h-6 w-6 text-[#d4af37]" />
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Transformational
            <br />
            <span className="text-[#d4af37]">Alignment Coaching</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Where high achievers come to align their outer success with their inner truth. 
            Because winning in life means more than winning in real estate.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#d4af37]" />
              <span>1-on-1 Coaching</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#d4af37]" />
              <span>Custom Programs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#d4af37]" />
              <span>Proven Framework</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Offerings List */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 mb-4">
            <div className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-sm font-medium text-[#d4af37]">Live & Available Now</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Choose Your Transformation Path
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coachingOffers.map((offer) => (
            <Card 
              key={offer.id}
              className={`hover-elevate ${offer.highlight ? 'border-[#d4af37] shadow-lg shadow-[#d4af37]/10' : ''}`}
              data-testid={`card-coaching-${offer.id}`}
            >
              <CardHeader>
                {offer.highlight && (
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
                    <Badge className="bg-[#d4af37] text-[#0a1628]">Most Popular</Badge>
                  </div>
                )}
                
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{offer.title}</CardTitle>
                    <CardDescription className="text-base">
                      {offer.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#d4af37]" data-testid={`price-${offer.id}`}>{offer.price}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span data-testid={`duration-${offer.id}`}>{offer.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span data-testid={`sessions-${offer.id}`}>{offer.sessions}</span>
                  </div>
                  {offer.available && (
                    <Badge variant="outline" className="text-green-600 border-green-600" data-testid={`availability-${offer.id}`}>
                      Available
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  {offer.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground" data-testid={`feature-${offer.id}-${idx + 1}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-[#d4af37] text-black font-semibold"
                  data-testid={`button-book-${offer.id}`}
                >
                  Book Your Session
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* What Is Transformational Alignment */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            What Is Transformational Alignment?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate" data-testid="card-pillar-clarity">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-[#d4af37]" />
                </div>
                <CardTitle>Deep Clarity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Uncover what truly matters to you beneath the noise of society's expectations and your own limiting beliefs.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-pillar-alignment">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-[#d4af37]" />
                </div>
                <CardTitle>Authentic Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bridge the gap between who you are and how you show up. Live in integrity with your deepest values.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-pillar-transformation">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-[#d4af37]" />
                </div>
                <CardTitle>Lasting Transformation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create sustainable change that compounds over time. Not quick fixes, but deep shifts that last.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            This Is For You If...
          </h2>

          <div className="space-y-4">
            {[
              "You've achieved external success but feel something's still missing",
              "You're ready to stop living on autopilot and start living with intention",
              "You know there's a gap between who you are and who you're capable of becoming",
              "You're willing to do the deep work that most people avoid",
              "You want a partner who will challenge you, not just validate you",
              "You're committed to creating lasting change, not temporary motivation"
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover-elevate"
                data-testid={`criteria-${idx + 1}`}
              >
                <Heart className="h-5 w-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Begin?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the waitlist to receive updates on new coaching offerings and exclusive early access.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              data-testid="input-email-waitlist"
            />
            <Button 
              type="submit"
              size="lg"
              className="bg-[#d4af37] text-black font-semibold"
              data-testid="button-join-waitlist"
            >
              Join Waitlist
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            No spam. Just occasional insights and coaching updates.
          </p>
        </div>
      </section>
    </div>
  );
}
