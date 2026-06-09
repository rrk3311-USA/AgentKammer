import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type ManhattanBriefSubscribeProps = {
  id?: string;
  variant?: "inline" | "card";
  className?: string;
};

export function ManhattanBriefSubscribe({
  id = "manhattan-brief",
  variant = "card",
  className = "",
}: ManhattanBriefSubscribeProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

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
        leadSource: "manhattan_brief",
        conversationSummary: "Subscribed to Manhattan Brief newsletter",
        communicationStyle: "Newsletter",
        leadScore: 2,
      });

      setIsSuccess(true);
      toast({
        title: "Subscribed",
        description: "Manhattan Brief is on its way to your inbox.",
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

  const form = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        disabled={isLoading || isSuccess}
        onChange={(e) => setEmail(e.target.value)}
        className={
          variant === "card"
            ? "h-12 rounded-brand border-brand-ivory/20 bg-brand-ivory/[0.08] text-brand-ivory placeholder:text-brand-ivory/45 focus:border-brand-champagne focus:ring-brand-champagne"
            : "h-11 rounded-brand border-brand-champagne/35 bg-white text-brand-graphite placeholder:text-brand-graphite/45"
        }
        aria-label="Email for Manhattan Brief"
      />
      <Button
        type="submit"
        variant="brand"
        disabled={isLoading || isSuccess}
        className="h-12 shrink-0 px-8"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Subscribed
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );

  if (variant === "inline") {
    return (
      <div id={id} className={className}>
        {form}
        <p className="mt-3 text-sm leading-6 text-brand-graphite/62">
          No spam. No listing blasts. Just thoughtful observations from Manhattan.
        </p>
      </div>
    );
  }

  return (
    <section id={id} className={`bg-brand-midnight px-6 py-14 text-brand-ivory lg:px-10 lg:py-16 ${className}`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-champagne">Manhattan Brief</p>
        <h2 className="font-serif text-3xl font-semibold md:text-4xl">Monthly Observations From Manhattan</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-brand-ivory/78">
          Buildings, neighborhoods, market shifts, and noteworthy residences — interpreted with care, not urgency.
        </p>
        <div className="mx-auto mt-8 max-w-xl">{form}</div>
        <p className="mt-4 text-sm leading-6 text-brand-ivory/58">
          No spam. No listing blasts. Just thoughtful observations from Manhattan.
        </p>
      </div>
    </section>
  );
}
