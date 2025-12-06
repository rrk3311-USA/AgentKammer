import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Home, TrendingUp, DollarSign } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import homeValueImage from "@assets/generated_images/modern_luxury_home_hero_background.png";

export default function GetHomeValue() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    zipCode: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    email: "",
    phone: "",
  });

  const homeValueMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/home-value", data);
    },
    onSuccess: () => {
      toast({
        title: "Valuation Request Received!",
        description: "We'll send you a detailed home value report within 24 hours.",
      });
      setFormData({
        address: "",
        city: "",
        zipCode: "",
        propertyType: "",
        bedrooms: "",
        bathrooms: "",
        squareFeet: "",
        yearBuilt: "",
        email: "",
        phone: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    homeValueMutation.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pb-32">
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${homeValueImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div>
            <Badge className="mb-4 px-4 py-2 text-sm" variant="secondary">
              Services
            </Badge>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-white mb-4">
              Get Your Home Value
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover your home's true market value with our comprehensive analysis
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center gap-2">
                <Home className="h-6 w-6 text-primary" />
                Property Information
              </CardTitle>
              <p className="text-muted-foreground">
                Tell us about your property for an accurate valuation
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Park Avenue"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                    data-testid="input-address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Manhattan"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      required
                      data-testid="input-city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={(e) => handleChange("zipCode", e.target.value)}
                      required
                      data-testid="input-zip"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => handleChange("propertyType", value)}
                  >
                    <SelectTrigger id="propertyType" data-testid="select-property-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="co-op">Co-op</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="single-family">Single Family Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select
                      value={formData.bedrooms}
                      onValueChange={(value) => handleChange("bedrooms", value)}
                    >
                      <SelectTrigger id="bedrooms" data-testid="select-bedrooms">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select
                      value={formData.bathrooms}
                      onValueChange={(value) => handleChange("bathrooms", value)}
                    >
                      <SelectTrigger id="bathrooms" data-testid="select-bathrooms">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="1.5">1.5</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="2.5">2.5</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="3.5+">3.5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="squareFeet">Square Feet</Label>
                    <Input
                      id="squareFeet"
                      type="number"
                      placeholder="1,500"
                      value={formData.squareFeet}
                      onChange={(e) => handleChange("squareFeet", e.target.value)}
                      required
                      data-testid="input-sqft"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      placeholder="2000"
                      value={formData.yearBuilt}
                      onChange={(e) => handleChange("yearBuilt", e.target.value)}
                      data-testid="input-year-built"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 mt-6">
                  <h4 className="font-medium mb-4">Contact Information</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        data-testid="input-email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                        data-testid="input-phone"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full text-[#000000]"
                  data-testid="button-submit-valuation"
                  disabled={homeValueMutation.isPending}
                >
                  {homeValueMutation.isPending ? "Submitting..." : "Get Free Home Valuation"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      Comprehensive Market Analysis
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Our valuation includes recent comparable sales, neighborhood trends, and current market conditions to give you the most accurate estimate.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      No Obligation - Completely Free
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Get your home's value estimate with zero commitment. Whether you're thinking of selling now or in the future, knowledge is power.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-4">Your Report Includes:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Estimated market value range
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Recent comparable sales in your area
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Neighborhood market trends
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Property features analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Recommendations for maximizing value
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Personalized consultation offer
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
