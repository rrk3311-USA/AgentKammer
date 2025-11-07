import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Shield, 
  TrendingUp, 
  CheckCircle2, 
  DollarSign, 
  Award,
  Home,
  Key,
  FileCheck,
  Clipboard,
  ArrowRight,
  Download,
  Upload
} from "lucide-react";
import { useState } from "react";

export default function DocumentPortal() {
  const [activeCategory, setActiveCategory] = useState("getting-started");

  const strategicSteps = [
    { step: 1, title: "Establish Authority", description: "Agent agreement & pre-approval" },
    { step: 2, title: "Show Financial Strength", description: "Proof of funds & verification" },
    { step: 3, title: "Strategic Positioning", description: "Competitive bidding documents" },
    { step: 4, title: "Win the Deal", description: "Optimized offer & closing" }
  ];

  const documentCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Key,
      color: "text-blue-500",
      description: "Foundation documents to begin your journey",
      documents: [
        {
          name: "Exclusive Buyer Representation Agreement (California)",
          description: "Official agreement establishing Agent Kammer as your exclusive representative",
          fields: ["Full Name", "Email", "Phone", "Property Budget", "Preferred Neighborhoods"],
          required: true
        },
        {
          name: "Pre-Approval Letter Request",
          description: "Initiate mortgage pre-approval to strengthen your position",
          fields: ["Income", "Employment Status", "Credit Score Range", "Down Payment Amount"],
          required: true
        }
      ]
    },
    {
      id: "competitive-advantage",
      title: "Competitive Advantage",
      icon: Award,
      color: "text-primary",
      description: "Documents that prove your financial readiness",
      documents: [
        {
          name: "Proof of Funds Letter",
          description: "Bank verification showing liquid assets available for purchase",
          fields: ["Bank Name", "Account Type", "Available Funds", "Upload Bank Statement"],
          required: true
        },
        {
          name: "Cash Buyer Verification",
          description: "For all-cash offers - maximum leverage in competitive bidding",
          fields: ["Total Liquid Assets", "Source of Funds", "Upload Financial Statement"],
          required: false
        },
        {
          name: "Financial Strength Package",
          description: "Comprehensive financial documentation to outbid competitors",
          fields: ["Assets Summary", "Liabilities", "Net Worth", "Upload Supporting Documents"],
          required: false
        }
      ]
    },
    {
      id: "strategic-bidding",
      title: "Strategic Bidding",
      icon: TrendingUp,
      color: "text-green-500",
      description: "Tactical documents to win in multiple offer situations",
      documents: [
        {
          name: "California Residential Purchase Agreement (RPA)",
          description: "Standard CAR form for making an official offer",
          fields: ["Offer Price", "Earnest Money Deposit", "Closing Timeline", "Contingencies"],
          required: true
        },
        {
          name: "Escalation Clause Addendum",
          description: "Automatically outbid other offers up to your maximum price",
          fields: ["Initial Offer", "Maximum Price", "Escalation Increment", "Proof Required"],
          required: false
        },
        {
          name: "Personal Offer Letter to Seller",
          description: "Emotional appeal to differentiate your offer from competitors",
          fields: ["Why You Love This Home", "Your Story", "Connection to Neighborhood"],
          required: false
        },
        {
          name: "Contingency Waiver (Use Strategically)",
          description: "Waive inspection/appraisal contingencies for stronger offers",
          fields: ["Inspection Waiver", "Appraisal Waiver", "Financing Waiver", "Risk Acknowledgment"],
          required: false
        },
        {
          name: "Rent-Back Agreement",
          description: "Offer seller flexibility to stay after closing - competitive advantage",
          fields: ["Rent-Back Duration", "Rental Rate", "Terms"],
          required: false
        }
      ]
    },
    {
      id: "due-diligence",
      title: "Due Diligence",
      icon: FileCheck,
      color: "text-purple-500",
      description: "Protection and research documents",
      documents: [
        {
          name: "Property Inspection Request",
          description: "Schedule comprehensive home inspection",
          fields: ["Inspector Preference", "Inspection Date", "Special Focus Areas"],
          required: true
        },
        {
          name: "Seller Property Disclosure Review",
          description: "California-required seller disclosures analysis",
          fields: ["Review Completed", "Questions for Seller", "Concerns Noted"],
          required: true
        },
        {
          name: "Title Report Request",
          description: "Verify clean title and ownership history",
          fields: ["Title Company", "Rush Processing", "Additional Searches"],
          required: true
        },
        {
          name: "Comparative Market Analysis (CMA) Request",
          description: "Agent Kammer's market research to validate offer price",
          fields: ["Comparable Properties", "Market Trends", "Pricing Strategy"],
          required: false
        }
      ]
    },
    {
      id: "closing-documents",
      title: "Closing Documents",
      icon: Home,
      color: "text-orange-500",
      description: "Final documents to complete your purchase",
      documents: [
        {
          name: "Escrow Instructions",
          description: "Formal instructions to escrow company for closing",
          fields: ["Escrow Company", "Closing Date", "Wire Transfer Info", "Special Instructions"],
          required: true
        },
        {
          name: "Final Walk-Through Checklist",
          description: "Verify property condition before closing",
          fields: ["Condition Verified", "Repairs Completed", "Issues Found"],
          required: true
        },
        {
          name: "Closing Disclosure Review",
          description: "Federal TRID form - final loan and closing costs",
          fields: ["Reviewed", "Questions", "Approval"],
          required: true
        }
      ]
    }
  ];

  const currentCategory = documentCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <Badge className="mb-4 bg-primary text-primary-foreground" data-testid="badge-california-exclusive">
                California Exclusive
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                Strategic Document Portal
              </h1>
              <p className="text-lg text-background/90 mb-6">
                Your complete arsenal for winning competitive bidding wars. Every document strategically organized to give you maximum leverage against other buyers.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="bg-background/10 text-background border-background/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure Submissions
                </Badge>
                <Badge variant="outline" className="bg-background/10 text-background border-background/30">
                  <FileText className="w-3 h-3 mr-1" />
                  California CAR Forms
                </Badge>
                <Badge variant="outline" className="bg-background/10 text-background border-background/30">
                  <Award className="w-3 h-3 mr-1" />
                  Competitive Edge
                </Badge>
              </div>
            </div>

            {/* Strategic Steps - Top Right */}
            <Card className="bg-background/95 backdrop-blur-sm border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Winning Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {strategicSteps.map((step) => (
                  <div key={step.step} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Category Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-muted/50 p-2">
              {documentCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    data-testid={`tab-${category.id}`}
                  >
                    <Icon className={`h-5 w-5 ${category.color}`} />
                    <span className="text-xs font-medium">{category.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {documentCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-serif font-bold mb-2">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>

                <div className="grid gap-6">
                  {category.documents.map((doc, index) => (
                    <DocumentCard key={index} document={doc} categoryColor={category.color} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}

interface DocumentCardProps {
  document: {
    name: string;
    description: string;
    fields: string[];
    required: boolean;
  };
  categoryColor: string;
}

function DocumentCard({ document, categoryColor }: DocumentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<Record<string, string | File>>({});

  const colorMap: Record<string, string> = {
    "text-blue-500": "#3b82f6",
    "text-primary": "hsl(var(--primary))",
    "text-green-500": "#22c55e",
    "text-purple-500": "#a855f7",
    "text-orange-500": "#f97316"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission to backend
    console.log("Submitting document:", document.name, formData);
    alert(`${document.name} submitted successfully! Agent Kammer will review and process your submission.`);
    setFormData({});
    setIsExpanded(false);
  };

  const handleFileChange = (field: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setFormData({ ...formData, [field]: files[0] });
    }
  };

  return (
    <Card className="overflow-hidden border-l-4" style={{ borderLeftColor: colorMap[categoryColor] || colorMap["text-primary"] }}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{document.name}</CardTitle>
              {document.required && (
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-xs">
                  Required
                </Badge>
              )}
            </div>
            <CardDescription>{document.description}</CardDescription>
          </div>
          <Button
            variant={isExpanded ? "default" : "outline"}
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid={`button-toggle-${document.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {isExpanded ? "Collapse" : "Fill Out"}
            <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="border-t bg-muted/30">
          <form onSubmit={handleSubmit} className="space-y-4 pt-6">
            {document.fields.map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field.toLowerCase().replace(/\s+/g, '-')}>
                  {field}
                  {document.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                {field.includes("Upload") ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      id={field.toLowerCase().replace(/\s+/g, '-')}
                      className="flex-1"
                      onChange={(e) => handleFileChange(field, e.target.files)}
                      data-testid={`input-${field.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                    <Button type="button" size="icon" variant="outline" data-testid={`button-upload-${field.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                ) : field.includes("Description") || field.includes("Story") || field.includes("Why") ? (
                  <textarea
                    id={field.toLowerCase().replace(/\s+/g, '-')}
                    className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background"
                    value={(typeof formData[field] === 'string' ? formData[field] : "") || ""}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    required={document.required}
                    data-testid={`textarea-${field.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                ) : (
                  <Input
                    type="text"
                    id={field.toLowerCase().replace(/\s+/g, '-')}
                    value={(typeof formData[field] === 'string' ? formData[field] : "") || ""}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    required={document.required}
                    data-testid={`input-${field.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                )}
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1" data-testid="button-submit-document">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Submit to Agent Kammer
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsExpanded(false)}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
