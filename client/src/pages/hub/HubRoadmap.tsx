import { useEffect, useState } from "react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { ROADMAP_MILESTONES } from "@shared/client-profile";
import { fetchHubSnapshot, HubShell, type HubSnapshot } from "./HubShell";

const STAGE_INDEX: Record<string, number> = {
  anonymous: 0,
  engaged: 0,
  profiled: 0,
  qualified: 2,
  call_ready: 1,
  advisory_client: 3,
  transaction_ready: 4,
  active_client: 5,
  closed: 5,
  long_term_nurture: 0,
};

export default function HubRoadmap() {
  usePageMetadata({
    title: "Where things stand",
    description: "A simple path from a clarified situation to a search in motion - at your pace.",
    path: "/hub/roadmap",
  });

  const [hub, setHub] = useState<HubSnapshot | null>(null);

  useEffect(() => {
    void fetchHubSnapshot().then(setHub);
  }, []);

  const active = STAGE_INDEX[hub?.roadmapMilestone || "anonymous"] ?? 0;

  return (
    <HubShell title="Where things stand" description="Six checkpoints. Not a sales funnel.">
      <ol className="space-y-0">
        {ROADMAP_MILESTONES.map((milestone, index) => {
          const done = index < active;
          const current = index === active;
          return (
            <li
              key={milestone}
              className={`flex gap-4 border-l border-[#D8D1C7] pl-6 py-4 ${
                current ? "bg-[#D8D1C7]/25" : ""
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-[10px] ${
                  done || current ? "bg-[#2A3447] text-[#F5F2EB]" : "border border-[#D8D1C7] text-[#2A3447]/50"
                }`}
              >
                {index + 1}
              </span>
              <div>
                <p className="font-serif text-lg text-[#2A3447]">{milestone}</p>
                {current && (
                  <p className="mt-1 text-sm text-[#2F3136]/70">
                    {hub?.nextRecommendedStep || "Continue clarifying what matters most."}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </HubShell>
  );
}
