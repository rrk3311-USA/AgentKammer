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
    <Card className="p-8 lg:p-12 my-8 bg-gradient-to-br from-[#0a1628] to-[#1a2638] border-[#d4af37]/30 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
          <Download className="h-10 w-10 text-[#d4af37]" />
        </div>
        
        <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-4">
          Download {marketName} Market Report
        </h2>
        
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Get a comprehensive PDF market report with all the data on this page — beautifully formatted and branded with our emblem. Perfect for sharing or printing.
        </p>

        {isSuccess ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <CheckCircle className="h-16 w-16 text-emerald-400" />
            <p className="text-xl text-emerald-400 font-semibold">Report sent successfully!</p>
            <p className="text-white/70">Check your email inbox</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#d4af37] focus:ring-[#d4af37]"
                  data-testid="input-market-report-email"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="h-14 px-8 bg-[#d4af37] hover:bg-[#c49d2f] text-black font-semibold"
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
            
            <p className="text-sm text-white/60 mt-4">
              The report will be emailed to you instantly as a PDF attachment
            </p>
          </form>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Professional Format</h3>
              <p className="text-sm text-white/70">Branded cover page with our emblem and contact info</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Complete Data</h3>
              <p className="text-sm text-white/70">All metrics, projections, and insights in print-ready format</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Instant Delivery</h3>
              <p className="text-sm text-white/70">Receive your PDF via email within seconds</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
