import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Plane, 
  ArrowRight, 
  Mail,
  Calendar,
  MapPin
} from "lucide-react";
import type { TravelDeal } from "@shared/schema";
import japanRyokanImage from '@assets/generated_images/japanese_ryokan_hot_spring_inn.png';
import singaporeHotelImage from '@assets/generated_images/singapore_marina_bay_luxury_hotel.png';
import hawaiiResortImage from '@assets/generated_images/hawaii_beach_resort_paradise.png';

const FEATURED_DEALS = [
  {
    id: 'japan-ryokan',
    title: 'Japan Ryokan Experience',
    destination: 'Japan',
    description: 'Immerse yourself in centuries-old Japanese hospitality at a traditional ryokan. Wake up to the sound of bamboo fountains, soak in natural hot springs (onsen), and savor authentic kaiseki cuisine prepared by master chefs. These handpicked ryokans offer the perfect blend of cultural immersion and serene relaxation.',
    discount: 'Up to 15% off',
    partnerName: 'Hotels.com',
    imageUrl: japanRyokanImage,
  },
  {
    id: 'singapore-staycations',
    title: 'Singapore Staycations',
    destination: 'Singapore',
    description: 'Experience the dazzling skyline of Marina Bay from world-class hotels that redefine luxury. From infinity pools overlooking the city to Michelin-starred restaurants at your doorstep, these curated properties offer exclusive member rates you won\'t find elsewhere. Perfect for business travelers and leisure seekers alike.',
    discount: 'Up to 20% off',
    partnerName: 'Hotels.com',
    imageUrl: singaporeHotelImage,
  },
  {
    id: 'hawaii-resorts',
    title: 'Hawaii Beach Resorts',
    destination: 'Hawaii',
    description: 'Escape to the sun-kissed shores of Hawaii\'s finest beach resorts. Whether you\'re seeking adventure on Maui\'s volcanic landscapes, relaxation on Oahu\'s pristine beaches, or exploration on the Big Island, these oceanfront properties deliver unforgettable experiences with significant savings.',
    discount: 'Up to 25% off',
    partnerName: 'Hotels.com',
    imageUrl: hawaiiResortImage,
  }
];

export default function TravelDeals() {
  const { data: deals = [] } = useQuery<TravelDeal[]>({
    queryKey: ['/api/travel-deals'],
  });

  const currentWeek = Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.3), rgba(212,175,55,0.05))',
              border: '2px solid rgba(212,175,55,0.3)'
            }}>
              <Plane className="h-8 w-8 text-[#d4af37]" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Weekly Travel Deals
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Every week, our travel experts handpick 3 exceptional destinations with exclusive rates from our trusted partners.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Week {currentWeek}, {new Date().getFullYear()}</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Published every Monday</span>
            </div>
          </div>
        </div>
      </section>

      {/* This Week's Deals */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 mb-4">This Week's Picks</Badge>
            <h2 className="text-3xl font-bold text-white mb-3">Featured Destinations</h2>
            <p className="text-white/60">Curated deals selected by our travel experts</p>
          </div>

          <div className="space-y-12">
            {FEATURED_DEALS.map((deal, index) => (
              <Card 
                key={deal.id}
                className="overflow-hidden bg-white/5 border-white/10"
                data-testid={`card-travel-deal-${deal.id}`}
              >
                <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                  {/* Image */}
                  <div className="lg:w-1/2">
                    <img 
                      src={deal.imageUrl} 
                      alt={deal.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="h-5 w-5 text-[#d4af37]" />
                      <span className="text-[#d4af37] font-medium">{deal.destination}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">{deal.title}</h3>
                    <p className="text-white/70 mb-6 leading-relaxed">{deal.description}</p>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-bold text-[#00d4ff]">{deal.discount}</span>
                      <Badge className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">{deal.partnerName}</Badge>
                    </div>
                    <Button className="bg-[#d4af37] text-[#0a1628] hover:bg-[#d4af37]/90 w-full lg:w-auto" data-testid={`button-book-${deal.id}`}>
                      View Deal <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-slate-900 to-[#0a1628]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Deal</h2>
          <p className="text-white/70 mb-8">
            Subscribe to receive our weekly travel deals directly in your inbox every Monday.
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
              className="bg-[#d4af37] text-[#0a1628] hover:bg-[#d4af37]/90 px-8"
              data-testid="button-subscribe-travel-deals-page"
            >
              <Mail className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 text-center">
        <Link href="/">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Back to Home
          </Button>
        </Link>
      </section>
    </div>
  );
}
