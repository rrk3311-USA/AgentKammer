import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Plane, 
  ArrowRight, 
  Mail,
  Calendar,
  MapPin,
  Star,
  Clock,
  Utensils,
  Waves,
  Building2,
  Mountain,
  Sparkles
} from "lucide-react";
import japanRyokanImage from '@assets/generated_images/japanese_ryokan_hot_spring_inn.png';
import singaporeHotelImage from '@assets/generated_images/singapore_marina_bay_luxury_hotel.png';
import hawaiiResortImage from '@assets/generated_images/hawaii_beach_resort_paradise.png';

const FEATURED_DEALS = [
  {
    id: 'japan-ryokan',
    title: 'Japan Ryokan',
    destination: 'Japan',
    tagline: 'Traditional Hot Spring Experience',
    description: 'Immerse yourself in centuries-old Japanese hospitality at a traditional ryokan. Wake up to the sound of bamboo fountains, soak in natural hot springs (onsen), and savor authentic kaiseki cuisine prepared by master chefs.',
    fullPitch: 'These handpicked ryokans offer the perfect blend of cultural immersion and serene relaxation. From the moment you slip into your yukata and step onto the tatami floors, you\'ll understand why this centuries-old tradition has captivated travelers from around the world. Each property has been carefully vetted for authenticity, service excellence, and that ineffable sense of Japanese harmony that can only be experienced, never explained.',
    discount: 'Up to 15% off',
    partnerName: 'Hotels.com',
    imageUrl: japanRyokanImage,
    highlights: [
      { icon: Waves, text: 'Natural Hot Springs (Onsen)' },
      { icon: Utensils, text: 'Authentic Kaiseki Cuisine' },
      { icon: Mountain, text: 'Scenic Mountain Views' },
      { icon: Sparkles, text: 'Traditional Tatami Rooms' },
    ],
    bestFor: 'Couples, Solo Travelers, Cultural Enthusiasts',
    avgSavings: '$180-$350 per stay',
  },
  {
    id: 'singapore-staycations',
    title: 'Singapore',
    destination: 'Singapore',
    tagline: 'Marina Bay Luxury Staycations',
    description: 'Experience the dazzling skyline of Marina Bay from world-class hotels that redefine luxury. From infinity pools overlooking the city to Michelin-starred restaurants at your doorstep.',
    fullPitch: 'These curated properties offer exclusive member rates you won\'t find elsewhere. Perfect for business travelers seeking seamless convenience and leisure seekers craving urban sophistication. Whether you\'re closing deals by day and dining at celebrity chef restaurants by night, or treating yourself to spa retreats with city views, Singapore\'s finest hotels deliver experiences that match the Lion City\'s legendary standards.',
    discount: 'Up to 20% off',
    partnerName: 'Hotels.com',
    imageUrl: singaporeHotelImage,
    highlights: [
      { icon: Building2, text: 'Iconic Marina Bay Views' },
      { icon: Star, text: 'Michelin-Starred Dining' },
      { icon: Waves, text: 'Rooftop Infinity Pools' },
      { icon: Sparkles, text: 'World-Class Spas' },
    ],
    bestFor: 'Business Travelers, Luxury Seekers, Food Lovers',
    avgSavings: '$250-$500 per stay',
  },
  {
    id: 'hawaii-resorts',
    title: 'Hawaii',
    destination: 'Hawaii',
    tagline: 'Beach Resort Paradise',
    description: 'Escape to the sun-kissed shores of Hawaii\'s finest beach resorts. Whether you\'re seeking adventure on Maui\'s volcanic landscapes or relaxation on Oahu\'s pristine beaches.',
    fullPitch: 'From the Big Island\'s dramatic lava formations to Kauai\'s emerald valleys, these oceanfront properties deliver unforgettable experiences with significant savings. Each resort has been selected for its exceptional location, authentic Hawaiian hospitality, and commitment to the aloha spirit. Wake to the sound of waves, spend your days exploring tropical gardens, snorkeling crystal waters, or simply unwinding under swaying palms.',
    discount: 'Up to 25% off',
    partnerName: 'Hotels.com',
    imageUrl: hawaiiResortImage,
    highlights: [
      { icon: Waves, text: 'Oceanfront Locations' },
      { icon: Mountain, text: 'Volcano Tours Available' },
      { icon: Star, text: 'Authentic Luau Experiences' },
      { icon: Sparkles, text: 'World-Class Snorkeling' },
    ],
    bestFor: 'Families, Honeymooners, Adventure Seekers',
    avgSavings: '$300-$600 per stay',
  }
];

