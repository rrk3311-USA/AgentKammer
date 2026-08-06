import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useToast } from "@/hooks/use-toast";
import { trackVisitorSignal } from "@/lib/visitor-signals";

const ASSISTANT_SESSION_KEY = "akDecisionAssistantSessionId";
const SIGNAL_SESSION_KEY = "ak_visitor_session";

type HubSnapshot = {
  id: string;
  email: string;
  displayName: string | null;
  goals: string | null;
  vision: string | null;
  priorities: string | null;
  progressStage: string;
  conversationCount: number;
  decisionMap: Record<string, unknown> | null;
};

function readLocal(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function readSession(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export default function Account() {
  usePageMetadata({
    title: "Resume My Decision",
    description:
      "Resume your Decision with email and a one-time PIN - no password, no account to set up.",
    path: "/account",
  });

  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [phase, setPhase] = useState<"email" | "pin">("email");
  const [sending, setSending] = useState(false);
  const [hub, setHub] = useState<HubSnapshot | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/account/hub", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) return;
        const body = await res.json();
        if (body?.hub) setHub(body.hub as HubSnapshot);
      })
      .catch(() => undefined);
  }, []);

  const requestPin = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      toast({
        title: "Email needed",
        description: "Enter the email where we should send your verification code.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      trackVisitorSignal("email_capture", "create_account_pin_request");
      const response = await fetch("/api/account/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: trimmed,
          assistantSessionId: readLocal(ASSISTANT_SESSION_KEY),
          signalSessionId: readSession(SIGNAL_SESSION_KEY),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body.error || "Could not send code");
      }

      setEmail(trimmed);
      setPhase("pin");
      setHint(
        typeof body.devPin === "string"
          ? `Dev code: ${body.devPin}`
          : body.message || "Check your email for a 6-digit code.",
      );
      toast({
        title: "Code sent",
        description: body.message || "Enter the 6-digit code from your email.",
      });
    } catch (err) {
      toast({
        title: "Could not send code",
        description: err instanceof Error ? err.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const verifyPin = async (event: FormEvent) => {
    event.preventDefault();
    const code = pin.trim();
    if (!/^\d{6}$/.test(code)) {
      toast({
        title: "Six digits needed",
        description: "Enter the 6-digit code from your email.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      trackVisitorSignal("email_capture", "create_account_pin_verify");
      const response = await fetch("/api/account/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, pin: code }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body.error || "Verification failed");
      }

      // Prefer httpOnly cookie; clear any legacy localStorage token
      try {
        window.localStorage.removeItem("ak_member_token");
      } catch {
        /* ignore */
      }

      setHub(body.hub as HubSnapshot);
      toast({
        title: body.hasChatHistory ? "Decision Map restored" : "Decision Hub ready",
        description: body.hasChatHistory
          ? "Your conversation is attached to this profile."
          : "You can return anytime from this device - or verify email again elsewhere.",
      });
      setLocation("/hub");
    } catch (err) {
      toast({
        title: "Could not verify",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Resume My Decision"
        title="Resume where you left off."
        description="Chat freely - nothing to set up. When you want to keep your Decision Map, enter email, verify with a one-time PIN, and continue planning from anywhere."
        art="decision-framework"
      />

      <div className="border-b border-brand-border bg-brand-ivory text-brand-ink">
        <PageSection>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="How it works"
                title="No sign-up ceremony"
                description="You explore freely, invisibly, before anything is saved. Email + PIN only when you want to save or recover your Decision."
              />
              <ul className="mt-8 grid gap-3 text-sm leading-6 text-brand-graphite">
                <li>Cookie - return on the same device</li>
                <li>Email + PIN - recover on another device</li>
                <li>Magic link - coming next from your Decision Recap email</li>
              </ul>
            </div>

            <div className="border border-brand-border bg-white p-6 sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Verify</p>
              <h2 className="mt-3 font-display text-3xl leading-none text-brand-navy">
                {phase === "email" ? "Email me a code" : "Enter your code"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-brand-graphite/75">
                {phase === "email"
                  ? "We never open your Decision Hub from email alone - only after the PIN."
                  : `Code sent to ${email}. Expires in 15 minutes.`}
              </p>

              {hub ? (
                <div className="mt-8 border border-brand-brass/40 bg-brand-ivory/80 px-4 py-5 text-sm leading-6 text-brand-graphite">
                  <p className="font-medium text-brand-navy">Hub ready for {hub.email}</p>
                  <p className="mt-2">
                    {hub.conversationCount > 0
                      ? `${hub.conversationCount} conversation${hub.conversationCount === 1 ? "" : "s"} claimed.`
                      : "Profile created. Start chatting with Raphi to fill your Decision Map."}
                  </p>
                  <Link
                    href="/hub"
                    className="mt-4 inline-flex bg-brand-navy px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory"
                  >
                    Open Decision Hub
                  </Link>
                </div>
              ) : phase === "email" ? (
                <form onSubmit={requestPin} className="mt-8 grid gap-3">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-brand-cocoa" htmlFor="account-email">
                    Email
                  </label>
                  <input
                    id="account-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full border border-brand-border bg-white px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-brass"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-brand-navy px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "Send verification code"}
                  </button>
                </form>
              ) : (
                <form onSubmit={verifyPin} className="mt-8 grid gap-3">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-brand-cocoa" htmlFor="account-pin">
                    6-digit code
                  </label>
                  <input
                    id="account-pin"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{6}"
                    maxLength={6}
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="••••••"
                    className="w-full border border-brand-border bg-white px-3 py-3 text-center text-lg tracking-[0.35em] text-brand-ink outline-none focus:border-brand-brass"
                  />
                  {hint ? <p className="text-xs text-brand-graphite/70">{hint}</p> : null}
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-brand-navy px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ivory transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
                  >
                    {sending ? "Verifying…" : "Open Decision Hub"}
                  </button>
                  <button
                    type="button"
                    className="text-[11px] uppercase tracking-[0.14em] text-brand-graphite hover:text-brand-brass"
                    onClick={() => {
                      setPhase("email");
                      setPin("");
                      setHint(null);
                    }}
                  >
                    Use a different email
                  </button>
                </form>
              )}

              <p className="mt-6 text-[12px] leading-5 text-brand-graphite/65">
                Already exploring with Raphi?{" "}
                <Link href="/" className="text-brand-navy underline decoration-brand-brass/40 underline-offset-2">
                  Continue on the homepage
                </Link>
                - your chat attaches when you verify.
              </p>
            </div>
          </div>
        </PageSection>
      </div>
    </>
  );
}
