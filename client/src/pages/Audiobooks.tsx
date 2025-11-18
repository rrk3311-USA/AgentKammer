import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Headphones, Play, Clock, Star, DollarSign, MessageCircle } from "lucide-react";

import bookCoverImage from "@assets/generated_images/3D_audiobook_cover_mockup_42c57384.png";
import authorPhoto from "@assets/generated_images/Professional_avatar_headshot_fdbd53e6.png";
import wealthMagnetIcon from "@assets/generated_images/Wealth_magnet_icon_illustration_8bedebf3.png";
import sacredPartnershipIcon from "@assets/generated_images/Sacred_partnership_icon_illustration_e5f9a5b0.png";
import quantumManifestationIcon from "@assets/generated_images/Quantum_manifestation_icon_illustration_84751384.png";
import powerWithinIcon from "@assets/generated_images/Power_within_icon_illustration_914acd9d.png";
import luxuryLivingIcon from "@assets/generated_images/Luxury_living_icon_illustration_95cf6c77.png";
import wealthArchitectureIcon from "@assets/generated_images/Wealth_architecture_icon_illustration_6c9baca7.png";
import negotiationMasteryIcon from "@assets/generated_images/Negotiation_mastery_icon_illustration_7a7582a2.png";
import globalPropertyIcon from "@assets/generated_images/Global_property_icon_illustration_208421f1.png";

const audiobooks = [
  // Personal Development & Transformation
  {
    id: 1,
    title: "The Wealth Magnet",
    author: "Dr. Sophia Abundance",
    duration: "2h 00m",
    price: "$10",
    rating: 4.9,
    description: "Unlock the universal principles of wealth attraction. Transform your money mindset and magnetize prosperity through proven spiritual and practical strategies.",
    category: "Personal Development",
    iconImage: wealthMagnetIcon,
    accentColor: "#d4af37"
  },
  {
    id: 2,
    title: "Sacred Partnership",
    author: "Dr. Michael Zukova",
    duration: "2h 00m",
    price: "$10",
    rating: 4.8,
    description: "Create the perfect relationship through spiritual alignment and authentic connection. Inspired by timeless wisdom on conscious partnerships and soul-centered love.",
    category: "Personal Development",
    iconImage: sacredPartnershipIcon,
    accentColor: "#d4af37"
  },
  {
    id: 3,
    title: "Quantum Manifestation",
    author: "Elena Consciousness",
    duration: "2h 00m",
    price: "$10",
    rating: 4.9,
    description: "Harness quantum principles to manifest your deepest desires. Bridge science and spirituality to create your ideal reality.",
    category: "Personal Development",
    iconImage: quantumManifestationIcon,
    accentColor: "#d4af37"
  },
  {
    id: 4,
    title: "The Power Within",
    author: "James Transformational",
    duration: "2h 00m",
    price: "$10",
    rating: 4.7,
    description: "Discover your infinite potential and break through limiting beliefs. A comprehensive guide to personal transformation and self-mastery.",
    category: "Personal Development",
    iconImage: powerWithinIcon,
    accentColor: "#d4af37"
  },
  // Real Estate & Wealth Building
  {
    id: 5,
    title: "The Art of Luxury Living",
    author: "Victoria Sterling",
    duration: "2h 00m",
    price: "$10",
    rating: 4.8,
    description: "Master the principles of elevated living and refined taste in modern luxury real estate.",
    category: "Real Estate",
    iconImage: luxuryLivingIcon,
    accentColor: "#d4af37"
  },
  {
    id: 6,
    title: "Wealth Architecture",
    author: "Marcus Chen",
    duration: "2h 00m",
    price: "$10",
    rating: 4.9,
    description: "Strategic insights into building generational wealth through premium property investments.",
    category: "Real Estate",
    iconImage: wealthArchitectureIcon,
    accentColor: "#d4af37"
  },
  {
    id: 7,
    title: "Negotiation Mastery",
    author: "Diana Rothschild",
    duration: "2h 00m",
    price: "$10",
    rating: 4.7,
    description: "Elite strategies for winning in high-stakes real estate negotiations and closing power deals.",
    category: "Real Estate",
    iconImage: negotiationMasteryIcon,
    accentColor: "#d4af37"
  },
  {
    id: 8,
    title: "Global Property Intelligence",
    author: "Alexander Kensington",
    duration: "2h 00m",
    price: "$10",
    rating: 4.9,
    description: "Navigate international luxury markets from NYC to California to Nevada and beyond.",
    category: "Real Estate",
    iconImage: globalPropertyIcon,
    accentColor: "#d4af37"
  }
];

