import { Link } from "wouter";
import { ROADMAP_MILESTONES } from "@shared/client-profile";
import { publicMilestoneChecks, ROUTE_LABELS, type QualifyRoute } from "@shared/get-qualified";
import type { HubSnapshot } from "./HubShell";

export function QualifySubstatus({
  hub,
  fromQualify,
}: {
  hub?: Pick<
    HubSnapshot,
    | "getQualifiedComplete"
    | "sessionBooked"
    | "qualifyRoute"
    | "calendarUrl"
    | "diegoUrl"
    | "nextRecommendedStep"
  > | null;
  fromQualify?: boolean;
}) {
  const complete = Boolean(hub?.getQualifiedComplete || fromQualify);
  const route = hub?.qualifyRoute as QualifyRoute | null | undefined;
  const booked = Boolean(hub?.sessionBooked);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
            complete ? "bg-[#2A3447] text-[#F5F2EB]" : "border border-[#D8D1C7] text-[#2A3447]/60"
          }`}
        >
          Get Qualified · {complete ? "complete" : "not yet"}
        </span>
        {route === "diego_handoff" ? (
          <span className="inline-flex items-center border border-[#B08D57]/50 bg-[#F5F2EB] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A3447]">
            Diego route
          </span>
        ) : null}
        {route && route !== "diego_handoff" ? (
          <span className="inline-flex items-center border border-[#D8D1C7] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-[#2A3447]/70">
            {ROUTE_LABELS[route]}
          </span>
        ) : null}
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A3447]/55">
        Session booked
        <span className="ml-2 font-normal normal-case tracking-normal text-[#2F3136]/70">
          {booked ? " · reserved" : " · waiting"}
        </span>
      </p>
      {!booked ? (
        <p className="text-xs leading-5 text-[#2F3136]/55">
          Calendar confirmation is a placeholder hook until booking sync is live. Returning with
          <code className="mx-1 text-[10px]">?booked=1</code>
          records it.
        </p>
      ) : null}

      {route === "raphi_calendar" && hub?.calendarUrl ? (
        <a
          href={hub.calendarUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A3447]"
        >
          Open Raphi’s calendar
        </a>
      ) : null}
      {route === "diego_handoff" ? (
        <p className="text-sm leading-6 text-[#2F3136]/80">
          Ready buyers under $5 million go to Diego Micheo at Douglas Elliman. A warm handoff — not a
          lesser lane.
          {hub?.diegoUrl ? (
            <>
              {" "}
              <a href={hub.diegoUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                Elliman profile
              </a>
            </>
          ) : null}
        </p>
      ) : null}
      {route === "nurture" ? (
        <p className="text-sm leading-6 text-[#2F3136]/80">
          Stay with Guidance and this Hub. A live session can wait.
        </p>
      ) : null}
    </div>
  );
}

export function WhereThingsStand({
  hub,
  fromQualify,
}: {
  hub?: HubSnapshot | null;
  fromQualify?: boolean;
}) {
  const checks = publicMilestoneChecks({
    roadmapMilestone: hub?.roadmapMilestone,
    strategySessionHeld: hub?.strategySessionHeld,
  });

  return (
    <div className="border border-[#D8D1C7] bg-[#F5F2EB] px-5 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A3447]/55">
        Where things stand
      </p>
      <div className="mt-4">
        <QualifySubstatus hub={hub} fromQualify={fromQualify} />
      </div>
      <ol className="mt-5 space-y-2">
        {ROADMAP_MILESTONES.map((item, index) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[#2F3136]/85">
            <span className="mt-0.5 text-[11px] text-[#2A3447]">{checks[index] ? "✓" : "○"}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
      <Link
        href="/hub/roadmap"
        className="mt-4 inline-block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A3447]"
      >
        Open checklist
      </Link>
    </div>
  );
}
