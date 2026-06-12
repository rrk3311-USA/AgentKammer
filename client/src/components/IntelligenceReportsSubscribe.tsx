import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const reportTopics = [
  "Executive Housing",
  "Building Intelligence",
  "Manhattan Market Trends",
];

type IntelligenceReportsSubscribeProps = {
  id?: string;
  variant?: "light" | "dark";
  className?: string;
};

export function IntelligenceReportsSubscribe({
  id = "intelligence-reports",
  variant = "light",
  className = "",
}: IntelligenceReportsSubscribeProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const isDark = variant === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await apiRequest("POST", "/api/leads", {
        email,
        leadSource: "intelligence_reports",
        conversationSummary: "Subscribed to Intelligence Reports — Executive Housing, Building Intelligence, Market Trends",
        communicationStyle: "Intelligence Reports",
        leadScore: 3,
      });

      setIsSuccess(true);
      toast({
        title: "You're on the list",
        description: "Future intelligence reports will reach your inbox.",
      });

      setTimeout(() => {
        setEmail("");
        setIsSuccess(false);
      }, 4000);
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id={id}
      className={`${isDark ? "bg-brand-midnight text-brand-ivory" : "border border-brand-champagne/35 bg-[#f7f3ea] text-brand-graphite"} px-6 py-10 lg:px-8 ${className}`}
    >
      <div className="mx-auto max-w-xl">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? "text-brand-champagne" : "text-brand-champagne-dark"}`}
        >
          Intelligence Reports
        </p>
        <h2 className={`mt-3 font-serif text-2xl font-semibold md:text-3xl ${isDark ? "text-brand-ivory" : "text-brand-midnight"}`}>
          Receive Future Intelligence Reports
        </h2>
        <p className={`mt-3 text-sm leading-6 ${isDark ? "text-brand-ivory/72" : "text-brand-graphite/72"}`}>
          Get quarterly updates on Manhattan executive housing, building research, and market context — not listing blasts.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            disabled={isLoading || isSuccess}
            onChange={(e) => setEmail(e.target.value)}
            className={
              isDark
                ? "h-12 rounded-brand border-brand-ivory/20 bg-brand-ivory/[0.08] text-brand-ivory placeholder:text-brand-ivory/45"
                : "h-12 rounded-brand border-brand-graphite/15 bg-white text-brand-graphite"
            }
            aria-label="Email for intelligence reports"
          />
          <Button type="submit" variant="brand" disabled={isLoading || isSuccess} className="h-12 shrink-0 px-8">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Subscribed
              </>
            ) : (
              "Get Updates"
            )}
          </Button>
        </form>

        <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.14em] ${isDark ? "text-brand-ivory/55" : "text-brand-graphite/55"}`}>
          Quarterly updates on:
        </p>
        <ul className={`mt-2 space-y-1 text-sm ${isDark ? "text-brand-ivory/78" : "text-brand-graphite/72"}`}>
          {reportTopics.map((topic) => (
            <li key={topic}>· {topic}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