const featuredAudiobook = {
  id: 0,
  title: "Awaken the Straight Guy Within",
  author: "Agent Kammer",
  duration: "2h 00m",
  price: "$10",
  rating: 5.0,
  description: "A transformative journey into authentic masculine presence and power. Discover the path to genuine confidence, purpose-driven success, and unshakeable self-mastery in all areas of life.",
  category: "Featured",
  coverImage: bookCoverImage,
  accentColor: "#d4af37"
};

export default function Audiobooks() {
  const [sampleDialogOpen, setSampleDialogOpen] = useState(false);
  const [selectedAudiobook, setSelectedAudiobook] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const { toast } = useToast();

  const sampleRequestMutation = useMutation({
    mutationFn: async (data: { phone: string; audiobookTitle: string }) => {
      const result = await apiRequest("POST", "/api/audiobook-sample", data);
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Sample Request Received!",
        description: "We'll send your 15-minute sample to WhatsApp shortly. Check your messages!",
      });
      setSampleDialogOpen(false);
      setWhatsappNumber("");
      setSelectedAudiobook("");
    },
    onError: () => {
      toast({
        title: "Request Failed",
        description: "Please check your WhatsApp number and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSampleRequest = (audiobookTitle: string) => {
    setSelectedAudiobook(audiobookTitle);
    setSampleDialogOpen(true);
  };

  const handleSubmitSampleRequest = () => {
    if (!whatsappNumber.trim()) {
      toast({
        title: "WhatsApp Number Required",
        description: "Please enter your WhatsApp number to receive the sample.",
        variant: "destructive",
      });
      return;
    }
    sampleRequestMutation.mutate({
      phone: whatsappNumber,
      audiobookTitle: selectedAudiobook,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-[#0a1628] via-[#1a2942] to-[#0a1628]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0aDRWMGgtNHptMCAxMGg0VjEwaC00em0wIDEwaDRWMjBoLTR6bTAgMTBoNFYzMGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Headphones className="h-12 w-12 text-[#d4af37]" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Luxury Audiobook Library
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Elevate your knowledge with our curated collection of premium audiobooks. 
            Learn from the world's leading experts in luxury real estate, wealth management, and strategic investments.
          </p>
        </div>
      </section>

      {/* Featured Audiobook */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <Badge className="mb-4" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)', color: '#000', fontWeight: 600 }}>
              Featured Release
            </Badge>
            <h2 className="font-serif text-4xl font-bold mb-2">Personal Development Breakthrough</h2>
            <p className="text-muted-foreground">Transform your life with this exclusive premium audiobook</p>
          </div>
          
          <Card 
            className="overflow-hidden hover-elevate transition-all duration-300 border-0"
            style={{
              background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(0,0,0,0.98) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
            data-testid="card-audiobook-featured"
          >
            <div className="flex flex-col lg:flex-row gap-0">
              {/* Book Cover with Background */}
              <div 
                className="w-full lg:w-[500px] h-[400px] lg:h-auto flex items-center justify-center p-8 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(10,22,40,0.9) 0%, rgba(26,41,66,0.95) 50%, rgba(10,22,40,0.9) 100%)',
                  borderRight: '1px solid rgba(212,175,55,0.3)'
                }}
              >
                {/* Background glow effects */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(212,175,55,0.2), transparent 60%)' }} />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(212,175,55,0.15), transparent 60%)' }} />
                
                {/* 3D Book Cover */}
                <div className="relative z-10">
                  <img 
                    src={featuredAudiobook.coverImage} 
                    alt={featuredAudiobook.title}
                    className="w-64 h-auto object-contain drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(212,175,55,0.3))' }}
                  />
                </div>
                
                {/* Decorative gold lines */}
                <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
                <div className="absolute bottom-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
              </div>

              {/* Book Details */}
              <div className="flex-1 p-8 lg:p-10 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    {/* Author Photo */}
                    <div className="shrink-0">
                      <img 
                        src={authorPhoto} 
                        alt={featuredAudiobook.author}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-[#d4af37]/50"
                        style={{ boxShadow: '0 4px 12px rgba(212,175,55,0.3)' }}
                        data-testid="img-author-photo"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-3xl lg:text-4xl font-bold mb-2 text-white">
                        {featuredAudiobook.title}
                      </h3>
                      <p className="text-lg" style={{ color: 'rgba(212,175,55,0.9)' }}>
                        by {featuredAudiobook.author}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    className="shrink-0 border-0" 
                    style={{ 
                      background: 'rgba(212,175,55,0.2)', 
                      color: '#d4af37',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Star className="h-3 w-3 mr-1 fill-[#d4af37] text-[#d4af37]" />
                    {featuredAudiobook.rating}
                  </Badge>
                </div>

                <p className="text-lg leading-relaxed mb-8 flex-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {featuredAudiobook.description}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="outline"
                      className="gap-2"
                      style={{
                        borderColor: '#d4af37',
                        color: '#d4af37',
                        background: 'rgba(212,175,55,0.1)',
                      }}
                      onClick={() => handleSampleRequest(featuredAudiobook.title)}
                      data-testid="button-sample-featured"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Get 15 Min Sample
                    </Button>
                    <div className="flex items-center gap-2" style={{ color: 'rgba(212,175,55,0.9)' }}>
                      <Clock className="h-5 w-5" />
                      <span className="text-base font-medium">{featuredAudiobook.duration}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: 'rgba(212,175,55,0.9)' }}>
                      <DollarSign className="h-5 w-5" />
                      <span className="text-base font-medium">{featuredAudiobook.price}</span>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    className="gap-2 border-0 w-full sm:w-auto"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                      color: '#000',
                      fontWeight: 600
                    }}
                    data-testid="button-play-featured"
                  >
                    <Play className="h-5 w-5" />
                    Listen Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Audiobooks Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Personal Development Section */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold mb-2 text-center">Personal Transformation</h2>
            <p className="text-muted-foreground text-center mb-8">Unlock your infinite potential and manifest your desires</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {audiobooks.filter(book => book.category === "Personal Development").map((book) => (
                <Card 
                  key={book.id}
                  className="overflow-hidden hover-elevate transition-all duration-300 border-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(0,0,0,0.98) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                  data-testid={`card-audiobook-${book.id}`}
                >
                  <div className="flex flex-col md:flex-row gap-0">
                    {/* Book Cover - Frosted Glass Effect */}
                    <div 
                      className="w-full md:w-56 h-72 md:h-auto flex flex-col items-center justify-center p-8 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(212,175,55,0.15) 50%, rgba(255,255,255,0.05) 100%)',
                        backdropFilter: 'blur(10px)',
                        borderRight: '1px solid rgba(212,175,55,0.2)'
                      }}
                    >
                      {/* Glossy overlay */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)',
                          pointerEvents: 'none'
                        }}
                      />
                      
                      {/* Gold accent lines */}
                      <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
                      <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
                      
                      <div className="relative z-10 text-center">
                        <div className="mb-4 mx-auto w-24 h-24 flex items-center justify-center">
                          <img 
                            src={book.iconImage} 
                            alt={book.title}
                            className="w-20 h-20 object-contain"
                            style={{ filter: 'drop-shadow(0 4px 12px rgba(212,175,55,0.3))' }}
                          />
                        </div>
                        <div className="font-serif text-2xl font-bold mb-2 leading-tight" style={{ color: '#d4af37' }}>
                          {book.title}
                        </div>
                        <div className="text-sm font-medium" style={{ color: 'rgba(212,175,55,0.8)' }}>
                          {book.author}
                        </div>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15), transparent)' }} />
                      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full -ml-16 -mb-16" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.1), transparent)' }} />
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-serif text-2xl font-semibold mb-1 text-white">
                            {book.title}
                          </h3>
                          <p className="text-sm" style={{ color: 'rgba(212,175,55,0.9)' }}>
                            by {book.author}
                          </p>
                        </div>
                        <Badge 
                          className="shrink-0 border-0" 
                          style={{ 
                            background: 'rgba(212,175,55,0.2)', 
                            color: '#d4af37',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          <Star className="h-3 w-3 mr-1 fill-[#d4af37] text-[#d4af37]" />
                          {book.rating}
                        </Badge>
                      </div>

                      <p className="leading-relaxed mb-6 flex-1" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        {book.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            style={{
                              borderColor: '#d4af37',
                              color: '#d4af37',
                              background: 'rgba(212,175,55,0.1)',
                            }}
                            onClick={() => handleSampleRequest(book.title)}
                            data-testid={`button-sample-${book.id}`}
                          >
                            <MessageCircle className="h-3 w-3" />
                            Get 15 Min Sample
                          </Button>
                          <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(212,175,55,0.8)' }}>
                            <Clock className="h-4 w-4" />
                            {book.duration}
                          </div>
                          <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: 'rgba(212,175,55,0.9)' }}>
                            <DollarSign className="h-4 w-4" />
                            {book.price}
                          </div>
                        </div>
                        <Button 
                          className="gap-2 border-0 w-full"
                          style={{
                            background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                            color: '#000',
                            fontWeight: 600
                          }}
                          data-testid={`button-play-${book.id}`}
                        >
                          <Play className="h-4 w-4" />
                          Listen Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Real Estate Section */}
          <div>
            <h2 className="font-serif text-3xl font-bold mb-2 text-center">Luxury Real Estate Mastery</h2>
            <p className="text-muted-foreground text-center mb-8">Elite strategies for luxury property success</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {audiobooks.filter(book => book.category === "Real Estate").map((book) => (
                <Card 
                  key={book.id}
                  className="overflow-hidden hover-elevate transition-all duration-300 border-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(0,0,0,0.98) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                  data-testid={`card-audiobook-${book.id}`}
                >
                  <div className="flex flex-col md:flex-row gap-0">
                    {/* Book Cover - Frosted Glass Effect */}
                    <div 
                      className="w-full md:w-56 h-72 md:h-auto flex flex-col items-center justify-center p-8 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(212,175,55,0.15) 50%, rgba(255,255,255,0.05) 100%)',
                        backdropFilter: 'blur(10px)',
                        borderRight: '1px solid rgba(212,175,55,0.2)'
                      }}
                    >
                      {/* Glossy overlay */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)',
                          pointerEvents: 'none'
                        }}
                      />
                      
                      {/* Gold accent lines */}
                      <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
                      <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
                      
                      <div className="relative z-10 text-center">
                        <div className="mb-4 mx-auto w-24 h-24 flex items-center justify-center">
                          <img 
                            src={book.iconImage} 
                            alt={book.title}
                            className="w-20 h-20 object-contain"
                            style={{ filter: 'drop-shadow(0 4px 12px rgba(212,175,55,0.3))' }}
                          />
                        </div>
                        <div className="font-serif text-2xl font-bold mb-2 leading-tight" style={{ color: '#d4af37' }}>
                          {book.title}
                        </div>
                        <div className="text-sm font-medium" style={{ color: 'rgba(212,175,55,0.8)' }}>
                          {book.author}
                        </div>
                      </div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15), transparent)' }} />
                      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full -ml-16 -mb-16" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.1), transparent)' }} />
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-serif text-2xl font-semibold mb-1 text-white">
                            {book.title}
                          </h3>
                          <p className="text-sm" style={{ color: 'rgba(212,175,55,0.9)' }}>
                            by {book.author}
                          </p>
                        </div>
                        <Badge 
                          className="shrink-0 border-0" 
                          style={{ 
                            background: 'rgba(212,175,55,0.2)', 
                            color: '#d4af37',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          <Star className="h-3 w-3 mr-1 fill-[#d4af37] text-[#d4af37]" />
                          {book.rating}
                        </Badge>
                      </div>

                      <p className="leading-relaxed mb-6 flex-1" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        {book.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            style={{
                              borderColor: '#d4af37',
                              color: '#d4af37',
                              background: 'rgba(212,175,55,0.1)',
                            }}
                            onClick={() => handleSampleRequest(book.title)}
                            data-testid={`button-sample-${book.id}`}
                          >
                            <MessageCircle className="h-3 w-3" />
                            Get 15 Min Sample
                          </Button>
                          <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(212,175,55,0.8)' }}>
                            <Clock className="h-4 w-4" />
                            {book.duration}
                          </div>
                          <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: 'rgba(212,175,55,0.9)' }}>
                            <DollarSign className="h-4 w-4" />
                            {book.price}
                          </div>
                        </div>
                        <Button 
                          className="gap-2 border-0 w-full"
                          style={{
                            background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                            color: '#000',
                            fontWeight: 600
                          }}
                          data-testid={`button-play-${book.id}`}
                        >
                          <Play className="h-4 w-4" />
                          Listen Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">
            Expand Your Luxury Knowledge
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join our exclusive community and gain access to premium insights from industry leaders. 
            New audiobooks added monthly.
          </p>
          <Button size="lg" className="gap-2" data-testid="button-join-library">
            <Headphones className="h-5 w-5" />
            Join the Library
          </Button>
        </div>
      </section>

      {/* WhatsApp Sample Request Dialog */}
      <Dialog open={sampleDialogOpen} onOpenChange={setSampleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Get Your Free 15-Minute Sample</DialogTitle>
            <DialogDescription>
              Enter your WhatsApp number to receive a free sample of "{selectedAudiobook}". We'll send it right to your phone!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
              <Input
                id="whatsapp-number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                data-testid="input-whatsapp-number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSampleDialogOpen(false)}
              data-testid="button-cancel-sample"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitSampleRequest}
              disabled={sampleRequestMutation.isPending}
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #c9a02e 100%)',
                color: '#000',
              }}
              data-testid="button-submit-sample"
            >
              {sampleRequestMutation.isPending ? "Sending..." : "Send Sample"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
