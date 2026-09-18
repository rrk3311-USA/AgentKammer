import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHero, PageSection } from "@/components/site-shell";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useToast } from "@/hooks/use-toast";
import {
  checkoutTopUp,
  confirmTopUp,
  createLivabilityRun,
  fetchToolsStatus,
  fetchToolsWallet,
  readImagePayloads,
  rememberToolsPreviewFromLocation,
  type PublicToolRun,
  type ToolsWalletView,
} from "@/lib/tools-client";
import { ToolsComingSoon } from "./ToolsComingSoon";
import type { LivabilityResult } from "@shared/tools";

const DIMENSION_LABELS: Array<{ key: keyof LivabilityResult["dimensions"]; label: string }> = [
  { key: "walkability", label: "Walk" },
  { key: "quiet", label: "Quiet" },
  { key: "light", label: "Light" },
  { key: "amenities", label: "Amenities" },
  { key: "belonging", label: "Belonging" },
  { key: "transit", label: "Transit" },
];

export default function LivabilityTool() {
  usePageMetadata({
    title: "Livability Score",
    description: "A calm diagnostic of how a home lives — address, listing link, or photos.",
    path: "/tools/livability",
    robots: "noindex, nofollow",
  });

  const search = useSearch();
  const { toast } = useToast();
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [wallet, setWallet] = useState<ToolsWalletView | null>(null);
  const [address, setAddress] = useState("");
  const [listingUrl, setListingUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [toppingUp, setToppingUp] = useState<number | null>(null);
  const [run, setRun] = useState<PublicToolRun | null>(null);

  useEffect(() => {
    rememberToolsPreviewFromLocation();
    void fetchToolsStatus()
      .then((status) => setUnlocked(status.unlocked))
      .catch(() => setUnlocked(false));
    void fetchToolsWallet()
      .then((body) => setWallet(body.wallet))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const sessionId = params.get("session_id");
    if (params.get("topup") !== "success" || !sessionId) return;
    void confirmTopUp(sessionId)
      .then((body) => {
        setWallet(body.wallet);
        toast({
          title: body.duplicate ? "Top-up already applied" : "Credits added",
          description: `${body.credits} credit${body.credits === 1 ? "" : "s"} in the wallet.`,
        });
      })
      .catch((error) => {
        toast({
          title: "Top-up not confirmed yet",
          description: error instanceof Error ? error.message : "Refresh in a moment.",
          variant: "destructive",
        });
      });
  }, [search, toast]);

  const result = run?.result || null;
  const fileNames = useMemo(() => files.map((file) => file.name).join(", "), [files]);

  if (unlocked === null) {
    return <div className="bg-brand-ivory px-6 py-24 text-brand-graphite">Opening Livability…</div>;
  }
  if (!unlocked) return <ToolsComingSoon />;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const images = files.length ? await readImagePayloads(files) : [];
      const body = await createLivabilityRun({ address, listingUrl, notes, images });
      setRun(body.run);
      setWallet(body.wallet);
      toast({
        title: body.firstFree ? "First run is on the house" : "Run complete",
        description: body.firstFree ? "Your next Livability Score is 1 credit." : `${body.chargedCredits} credit used.`,
      });
    } catch (error) {
      const status = (error as { status?: number }).status;
      toast({
        title: status === 402 ? "Add credits to continue" : "Could not finish the run",
        description: error instanceof Error ? error.message : "Try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onTopUp = async (pack: number) => {
    setToppingUp(pack);
    try {
      const body = await checkoutTopUp(pack);
      if (body.stub && body.wallet) {
        setWallet(body.wallet);
        toast({
          title: "Test-mode top-up",
          description: body.message || `${pack} credits added without Stripe.`,
        });
        return;
      }
      if (body.url) {
        window.location.href = body.url;
      }
    } catch (error) {
      toast({
        title: "Checkout did not start",
        description: error instanceof Error ? error.message : "Try another amount.",
        variant: "destructive",
      });
    } finally {
      setToppingUp(null);
    }
  };

  return (
    <main className="bg-brand-ivory">
      <PageHero
        eyebrow="Livability Score"
        title="How this home lives."
        description="Submit an address, a listing link, or photos. The first run is free. After that, one credit is one dollar."
        art="neighborhood-guides"
        kicker={
          <div className="ak-copy space-y-3">
            <p className="ak-kicker">Wallet</p>
            <p className="ak-title">{wallet ? wallet.credits : "—"} credits</p>
            <p>{wallet?.nextRunLabel || "Loading run cost…"}</p>
          </div>
        }
      />

      <PageSection className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.7fr)] lg:items-start">
        <form onSubmit={onSubmit} className="border border-brand-border bg-white p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-cocoa">Inputs</p>
          <h2 className="mt-3 font-display text-3xl leading-none text-brand-navy">Read the place</h2>
          <p className="mt-3 text-sm leading-7 text-brand-graphite">
            Use any one field, or all three. This is a livability read — not a condition report.
          </p>

          <label className="mt-8 block text-[10px] uppercase tracking-[0.16em] text-brand-cocoa" htmlFor="livability-address">
            Address
          </label>
          <input
            id="livability-address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="15 Central Park West, New York, NY"
            className="mt-2 w-full border border-brand-border bg-white px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-brass"
          />

          <label className="mt-6 block text-[10px] uppercase tracking-[0.16em] text-brand-cocoa" htmlFor="livability-url">
            Listing link
          </label>
          <input
            id="livability-url"
            type="url"
            value={listingUrl}
            onChange={(event) => setListingUrl(event.target.value)}
            placeholder="https://streeteasy.com/…"
            className="mt-2 w-full border border-brand-border bg-white px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-brass"
          />

          <label className="mt-6 block text-[10px] uppercase tracking-[0.16em] text-brand-cocoa" htmlFor="livability-notes">
            Optional note
          </label>
          <textarea
            id="livability-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            placeholder="Household hours, pets, need for quiet…"
            className="mt-2 w-full border border-brand-border bg-white px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-brass"
          />

          <label className="mt-6 block text-[10px] uppercase tracking-[0.16em] text-brand-cocoa" htmlFor="livability-photos">
            Photos
          </label>
          <input
            id="livability-photos"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(event) => setFiles(Array.from(event.target.files || []).slice(0, 3))}
            className="mt-2 block w-full text-sm text-brand-graphite file:mr-4 file:border file:border-brand-border file:bg-brand-ivory file:px-3 file:py-2 file:text-[11px] file:uppercase file:tracking-[0.14em] file:text-brand-navy"
          />
          {fileNames ? <p className="mt-2 text-xs text-brand-graphite/70">{fileNames}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="ak-call-button mt-8 flex w-full items-center justify-between px-5 py-4 text-left disabled:opacity-60"
          >
            <span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-brass">
                {wallet?.nextRunCredits === 0 ? "First run free" : "1 credit"}
              </span>
              <span className="mt-2 block text-[11px] uppercase tracking-[0.16em] text-brand-ivory">
                {submitting ? "Reading the home…" : "Run Livability Score"}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-brand-ivory" strokeWidth={1.5} />
          </button>
        </form>

        <aside className="space-y-6">
          <div className="border border-brand-border bg-white p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-brand-cocoa">Credits</p>
            <p className="mt-3 font-display text-4xl text-brand-navy">{wallet?.credits ?? "—"}</p>
            <p className="mt-2 text-sm leading-6 text-brand-graphite">
              {wallet?.nextRunLabel}. Resume the wallet on another device with{" "}
              <Link href="/account" className="text-brand-navy underline decoration-brand-brass/40 underline-offset-2">
                email + PIN
              </Link>
              .
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {(wallet?.topUps || [5, 10, 15, 25].map((credits) => ({ credits, label: `$${credits}` }))).map((pack) => (
                <button
                  key={pack.credits}
                  type="button"
                  disabled={toppingUp !== null}
                  onClick={() => onTopUp(pack.credits)}
                  className="border border-brand-border px-3 py-3 text-[11px] uppercase tracking-[0.14em] text-brand-navy transition-colors hover:border-brand-brass disabled:opacity-60"
                >
                  {toppingUp === pack.credits ? "Adding…" : `Top up ${pack.label}`}
                </button>
              ))}
            </div>
            {wallet?.paymentsStubbed ? (
              <p className="mt-4 text-xs leading-5 text-brand-graphite/70">
                Stripe keys are not set — top-ups credit immediately in test mode.
              </p>
            ) : null}
          </div>

          {result ? (
            <div className="border border-brand-brass/35 bg-brand-navy p-6 text-brand-ivory">
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-brass">
                {result.mode === "demo" ? "Demo analysis" : "Model analysis"}
              </p>
              <p className="mt-3 font-display text-6xl leading-none">{result.score}</p>
              <p className="mt-4 text-sm leading-7 text-brand-ivory/80">{result.summary}</p>
              <div className="mt-6 grid gap-3">
                {DIMENSION_LABELS.map((dimension) => (
                  <div key={dimension.key}>
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.14em] text-brand-ivory/70">
                      <span>{dimension.label}</span>
                      <span>{result.dimensions[dimension.key]}</span>
                    </div>
                    <div className="mt-1 h-px bg-brand-ivory/15">
                      <div
                        className="h-px bg-brand-brass"
                        style={{ width: `${result.dimensions[dimension.key]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <ul className="mt-6 space-y-2 text-xs leading-5 text-brand-ivory/70">
                {result.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ) : run?.status === "failed" ? (
            <div className="border border-brand-border bg-white p-6 text-sm text-brand-graphite">
              {run.errorMessage || "The run did not finish. No credit was kept."}
            </div>
          ) : (
            <div className="border border-brand-border bg-white p-6 text-sm leading-7 text-brand-graphite">
              Result appears here after the read — score, dimensions, and a short judgment. No inspector pitch. The
              recommendation may still be to stay put.
            </div>
          )}
        </aside>
      </PageSection>
    </main>
  );
}
