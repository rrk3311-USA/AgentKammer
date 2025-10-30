import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import preapprovedImage from "@assets/stock_images/happy_couple_receivi_7d520a7b.jpg";

export default function GetPreapproved() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    income: "",
    downPayment: "",
    creditScore: "",
    employmentStatus: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Preapproval application:", formData);
    toast({
      title: "Application Submitted!",
      description: "We'll contact you within 24 hours with your pre-approval details.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pb-32">
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${preapprovedImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div>
            <Badge className="mb-4 px-4 py-2 text-sm" variant="secondary">
              Services
            </Badge>
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-white mb-4">
              Get Pre-Approved
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Start your journey to homeownership with a fast, simple pre-approval process
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="font-serif text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Pre-Approval Application
              </CardTitle>
              <p className="text-muted-foreground">
                Complete the form below to begin your pre-approval process
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                      data-testid="input-last-name"
                    />
                  </div>
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="$150,000"
                    value={formData.income}
                    onChange={(e) => handleChange("income", e.target.value)}
                    required
                    data-testid="input-income"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="downPayment">Down Payment Available</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    placeholder="$50,000"
                    value={formData.downPayment}
                    onChange={(e) => handleChange("downPayment", e.target.value)}
                    required
                    data-testid="input-down-payment"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creditScore">Credit Score Range</Label>
                  <Select
                    value={formData.creditScore}
                    onValueChange={(value) => handleChange("creditScore", value)}
                  >
                    <SelectTrigger id="creditScore" data-testid="select-credit-score">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (750+)</SelectItem>
                      <SelectItem value="good">Good (700-749)</SelectItem>
                      <SelectItem value="fair">Fair (650-699)</SelectItem>
                      <SelectItem value="poor">Below 650</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <Select
                    value={formData.employmentStatus}
                    onValueChange={(value) => handleChange("employmentStatus", value)}
                  >
                    <SelectTrigger id="employmentStatus" data-testid="select-employment">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-Time Employed</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="contract">Contract Worker</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full text-black"
                  data-testid="button-submit-preapproval"
                >
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-4">Why Get Pre-Approved?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Know Your Budget</p>
                      <p className="text-sm text-muted-foreground">
                        Understand exactly how much home you can afford
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Competitive Advantage</p>
                      <p className="text-sm text-muted-foreground">
                        Sellers take your offers more seriously
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Faster Closing</p>
                      <p className="text-sm text-muted-foreground">
                        Move from offer to closing in record time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Lock Your Rate</p>
                      <p className="text-sm text-muted-foreground">
                        Secure favorable interest rates early
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-4">What You'll Need</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Proof of income (pay stubs, tax returns)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Bank statements (last 2-3 months)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Employment verification
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Photo ID and Social Security Number
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Credit authorization
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
