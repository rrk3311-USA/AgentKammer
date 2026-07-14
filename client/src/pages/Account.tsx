import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { PageHero, PageSection, SectionHeading } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useToast } from "@/hooks/use-toast";
import { trackVisitorSignal } from "@/lib/visitor-signals";

const MEMBER_TOKEN_KEY = "ak_member_token";
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
    title: "Create Your Account",
    description:
      "Save your Decision Map, goals, and conversations in your Agent Kammer Decision Hub.",
    path: "/account",
  });

  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [hub, setHub] = useState<HubSnapshot | null>(null);

  useEffect(() => {
    const token = readLocal(MEMBER_TOKEN_KEY);
    if (!token) return;
    void fetch("/api/account/hub", {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) return;
        const body = await res.json();
        if (body?.hub) setHub(body.hub as HubSnapshot);
      })
      .catch(() => undefined);
  }, []);

  const claimAccount = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      toast({
        title: "Email needed",
        description: "Enter the email where we should save your Decision Hub.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      trackVisitorSignal("email_capture", "create_account_claim");
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
        throw new Error(body.error || "Claim failed");
      }

      if (body.accessToken) {
        try {
          window.localStorage.setItem(MEMBER_TOKEN_KEY, body.accessToken);
        } catch {
          /* ignore */
        }
      }

      setHub(body.hub as HubSnapshot);
      toast({
        title: body.hasChatHistory ? "Decision Map saved" : "Account created",
        description: body.hasChatHistory
          ? "Your Raphi conversation is now attached to this member profile."
          : "Your Decision Hub is ready. Chat with Raphi anytime — it will stay linked.",
      });
      setLocation("/hub");
    } catch {
      toast({
        title: "Could not create account",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Decision Hub"
        title="Create your account"
        description="Save progress with Raphi. Your goals, Decision Map, conversations, and building reports live in one member place — so you can return months later and pick up where you left off."
      />

      <div className="border-b border-brand-border bg-brand-ivory text-brand-ink">
        <PageSection>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Membership"
                title="Your real estate life, organized"
                description="Not another transaction portal. A Decision Hub for direction, homes, buildings, documents, and advisor memory."
              />
              <ul className="mt-8 grid gap-3 text-sm leading-6 text-brand-graphite">
                <li>My Direction — vision, goals, priorities</li>
                <li>My Decisions — briefs and open questions</li>
                <li>My Buildings & Reports — what you have explored</li>
                <li>My Conversations — every chat with Raphi</li>
              </ul>
            </div>

            <div className="border border-brand-border bg-white p-6 sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-brand-cocoa">Sign in</p>
              <h2 className="mt-3 font-display text-3xl leading-none text-brand-navy">Save your Decision Map</h2>
              <p className="mt-3 text-sm leading-6 text-brand-graphite/75">
                No password. Continue with Google later, or create your hub with email now — we attach your current chat automatically.
              </p>

              <button
                type="button"
                className="mt-8 flex w-full items-center justify-center gap-3 border border-brand-border bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-navy transition-colors hover:border-brand-brass"
                onClick={() => {
                  trackVisitorSignal("account_google_intent", "create_account");
                  toast({
                    title: "Google sign-in next",
                    description: "Use email below for now — it claims your current Raphi session into a member profile.",
                  });
                }}
              >
                Continue with Google
              </button>

              <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-brand-cocoa/80">
                <span className="h-px flex-1 bg-brand-border" />
                or
                <span className="h-px flex-1 bg-brand-border" />
              </div>

              {hub ? (
                <div className="border border-brand-brass/40 bg-brand-ivory/80 px-4 py-5 text-sm leading-6 text-brand-graphite">
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
              ) : (
                <form onSubmit={claimAccount} className="grid gap-3">
                  <label className="text-[10px] uppercase tracking-[0.18em] text-brand-cocoa" htmlFor="account-email">
                    Email me into my Decision Hub
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
                    {sending ? "Saving…" : "Create my account"}
                  </button>
                </form>
              )}

              <p className="mt-6 text-[12px] leading-5 text-brand-graphite/65">
                Already exploring with Raphi?{" "}
                <Link href="/buyer-advisory" className="text-brand-navy underline-offset-2 hover:underline">
                  Continue the Decision Guide
                </Link>
                . Creating an account claims that progress into your hub.
              </p>
            </div>
          </div>
        </PageSection>
      </div>
    </>
  );
}