export default function TravelDeals() {
  const [selectedDealId, setSelectedDealId] = useState(FEATURED_DEALS[0].id);
  const selectedDeal = FEATURED_DEALS.find(d => d.id === selectedDealId) || FEATURED_DEALS[0];
  
  const currentWeek = Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="py-12 lg:py-16 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
              border: '2px solid rgba(212,175,55,0.3)'
            }}>
              <Plane className="h-7 w-7 text-[#d4af37]" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Weekly Travel Deals
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-4">
            3 handpicked destinations with exclusive partner rates
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Week {currentWeek}</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Updated Mondays</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Cards - Destination Selector */}
      <section className="pb-4">
        <div className="max-w-5xl mx-auto px-6">
          <div 
            className="grid grid-cols-3 gap-3 lg:gap-4"
            role="tablist"
            aria-label="Select destination"
          >
            {FEATURED_DEALS.map((deal) => {
              const isSelected = deal.id === selectedDealId;
              return (
                <button
                  key={deal.id}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${deal.id}`}
                  onClick={() => setSelectedDealId(deal.id)}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                    isSelected 
                      ? 'ring-2 ring-[#d4af37] shadow-lg shadow-[#d4af37]/20' 
                      : 'opacity-50 hover:opacity-75'
                  }`}
                  data-testid={`tab-destination-${deal.id}`}
                >
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={deal.imageUrl} 
                      alt={deal.destination}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent' 
                        : 'bg-black/40'
                    }`} />
                    <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
                      <h3 className={`font-bold text-sm lg:text-lg transition-all ${
                        isSelected ? 'text-white' : 'text-white/80'
                      }`}>
                        {deal.title}
                      </h3>
                      {isSelected && (
                        <span className="text-[#00d4ff] text-xs lg:text-sm font-semibold">
                          {deal.discount}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-[#d4af37] text-[#0a1628] text-xs">
                          Selected
                        </Badge>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected Deal Detail Panel */}
      <section 
        className="py-8 lg:py-12"
        role="tabpanel"
        id={`panel-${selectedDeal.id}`}
        aria-labelledby={`tab-destination-${selectedDeal.id}`}
      >
        <div className="max-w-5xl mx-auto px-6">
          <Card className="overflow-hidden bg-white/5 border-white/10" data-testid={`panel-detail-${selectedDeal.id}`}>
            {/* Hero Image */}
            <div className="relative h-64 lg:h-80">
              <img 
                src={selectedDeal.imageUrl} 
                alt={selectedDeal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-[#d4af37]" />
                  <span className="text-[#d4af37] font-medium">{selectedDeal.destination}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {selectedDeal.tagline}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-[#00d4ff]">{selectedDeal.discount}</span>
                  <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">
                    via {selectedDeal.partnerName}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-10">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Pitch */}
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-lg text-white/80 leading-relaxed">
                    {selectedDeal.description}
                  </p>
                  <p className="text-white/60 leading-relaxed">
                    {selectedDeal.fullPitch}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {selectedDeal.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#d4af37]/10">
                          <highlight.icon className="h-5 w-5 text-[#d4af37]" />
                        </div>
                        <span className="text-white/80 text-sm">{highlight.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h4 className="text-white font-semibold mb-3">Best For</h4>
                    <p className="text-white/70 text-sm">{selectedDeal.bestFor}</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h4 className="text-white font-semibold mb-3">Average Savings</h4>
                    <p className="text-[#00d4ff] text-xl font-bold">{selectedDeal.avgSavings}</p>
                  </div>

                  <Button 
                    className="w-full bg-[#d4af37] text-[#0a1628] hover:bg-[#d4af37]/90 h-12 text-base"
                    data-testid={`button-book-${selectedDeal.id}`}
                  >
                    View Deal <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-slate-900/50 to-[#0a1628]">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Never Miss a Deal</h2>
          <p className="text-white/60 mb-6 text-sm">
            Get weekly travel deals in your inbox every Monday.
          </p>
          <form 
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
              const email = emailInput.value;
              if (email) {
                try {
                  const response = await fetch('/api/travel-deals/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                  });
                  if (response.ok) {
                    emailInput.value = '';
                    alert('Subscribed! Check your inbox for weekly travel deals.');
                  } else {
                    const data = await response.json();
                    alert(data.message || 'Failed to subscribe');
                  }
                } catch {
                  alert('Failed to subscribe. Please try again.');
                }
              }
            }}
          >
            <input 
              type="email" 
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#d4af37]"
              data-testid="input-travel-deals-page-email"
            />
            <Button 
              type="submit"
              className="bg-[#d4af37] text-[#0a1628] hover:bg-[#d4af37]/90 px-6"
              data-testid="button-subscribe-travel-deals-page"
            >
              <Mail className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-6 text-center">
        <Link href="/">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Back to Home
          </Button>
        </Link>
      </section>
    </div>
  );
}
