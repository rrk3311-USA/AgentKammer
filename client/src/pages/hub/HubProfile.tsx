import { useEffect, useState } from "react";
import { Link } from "wouter";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { fetchHubSnapshot, HubShell, type HubSnapshot } from "./HubShell";

export default function HubProfile() {
  usePageMetadata({
    title: "Profile",
    description: "Lightweight housing profile - claim with email when you want continuity.",
    path: "/hub/profile",
  });

  const [hub, setHub] = useState<HubSnapshot | null>(null);

  useEffect(() => {
    void fetchHubSnapshot().then(setHub);
  }, []);

  return (
    <HubShell title="Profile" description="Only what you’ve shared. Nothing invented.">
      <div className="max-w-xl space-y-6">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
              Objective
            </dt>
            <dd className="mt-1 text-[#2F3136]/85">{hub?.currentObjective || " - "}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
              Timeline
            </dt>
            <dd className="mt-1 text-[#2F3136]/85">{hub?.timeline || " - "}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
              Visitor id
            </dt>
            <dd className="mt-1 text-[#2F3136]/55 font-mono text-xs">{hub?.visitorId || " - "}</dd>
          </div>
        </dl>
        <Link
          href="/account"
          className="inline-flex bg-[#2A3447] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5F2EB]"
        >
          Claim with email
        </Link>
        <p className="text-xs text-[#2F3136]/55 leading-relaxed">
          Email magic link, PIN, and Google sign-in keep this portal lightweight. Internal scores stay off this
          page.
        </p>
      </div>
    </HubShell>
  );
}
