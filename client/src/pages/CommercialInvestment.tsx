import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Building2, DollarSign, MapPin, TrendingUp, Calendar } from "lucide-react";
import { Link } from "wouter";

interface CommercialProperty {
  id: string;
  address: string;
  city: string;
  propertyType: string;
  price: number;
  sqft: number;
  capRate: number;
  noi: number;
  yearBuilt: number;
  occupancy: number;
  zoning: string;
  lastUpdated: Date;
}

const mockProperties: Omit<CommercialProperty, 'lastUpdated'>[] = [
  {
    id: "CRE-001",
    address: "1250 Broadway",
    city: "Oakland, CA",
    propertyType: "Office Building",
    price: 8500000,
    sqft: 25000,
    capRate: 6.8,
    noi: 578000,
    yearBuilt: 2015,
    occupancy: 92,
    zoning: "C-3"
  },
  {
    id: "CRE-002",
    address: "3400 Sunset Blvd",
    city: "Los Angeles, CA",
    propertyType: "Retail Center",
    price: 12750000,
    sqft: 45000,
    capRate: 7.2,
    noi: 918000,
    yearBuilt: 2010,
    occupancy: 88,
    zoning: "C-2"
  },
  {
    id: "CRE-003",
    address: "750 Market Street",
    city: "San Francisco, CA",
    propertyType: "Mixed-Use",
    price: 15900000,
    sqft: 32000,
    capRate: 5.9,
    noi: 938100,
    yearBuilt: 2018,
    occupancy: 95,
    zoning: "C-3-R"
  },
  {
    id: "CRE-004",
    address: "2100 Industrial Pkwy",
    city: "Sacramento, CA",
    propertyType: "Industrial Warehouse",
    price: 4200000,
    sqft: 62000,
    capRate: 8.1,
    noi: 340200,
    yearBuilt: 2012,
    occupancy: 100,
    zoning: "M-2"
  },
  {
    id: "CRE-005",
    address: "5600 Pacific Coast Hwy",
    city: "Long Beach, CA",
    propertyType: "Hotel",
    price: 22500000,
    sqft: 55000,
    capRate: 6.5,
    noi: 1462500,
    yearBuilt: 2016,
    occupancy: 85,
    zoning: "CG"
  },
  {
    id: "CRE-006",
    address: "980 Park Avenue",
    city: "San Jose, CA",
    propertyType: "Medical Office",
    price: 6800000,
    sqft: 18500,
    capRate: 7.4,
    noi: 503200,
    yearBuilt: 2014,
    occupancy: 90,
    zoning: "C-1"
  },
  {
    id: "CRE-007",
    address: "1450 Harbor Blvd",
    city: "San Diego, CA",
    propertyType: "Retail Strip",
    price: 5600000,
    sqft: 28000,
    capRate: 7.8,
    noi: 436800,
    yearBuilt: 2008,
    occupancy: 82,
    zoning: "C-2"
  },
  {
    id: "CRE-008",
    address: "3200 Tech Center Dr",
    city: "Irvine, CA",
    propertyType: "Office Park",
    price: 18200000,
    sqft: 72000,
    capRate: 6.2,
    noi: 1128400,
    yearBuilt: 2019,
    occupancy: 96,
    zoning: "OP"
  }
];

export default function CommercialInvestment() {
  const [properties, setProperties] = useState<CommercialProperty[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize properties with timestamps
  useEffect(() => {
    const initProperties = mockProperties.map((prop, index) => ({
      ...prop,
      lastUpdated: new Date(Date.now() - (index * 2 * 60 * 1000)) // Stagger by 2 minutes
    }));
    setProperties(initProperties);
  }, []);

  // Simulate live updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProperties(prev => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const updated = [...prev];
        updated[randomIndex] = {
          ...updated[randomIndex],
          lastUpdated: new Date()
        };
        return updated;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setProperties(prev => prev.map(prop => ({
        ...prop,
        lastUpdated: new Date()
      })));
      setIsRefreshing(false);
    }, 1000);
  };

  const formatPrice = (price: number) => {
    return `$${(price / 1000000).toFixed(2)}M`;
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#0a1628] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mb-4 text-white hover:text-[#d4af37] -ml-2"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-3">
                Commercial Real Estate Investment Opportunities
              </h1>
              <p className="text-white/80 text-lg mb-2">
                Live California commercial property listings
              </p>
              <Badge variant="secondary" className="bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">
                <RefreshCw className="h-3 w-3 mr-1" />
                Auto-updating feed
              </Badge>
            </div>
            <Button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="rounded-full font-semibold"
              data-testid="button-refresh"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh All
            </Button>
          </div>
        </div>
      </div>

      {/* API Status Bar */}
      <div className="bg-muted/30 border-b py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">API Status: Active</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-muted-foreground">
              Last refresh: {lastRefresh.toLocaleTimeString()}
            </span>
          </div>
          <span className="text-muted-foreground">
            {properties.length} active listings
          </span>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {properties.map((property) => (
            <Card 
              key={property.id}
              className="hover-elevate active-elevate-2 transition-all"
              data-testid={`card-property-${property.id}`}
            >
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-[1fr_auto] gap-6">
                  {/* Main Info */}
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            {property.id}
                          </Badge>
                          <Badge 
                            variant="secondary"
                            className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20"
                          >
                            {property.propertyType}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-xl mb-1">
                          {property.address}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{property.city}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-[#d4af37]">
                          {formatPrice(property.price)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${Math.round(property.price / property.sqft)}/sqft
                        </div>
                      </div>
                    </div>

                    {/* Property Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Square Feet</div>
                        <div className="font-semibold">{property.sqft.toLocaleString()}</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Cap Rate</div>
                        <div className="font-semibold text-green-600 dark:text-green-400">
                          {property.capRate}%
                        </div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">NOI</div>
                        <div className="font-semibold">
                          ${(property.noi / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Occupancy</div>
                        <div className="font-semibold">{property.occupancy}%</div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Built {property.yearBuilt}
                      </div>
                      <div className="h-4 w-px bg-border" />
                      <div>Zoning: {property.zoning}</div>
                      <div className="h-4 w-px bg-border" />
                      <div className="flex items-center gap-1 text-[#d4af37]">
                        <RefreshCw className="h-3 w-3" />
                        Updated {getTimeAgo(property.lastUpdated)}
                      </div>
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="flex flex-col gap-2 lg:min-w-[200px]">
                    <Button 
                      className="rounded-full font-semibold w-full"
                      data-testid={`button-details-${property.id}`}
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline"
                      className="rounded-full w-full"
                      data-testid={`button-contact-${property.id}`}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Request Info
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-y py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Ready to Invest in California Commercial Real Estate?
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Our team specializes in high-value commercial transactions across California
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="rounded-full font-semibold"
              data-testid="button-schedule-consultation"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Schedule Consultation
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full"
              data-testid="button-investment-guide"
            >
              Download Investment Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
