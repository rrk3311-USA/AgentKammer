import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe, CheckCircle2, DollarSign, Scale, HelpCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function InternationalBuyers() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    budget: "",
    timing: "",
    goals: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry Received!",
      description: "We'll reach out within 24 hours to schedule your consultation.",
    });
    setFormData({ name: "", email: "", country: "", budget: "", timing: "", goals: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0a1628] to-[#1a2840] text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0iI2Q0YWYzNyIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Globe className="h-12 w-12 text-[#d4af37]" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold">International Buyers Guide</h1>
          </div>
          <p className="text-xl md:text-2xl text-center mb-4 text-white/90">
            Purchasing Property in California – Step-by-Step
          </p>
          <p className="text-center text-white/70 max-w-3xl mx-auto">
            A comprehensive, confidence-building guide for non-US citizens and residents looking to invest in California real estate.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Tabs defaultValue="1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 mb-8 h-auto bg-muted/50 p-2" data-testid="tabs-international-buyers">
            <TabsTrigger value="1" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black" data-testid="tab-overview">
              <span className="hidden md:inline">1️⃣ Overview</span>
              <span className="md:hidden">1️⃣</span>
            </TabsTrigger>
            <TabsTrigger value="2" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black" data-testid="tab-process">
              <span className="hidden md:inline">2️⃣ Process</span>
              <span className="md:hidden">2️⃣</span>
            </TabsTrigger>
            <TabsTrigger value="3" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black" data-testid="tab-financing">
              <span className="hidden md:inline">3️⃣ Financing</span>
              <span className="md:hidden">3️⃣</span>
            </TabsTrigger>
            <TabsTrigger value="4" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black" data-testid="tab-legal">
              <span className="hidden md:inline">4️⃣ Legal/Tax</span>
              <span className="md:hidden">4️⃣</span>
            </TabsTrigger>
            <TabsTrigger value="5" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black" data-testid="tab-faq">
              <span className="hidden md:inline">5️⃣ FAQ</span>
              <span className="md:hidden">5️⃣</span>
            </TabsTrigger>
            <TabsTrigger value="6" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black" data-testid="tab-cta">
              <span className="hidden md:inline">6️⃣ Work With Us</span>
              <span className="md:hidden">6️⃣</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Overview */}
          <TabsContent value="1" className="space-y-6">
            <Card className="p-8">
              <h2 className="font-serif text-3xl font-bold mb-6 text-[#d4af37]">1. Welcome, International Buyers</h2>
              
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Welcome to California—one of the world's most sought-after real estate markets. Whether you're a parent securing a home for your child's education, an investor seeking long-term appreciation, or planning a future relocation, you've come to the right place.
                </p>

                <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg p-6">
                  <p className="text-lg font-semibold text-foreground mb-2">
                    ✅ You do NOT need to be a US citizen or US resident to buy property in California.
                  </p>
                  <p>
                    Foreign nationals can freely purchase real estate throughout California, with the same rights as US citizens.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">Common International Buyer Profiles</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {[
                      "Parents buying homes for children studying in California",
                      "Investors seeking rental income and appreciation",
                      "Second-home buyers for vacation and lifestyle",
                      "Pre-immigration planning for future relocation",
                      "High-net-worth families diversifying portfolios",
                      "Business owners establishing a US presence"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">What Makes California Special?</h3>
                  <ul className="space-y-2">
                    {[
                      "🏆 World-class universities (Stanford, UC Berkeley, UCLA, USC)",
                      "💼 Global job centers (Silicon Valley, Los Angeles, San Diego)",
                      "🌴 Exceptional lifestyle, climate, and cultural diversity",
                      "📈 Strong long-term property appreciation history",
                      "🏖️ Coastal living and outdoor recreation year-round",
                      "🌉 Gateway to Asia-Pacific business and travel"
                    ].map((item, i) => (
                      <li key={i} className="pl-2">{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">What This Page Will Help You Do</h3>
                  <ul className="space-y-2">
                    {[
                      "Understand the step-by-step process to buy property in California",
                      "Learn how financing and international money transfers work",
                      "Discover basic legal and tax concepts to discuss with your advisors",
                      "Know how to work with a trusted local agent who understands international buyers"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-6 mt-8">
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                    ⚠️ Important Disclaimer
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-300 mt-2">
                    Nothing on this page constitutes legal, tax, or immigration advice. Always consult your own attorney, CPA, and immigration advisor before making any decisions regarding property purchases or residency.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 2: The Buying Process */}
          <TabsContent value="2" className="space-y-6">
            <Card className="p-8">
              <h2 className="font-serif text-3xl font-bold mb-6 text-[#d4af37]">2. The Buying Process – Step-by-Step</h2>
              
              <div className="space-y-8">
                {[
                  {
                    step: "1",
                    title: "Clarify Your Goals & Budget",
                    content: "Define whether this is a primary residence, vacation/second home, or pure investment. Identify target neighborhoods, price range, and property type (house, condo, townhome). Consider proximity to schools, work centers, and lifestyle amenities."
                  },
                  {
                    step: "2",
                    title: "Get Pre-Qualified or Proof of Funds",
                    content: "International buyers typically either pay cash (requiring proof of funds from your bank) or obtain financing through specialized lenders offering foreign national loans. Lenders may request overseas income documentation, bank statements, credit references, and typically require larger down payments (30-40% or more)."
                  },
                  {
                    step: "3",
                    title: "Work with a Local California Agent",
                    content: "A knowledgeable local agent provides market education, curated property searches, virtual or in-person tours, offer strategy, negotiation expertise, and coordination with escrow, title companies, and inspectors. For international buyers, working across time zones via WhatsApp, Zoom, and email is standard."
                  },
                  {
                    step: "4",
                    title: "Search & Tours (In Person or Virtual)",
                    content: "Many international buyers start with virtual video tours before flying to California for final in-person showings. Consider: commute times, school district ratings, HOA rules, zoning, and neighborhood character. Your agent can provide detailed video walkthroughs with commentary."
                  },
                  {
                    step: "5",
                    title: "Making an Offer",
                    content: "Your agent will help you craft a competitive offer based on comparable sales (comps). Offers include: purchase price, earnest money deposit, financing or cash terms, and contingencies (inspection, appraisal, financing approval). In competitive markets, clean offers with quick closing timelines are favored."
                  },
                  {
                    step: "6",
                    title: "Escrow, Inspections & Due Diligence",
                    content: "Once your offer is accepted, the property enters 'escrow'—a neutral third party that holds funds and coordinates the transaction. During this period (typically 30 days), you'll schedule home inspections, review property disclosures, and finalize financing. International buyers can usually complete this process remotely with proper documentation."
                  },
                  {
                    step: "7",
                    title: "Closing & Taking Title",
                    content: "Final funds are wired to escrow, closing documents are signed (often remotely via mobile notary or at a US consulate, depending on your country), and title/ownership is officially recorded. You can take title in your personal name, an LLC, a trust, or other structure as advised by your legal and tax team."
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-xl">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}

                <Card className="bg-[#d4af37]/10 border-[#d4af37]/30 p-6 mt-8">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Process Snapshot</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>📅 <strong>Typical escrow length:</strong> ~30 days (can be shorter or longer)</li>
                    <li>💰 <strong>Typical deposit:</strong> 3% of purchase price (varies by market)</li>
                    <li>⏱️ <strong>Timing note:</strong> International documentation may require additional time</li>
                    <li>🌍 <strong>Remote closing:</strong> Yes, most steps can be completed from overseas</li>
                  </ul>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 3: Financing & Money */}
          <TabsContent value="3" className="space-y-6">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-8 w-8 text-[#d4af37]" />
                <h2 className="font-serif text-3xl font-bold text-[#d4af37]">3. Financing, Funds & Currency Transfers</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">A) Payment Options</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-2">💵 Cash Buyers (Proof of Funds)</h4>
                      <p>Many international buyers purchase in cash. You'll need bank statements or a letter from your bank/private banker confirming available funds. Cash offers are highly competitive in California's market.</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-2">🏦 Foreign National Financing</h4>
                      <p>Some US and international banks offer "foreign national" mortgage programs. Expect:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                        <li>Larger down payments (typically 30-40% or more)</li>
                        <li>Higher documentation requirements</li>
                        <li>Potentially higher interest rates than US citizen rates</li>
                        <li>Verification of overseas income and assets</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">B) Documentation Lenders May Request</h3>
                  <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
                    {[
                      "Passport and government-issued ID",
                      "Proof of income (employment letters, contracts)",
                      "Business financials (if self-employed)",
                      "Bank statements (typically 2-12 months)",
                      "International credit references",
                      "Translated/notarized documents (if needed)"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">C) Currency Transfers & Anti-Money-Laundering</h3>
                  <p className="text-muted-foreground mb-4">
                    Large international wire transfers are standard for real estate purchases but must comply with US banking and anti-money-laundering (AML) regulations:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>🔐 <strong>Source of funds:</strong> Must be clearly documented and traceable</li>
                    <li>⏳ <strong>Seasoned funds:</strong> Money should be in your account for a certain period (requirements vary by lender)</li>
                    <li>🏛️ <strong>Bank compliance:</strong> Both sending and receiving banks will verify the transfer</li>
                    <li>📋 <strong>Documentation:</strong> Keep all wire transfer receipts and confirmations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">D) Practical Tips</h3>
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
                    <ul className="space-y-2 text-blue-900 dark:text-blue-200">
                      <li>✓ Start conversations with lenders or private bankers early (3-6 months before purchase)</li>
                      <li>✓ Ensure your name is consistent across all documents (passports, bank accounts, contracts)</li>
                      <li>✓ Prepare backup documents: translations, apostilles, certifications as needed</li>
                      <li>✓ Budget for currency exchange fees and timing (exchange rates fluctuate)</li>
                      <li>✓ Work with your agent to understand California's typical timelines and requirements</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-6 mt-8">
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                    💡 Always Remember
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-300 mt-2">
                    Discuss financing specifics with your lender, CPA, and legal advisor. This section provides general information only and does not constitute financial advice.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 4: Legal & Tax */}
          <TabsContent value="4" className="space-y-6">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="h-8 w-8 text-[#d4af37]" />
                <h2 className="font-serif text-3xl font-bold text-[#d4af37]">4. Legal & Tax Basics for Non-US Buyers</h2>
              </div>
              
              <div className="space-y-8 text-muted-foreground">
                <p className="text-foreground font-semibold">
                  This section provides a high-level overview of key topics. Always work with qualified professionals for personalized advice.
                </p>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">A) Ownership & Title Structures</h3>
                  <p className="mb-4">Non-US citizens can hold title in several ways. Your choice impacts taxes, liability, privacy, and estate planning:</p>
                  
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-2">👤 Personal Name</h4>
                      <p>Simplest approach. Property is in your individual name. May have estate and tax implications to discuss with advisors.</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-2">🏢 Entity (LLC, Corporation)</h4>
                      <p>Can offer privacy, liability protection, and potential tax benefits. Requires proper formation and ongoing compliance. Consult an attorney and CPA.</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-2">📜 Trust or Other Structures</h4>
                      <p>Used for estate planning, asset protection, and tax optimization. Requires professional guidance from legal and tax experts.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">B) Property Taxes (Local)</h3>
                  <p className="mb-4">California property tax is based on assessed value at purchase, with annual increases capped at ~2% (Proposition 13):</p>
                  <ul className="space-y-2">
                    <li>• Rates vary by county and district (typically 1.0-1.25% of assessed value)</li>
                    <li>• Supplemental taxes may apply in the first year after purchase</li>
                    <li>• Some areas have Mello-Roos or special assessment districts with additional fees</li>
                    <li>• Property taxes are typically due in two installments (November and February)</li>
                  </ul>
                  <p className="mt-4 italic">Work with a local property tax consultant for precise estimates based on your target property.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">C) Income Tax & Rental Income</h3>
                  <div className="space-y-4">
                    <p>If you rent out your California property, the rental income may be subject to US federal and California state taxes:</p>
                    <ul className="space-y-2 mb-4">
                      <li>• Non-US owners typically must file US tax returns reporting rental income</li>
                      <li>• You may be required to withhold taxes on rental income</li>
                      <li>• Deductions may be available for expenses like mortgage interest, property management, repairs</li>
                      <li>• Tax treaties between your home country and the US may affect rates and obligations</li>
                    </ul>
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                      <p className="text-sm text-blue-900 dark:text-blue-200">
                        <strong>Important:</strong> Engage a cross-border tax advisor (CPA specializing in international clients) to structure your rental strategy properly.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">D) FIRPTA & Withholding (Future Sales)</h3>
                  <p className="mb-4">
                    FIRPTA (Foreign Investment in Real Property Tax Act) is a US law requiring withholding when a foreign person <strong>sells</strong> US real estate:
                  </p>
                  <ul className="space-y-2">
                    <li>• Typically 15% of the sale price is withheld and sent to the IRS at closing</li>
                    <li>• This withholding can be reduced or eliminated with proper planning and filings</li>
                    <li>• This affects your future sale, not the initial purchase, but plan ahead</li>
                    <li>• Work with your CPA and real estate attorney on long-term exit strategies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">E) Immigration Status</h3>
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 rounded-lg p-6">
                    <p className="font-semibold text-purple-900 dark:text-purple-200 mb-2">
                      ⚠️ Important Clarification
                    </p>
                    <p className="text-purple-800 dark:text-purple-300">
                      <strong>Owning property in California does NOT automatically grant you a visa, green card, or right to work in the United States.</strong> Real estate ownership and immigration status are separate matters. If you're considering US residency, business investments (EB-5), or long-term stays, consult an immigration attorney.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-6 mt-8">
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                    🔒 Legal & Tax Disclaimer
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-300 mt-2">
                    This section is for educational purposes only. <strong>Always consult a California real estate attorney, cross-border tax advisor (CPA), and immigration attorney before making any decisions.</strong> Laws change frequently and your situation is unique.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab 5: FAQ */}
          <TabsContent value="5" className="space-y-6">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="h-8 w-8 text-[#d4af37]" />
                <h2 className="font-serif text-3xl font-bold text-[#d4af37]">5. Common Questions from International Buyers</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    q: "Do I need to be a US citizen or permanent resident to buy a home in California?",
                    a: "No. Foreign nationals can freely purchase property in California with the same rights as US citizens. You do not need citizenship, a green card, or even a US visa to buy real estate."
                  },
                  {
                    q: "Can I buy a house entirely from overseas without flying to the US?",
                    a: "Yes! Many international buyers complete the entire process remotely using virtual tours, video calls, electronic signatures, and wire transfers. Your agent coordinates everything, though visiting in person for final inspections is recommended when possible."
                  },
                  {
                    q: "Can I put the property in my company's name?",
                    a: "Yes. You can take title in your personal name, an LLC, a trust, or other legal entity. The best structure depends on your tax situation, estate planning goals, and asset protection needs—discuss with your attorney and CPA."
                  },
                  {
                    q: "How much money do I typically need for a down payment as a foreign national?",
                    a: "Cash buyers can pay 100%. If financing, expect 30-40% down payment (or more) through foreign national loan programs. Some lenders may require as much as 50% down depending on your situation and the property."
                  },
                  {
                    q: "Can I get a mortgage without US credit history?",
                    a: "Yes. Some lenders offer foreign national mortgages and will use international credit references, bank statements, and proof of income instead of US credit scores. Rates and terms will differ from standard US mortgages."
                  },
                  {
                    q: "How do I move large amounts of money into the US safely?",
                    a: "International wire transfers are standard for real estate purchases. Work with your bank and the US receiving bank to ensure proper documentation, anti-money-laundering compliance, and proof of source of funds. Keep all records for your lender and title company."
                  },
                  {
                    q: "What happens with property taxes if I don't live in the US full-time?",
                    a: "You still owe California property taxes regardless of where you live. Taxes are based on the assessed value of the property and are due twice yearly. You can pay remotely via wire transfer or authorize automatic payments."
                  },
                  {
                    q: "Can I buy a home for my child who is studying in California?",
                    a: "Absolutely. Many international parents buy homes for children attending California universities. Your child can live there while studying, and you can take title in your name, your child's name, or a trust—consult your advisors for the best structure."
                  },
                  {
                    q: "Can I rent out the property when I'm not using it?",
                    a: "Yes. California allows property owners to rent out their homes. However, rental income is taxable in the US, and you'll need to file US tax returns. Work with a property management company and a cross-border tax advisor to handle this properly."
                  },
                  {
                    q: "How long does the whole purchase process usually take?",
                    a: "From offer acceptance to closing typically takes 30 days, though it can be shorter (cash deals) or longer (complex financing or international documentation). Pre-approval and property search timing vary based on your goals and market conditions."
                  },
                  {
                    q: "What if I need to sell the property later?",
                    a: "You can sell at any time. However, foreign sellers are subject to FIRPTA withholding (typically 15% of sale price withheld for taxes). Proper planning with your CPA can help minimize this. Your agent will coordinate the sale process just like the purchase."
                  },
                  {
                    q: "Do I need a Social Security Number (SSN) to buy property?",
                    a: "No, but you'll need a Tax Identification Number (ITIN) for tax purposes if you don't have an SSN. Your CPA or closing attorney can help you apply for an ITIN during the purchase process."
                  },
                  {
                    q: "Can I visit my property whenever I want?",
                    a: "Yes, subject to US visa requirements for entry. Owning property doesn't grant you immigration benefits, but you can visit as a tourist (visa waiver or tourist visa) according to standard rules. Consult an immigration attorney if you plan extended stays."
                  },
                  {
                    q: "What about homeowners insurance?",
                    a: "Yes, you'll need homeowners insurance (and earthquake insurance is highly recommended in California). Your agent can connect you with insurance providers experienced with international buyers. Insurance can be arranged before closing."
                  },
                  {
                    q: "Are there restrictions on which properties I can buy?",
                    a: "Generally no. You can buy single-family homes, condos, townhomes, multi-family properties, or land. Some planned communities or HOAs may have rental restrictions, so check those rules if you plan to rent the property out."
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-muted/30 rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold text-foreground mb-2">Q: {item.q}</h3>
                    <p className="text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Tab 6: Work With Agent */}
          <TabsContent value="6" className="space-y-6">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Phone className="h-8 w-8 text-[#d4af37]" />
                <h2 className="font-serif text-3xl font-bold text-[#d4af37]">6. Work With Agent Kammer – Your International Buyer Concierge</h2>
              </div>
              
              <div className="space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As a luxury real estate concierge specializing in international buyers, Agent Kammer understands the unique challenges of purchasing property across borders. Whether you're in London, Dubai, Singapore, or São Paulo, we work seamlessly across time zones to make your California dream home a reality.
                </p>

                <div>
                  <h3 className="font-semibold text-xl mb-4 text-foreground">What We Do for International Buyers</h3>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {[
                      "Curated property lists tailored to your goals and budget",
                      "Detailed virtual tours with professional commentary",
                      "Coordination with lenders, escrow, title, and inspectors",
                      "Introductions to trusted attorneys, CPAs, and professionals",
                      "Time-zone-friendly communication (WhatsApp, Zoom, email)",
                      "Market analysis and neighborhood education",
                      "Negotiation strategy based on local market dynamics",
                      "Document coordination for remote closings",
                      "Post-closing support: property management, maintenance",
                      "Long-term relationship: we're here for your next purchase too"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 border border-[#d4af37]/30 rounded-lg p-8">
                  <h3 className="font-semibold text-2xl mb-6 text-center text-foreground">3 Simple Steps to Get Started</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-2xl mx-auto mb-4">1</div>
                      <h4 className="font-semibold mb-2 text-foreground">Fill Out Intake Form</h4>
                      <p className="text-sm text-muted-foreground">Share your budget, timing, goals, and country of residence</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-2xl mx-auto mb-4">2</div>
                      <h4 className="font-semibold mb-2 text-foreground">Private Consultation</h4>
                      <p className="text-sm text-muted-foreground">Schedule a Zoom or WhatsApp call at your convenience</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-[#d4af37] text-black font-bold flex items-center justify-center text-2xl mx-auto mb-4">3</div>
                      <h4 className="font-semibold mb-2 text-foreground">Receive Your Roadmap</h4>
                      <p className="text-sm text-muted-foreground">Get a tailored California property plan and curated matches</p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h3 className="font-semibold text-2xl mb-6 text-center text-foreground">International Buyer Inquiry Form</h3>
                  <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Smith"
                          data-testid="input-buyer-name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          data-testid="input-buyer-email"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Country of Residence *</label>
                        <Input
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          placeholder="United Kingdom"
                          data-testid="input-buyer-country"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Budget Range *</label>
                        <Input
                          required
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          placeholder="$2M - $5M"
                          data-testid="input-buyer-budget"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Timing *</label>
                      <Input
                        required
                        value={formData.timing}
                        onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                        placeholder="Next 3-6 months"
                        data-testid="input-buyer-timing"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Goals & Questions</label>
                      <Textarea
                        value={formData.goals}
                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                        placeholder="Tell us about your property goals, preferred neighborhoods, and any specific questions..."
                        rows={4}
                        data-testid="input-buyer-goals"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#d4af37] hover:bg-[#c19b2f] text-black font-semibold"
                      data-testid="button-submit-inquiry"
                    >
                      Submit Inquiry
                    </Button>
                  </form>
                </div>

                <div className="text-center bg-muted/30 rounded-lg p-6">
                  <p className="text-lg text-muted-foreground">
                    Even if you're just exploring, we welcome your questions. California real estate can feel complex from overseas, but with the right guidance, it's a smooth and rewarding journey. Let's start the conversation today.
                  </p>
                  <p className="mt-4 font-semibold text-[#d4af37]">
                    🌏 Agent Kammer – Your California Concierge, Worldwide
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
