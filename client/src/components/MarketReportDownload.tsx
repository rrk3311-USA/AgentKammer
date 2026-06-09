import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Mail, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface MarketReportDownloadProps {
  market: 'california' | 'nyc' | 'nevada';
  marketName: string;
}

export function MarketReportDownload({ market, marketName }: MarketReportDownloadProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await apiRequest('POST', '/api/market-report', { email, market });

      setIsSuccess(true);
      toast({
        title: "Success!",
        description: `Your ${marketName} market report has been sent to ${email}`,
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("");
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send market report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="my-8 rounded-none border border-brand-champagne/35 bg-brand-midnight p-8 text-brand-ivory shadow-none lg:p-12">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-brand border border-brand-champagne/45 bg-brand-ivory/5">
          <Download className="h-8 w-8 text-brand-champagne" strokeWidth={1.5} />
        </div>
        
        <h2 className="mb-4 font-serif text-3xl font-semibold lg:text-4xl">
          Download {marketName} Market Report
        </h2>
        
        <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-brand-ivory/72">
          Receive a concise PDF brief with market perspective, building analysis, and advisory notes from this page.
        </p>

        {isSuccess ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <CheckCircle className="h-14 w-14 text-brand-champagne" strokeWidth={1.5} />
            <p className="text-xl font-semibold text-brand-champagne">Report sent successfully.</p>
            <p className="text-brand-ivory/70">Check your email inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-ivory/45" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-brand border-brand-ivory/20 bg-brand-ivory/[0.08] pl-12 text-brand-ivory placeholder:text-brand-ivory/45 focus:border-brand-champagne focus:ring-brand-champagne"
                  data-testid="input-market-report-email"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="h-14 rounded-brand border border-brand-champagne bg-brand-champagne px-8 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-midnight hover:bg-brand-champagne/90"
                data-testid="button-download-report"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Get PDF Report
                  </>
                )}
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-brand-ivory/55">
              The report will be emailed as a PDF attachment.
            </p>
          </form>
        )}

        <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-brand border border-brand-champagne/35 bg-brand-ivory/5">
              <CheckCircle className="h-4 w-4 text-brand-champagne" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Professional Format</h3>
              <p className="text-sm leading-6 text-brand-ivory/66">Branded cover page with concise advisory framing.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-brand border border-brand-champagne/35 bg-brand-ivory/5">
              <CheckCircle className="h-4 w-4 text-brand-champagne" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Contextual Review</h3>
              <p className="text-sm leading-6 text-brand-ivory/66">Market data translated into clear judgment — not raw numbers.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-brand border border-brand-champagne/35 bg-brand-ivory/5">
              <CheckCircle className="h-4 w-4 text-brand-champagne" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Private Delivery</h3>
              <p className="text-sm leading-6 text-brand-ivory/66">Delivered directly to the email you provide.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
