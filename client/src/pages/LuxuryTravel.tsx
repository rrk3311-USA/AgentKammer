import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mountain, Compass, Globe, Sparkles, MapPin, Calendar, Users } from "lucide-react";

interface JourneyPackage {
  id: number;
  destination: string;
  title: string;
  tagline: string;
  price: string;
  duration: string;
  groupSize: string;
  heroImage: string;
  highlights: string[];
  novelties: string[];
  adventureLevel: "High" | "Extreme" | "Moderate";
}

const journeyPackages: JourneyPackage[] = [
  {
    id: 1,
    destination: "New York",
    title: "Urban Peaks & Hidden Depths",
    tagline: "Scale skyscrapers and explore abandoned subway tunnels",
    price: "$12,500",
    duration: "5 Days",
    groupSize: "Max 6",
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    highlights: [
      "Private rooftop helicopter tour at sunrise",
      "Exclusive after-hours Metropolitan Museum access",
      "Urban rock climbing on historic buildings with expert guides"
    ],
    novelties: [
      "Guided exploration of NYC's abandoned City Hall subway station",
      "Secret speakeasy dinner in a Prohibition-era vault",
      "Midnight kayaking through Gowanus Canal with bioluminescent plankton",
      "Private graffiti art session with Banksy-affiliated street artists"
    ],
    adventureLevel: "High"
  },
  {
    id: 2,
    destination: "California",
    title: "Pacific Edge Odyssey",
    tagline: "Surf, climb, and soar through the Golden State",
    price: "$15,800",
    duration: "7 Days",
    groupSize: "Max 8",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    highlights: [
      "Dawn surf session with pro surfers at Mavericks",
      "Rock climbing El Capitan's lesser-known routes",
      "Paragliding over Big Sur coastline"
    ],
    novelties: [
      "Night dive with great white sharks off Farallon Islands (in cage)",
      "Private wine cave dinner 150ft underground in Napa",
      "Backcountry hot air balloon landing and wild foraging breakfast",
      "Exclusive Tesla Roadster coastal rally from SF to LA"
    ],
    adventureLevel: "Extreme"
  },
  {
    id: 3,
    destination: "Thailand",
    title: "Emerald Kingdom Expedition",
    tagline: "Temples, jungles, and uncharted islands",
    price: "$11,200",
    duration: "10 Days",
    groupSize: "Max 10",
    heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    highlights: [
      "Private longtail boat to undiscovered Andaman islands",
      "Jungle trekking with elephant conservation team",
      "Traditional Muay Thai training at historic Bangkok gym"
    ],
    novelties: [
      "Sunrise meditation with monks at hidden mountain temple",
      "Night kayaking through bioluminescent lagoons near Krabi",
      "Secret street food tour led by Michelin-starred chef",
      "Private access to royal palace gardens after hours",
      "Zip-lining through ancient rainforest canopy at dawn"
    ],
    adventureLevel: "Moderate"
  },
  {
    id: 4,
    destination: "Berlin",
    title: "Cold War Chronicles & Underground Culture",
    tagline: "History, art, and the city beneath the city",
    price: "$9,800",
    duration: "6 Days",
    groupSize: "Max 8",
    heroImage: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80",
    highlights: [
      "Exclusive tour of Stasi headquarters secret rooms",
      "Private concert in abandoned power plant",
      "Urban exploration of Cold War-era bunkers"
    ],
    novelties: [
      "Night cycling tour through former Berlin Wall 'death strip'",
      "Secret techno club experience in WWII bunker (invitation-only)",
      "Private graffiti workshop at East Side Gallery with original artists",
      "Abandoned airport exploration with urban archeologist",
      "Rooftop dinner atop former Tempelhof Airport runway"
    ],
    adventureLevel: "Moderate"
  }
];

export default function LuxuryTravel() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(10, 22, 40, 0.85), rgba(10, 22, 40, 0.75)), url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="absolute top-8 left-8 text-white hover:text-[#d4af37]"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Sparkles className="h-4 w-4 text-[#d4af37]" />
            <span className="text-sm font-medium text-white">Curated Luxury Journeys</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">
            Novelties<br />
            <span style={{ color: '#d4af37' }}>is our specialty</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed">
            One-of-a-kind experiences. Bespoke adventures. Unforgettable journeys.
          </p>
          
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            We don't sell vacations—we craft transformative expeditions that blend luxury with authentic adventure, cultural immersion with adrenaline, and exclusivity with genuine discovery.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5 text-[#d4af37]" />
              <span className="text-sm">High Adventure</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/50" />
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-[#d4af37]" />
              <span className="text-sm">Expert Guides</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/50" />
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#d4af37]" />
              <span className="text-sm">Exclusive Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Packages */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4">Featured Journeys</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each expedition is meticulously crafted to deliver experiences you won't find anywhere else
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {journeyPackages.map((journey) => (
            <Card 
              key={journey.id} 
              className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300"
              data-testid={`card-journey-${journey.id}`}
            >
              {/* Journey Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={journey.heroImage} 
                  alt={journey.destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Adventure Level Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-[#d4af37] text-[#0a1628]">
                  {journey.adventureLevel}
                </div>

                {/* Destination Label */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="h-5 w-5 text-[#d4af37]" />
                    <span className="text-2xl font-serif font-bold">{journey.destination}</span>
                  </div>
                </div>
              </div>

              {/* Journey Content */}
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold mb-2">{journey.title}</h3>
                <p className="text-muted-foreground mb-4 italic">{journey.tagline}</p>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{journey.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{journey.groupSize}</span>
                  </div>
                  <div className="font-semibold text-foreground">
                    {journey.price}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2 uppercase tracking-wide">Adventure Highlights</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {journey.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#d4af37] mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Novelties */}
                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-[#d4af37]" />
                    <h4 className="font-semibold text-sm uppercase tracking-wide">One-of-a-Kind Experiences</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {journey.novelties.map((novelty, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#d4af37] font-bold text-xs mt-0.5">✦</span>
                        <span>{novelty}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button 
                  className="w-full rounded-full font-semibold"
                  data-testid={`button-inquire-${journey.id}`}
                >
                  Inquire About This Journey
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(10, 22, 40, 0.9), rgba(10, 22, 40, 0.9)), url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Your<br />
            <span style={{ color: '#d4af37' }}>Next Adventure?</span>
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Let us design a bespoke journey tailored to your wildest dreams. No two expeditions are ever the same.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="rounded-full text-black font-semibold px-8"
              data-testid="button-schedule-consultation"
            >
              Schedule a Consultation
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              data-testid="button-view-all-journeys"
            >
              View All Journeys
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
