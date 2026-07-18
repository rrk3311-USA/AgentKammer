import { useEffect, useState } from "react";
import { Link } from "wouter";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { fetchHubSnapshot, HubShell, type HubSnapshot } from "./HubShell";

export default function HubSaved() {
  usePageMetadata({
    title: "Saved",
    description: "Pages, buildings, listings, and goals you’ve kept.",
    path: "/hub/saved",
  });

  const [hub, setHub] = useState<HubSnapshot | null>(null);

  useEffect(() => {
    void fetchHubSnapshot().then(setHub);
  }, []);

  return (
    <HubShell title="Saved" description="What you’ve chosen to keep nearby.">
      <div className="grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">Goals</h2>
          <ul className="mt-4 space-y-3">
            {(hub?.goals || []).map((g) => (
              <li key={g.id} className="text-sm text-[#2F3136]/85 border-l border-[#D8D1C7] pl-3">
                {g.goal}
              </li>
            ))}
            {!hub?.goals?.length && <li className="text-sm text-[#2F3136]/55">No saved goals yet.</li>}
          </ul>
        </section>
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
            Pages & buildings
          </h2>
          <ul className="mt-4 space-y-3">
            {(hub?.saved || []).map((s) => (
              <li key={s.id}>
                {s.path ? (
                  <Link href={s.path} className="text-sm text-[#2A3447] underline-offset-4 hover:underline">
                    {s.title}
                  </Link>
                ) : (
                  <span className="text-sm text-[#2F3136]/85">{s.title}</span>
                )}
              </li>
            ))}
            {!hub?.saved?.length && (
              <li className="text-sm text-[#2F3136]/55">Save buildings and insights as you explore.</li>
            )}
          </ul>
        </section>
      </div>
    </HubShell>
  );
}
