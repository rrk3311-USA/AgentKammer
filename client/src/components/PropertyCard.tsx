import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Bed, Bath, Maximize, MapPin, ArrowRight, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { HappyDocIcon } from "./HappyDocIcon";

interface PropertyCardProps {
  id: string;
  image: string;
  price: number;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
  daysOnMarket?: number;
  dealScore?: number;
}

export function PropertyCard({
  id,
  image,
  price,
  title,
  address,
  beds,
  baths,
  sqft,
  propertyType,
  daysOnMarket,
  dealScore,
}: PropertyCardProps) {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [email, setEmail] = useState("");

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    console.log(`Property ${id} ${!isFavorite ? "added to" : "removed from"} favorites`);
  };

  const handleViewDetails = () => {
    console.log(`View details for property ${id}`);
  };

  const handleGetReport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowReportDialog(true);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Report requested for property ${id} to email: ${email}`);
    toast({
      title: "Report Requested!",
      description: "Your comprehensive market analysis PDF will be sent to your email shortly.",
    });
    setShowReportDialog(false);
    setEmail("");
  };

  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer group shadow-xl hover:shadow-2xl" data-testid={`card-property-${id}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute top-4 right-4 backdrop-blur-md bg-background/80 rounded-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavorite}
            data-testid={`button-favorite-${id}`}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`}
            />
          </Button>
        </div>
        
        {/* Compact Black Glass Module with All Info */}
        <div className="absolute bottom-2.5 left-2.5">
          <div className="backdrop-blur-xl bg-black/85 dark:bg-black/90 rounded-lg px-2.5 py-2 border border-white/10 shadow-2xl">
            {/* Price with Gold Gradient - 75% Larger */}
            <div className="mb-1">
              <span 
                className="font-serif text-xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent" 
                data-testid={`text-price-${id}`}
              >
                {formatPrice(price)}
              </span>
            </div>
            
            {/* Property Details - Compact */}
            <div className="flex items-center gap-1.5 mb-1 text-white/90 text-xs">
              <div className="flex items-center gap-0.5">
                <Bed className="h-3 w-3" />
                <span>{beds}</span>
              </div>
              <div className="h-2.5 w-px bg-white/20" />
              <div className="flex items-center gap-0.5">
                <Bath className="h-3 w-3" />
                <span>{baths}</span>
              </div>
              <div className="h-2.5 w-px bg-white/20" />
              <div className="flex items-center gap-0.5">
                <Maximize className="h-3 w-3" />
                <span>{sqft.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Badges Row - Compact */}
            <div className="flex items-center gap-1 flex-wrap">
              <Badge variant="secondary" className="text-xs px-1.5 py-0 h-auto bg-white/20 text-white border-white/10">
                {propertyType}
              </Badge>
              {daysOnMarket && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0 h-auto bg-white/20 text-white border-white/10 flex items-center gap-0.5">
                  <Clock className="h-2.5 w-2.5" />
                  {daysOnMarket}d
                </Badge>
              )}
              {dealScore && (
                <Badge variant="default" className="text-xs px-1.5 py-0 h-auto flex items-center gap-0.5 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] text-black border-0">
                  <TrendingUp className="h-2.5 w-2.5" />
                  {dealScore}/10
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-medium mb-2 line-clamp-1">
          {title}
        </h3>
        <div className="flex items-start gap-2 text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{address}</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span>{beds} bd</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span>{baths} ba</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-muted-foreground" />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1 rounded-full"
          onClick={handleViewDetails}
          data-testid={`button-view-details-${id}`}
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="default"
          className="rounded-full text-black"
          onClick={handleGetReport}
          data-testid={`button-get-report-${id}`}
        >
          <HappyDocIcon className="h-4 w-4" />
        </Button>
      </CardFooter>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Get Market Analysis Report</DialogTitle>
            <DialogDescription>
              Receive a comprehensive PDF with pricing trends, comparable sales, and expert insights for {title}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitReport} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email-report">Email Address</Label>
              <Input
                id="email-report"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email-report"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full text-black"
              data-testid="button-submit-report"
            >
              <HappyDocIcon className="mr-2 h-4 w-4" />
              Send Me the Report
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
