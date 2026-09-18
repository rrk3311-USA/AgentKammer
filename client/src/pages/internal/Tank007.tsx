import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { isGateOpen, lockGate, tryUnlock } from "@/lib/007-tank/gate";
import {
  DOMAIN_LABEL,
  DOMAINS,
  Domain,
  HORIZON_LABEL,
  HORIZONS,
  Horizon,
  LifeGoal,
  STATUS_LABEL,
  createGoal,
  cycleStatus,
  isValidGoalDraft,
  loadLifePlan,
  removeGoal,
  saveLifePlan,
  upsertGoal,
} from "@/lib/007-tank/life-plan";
import { MACOS_SCREEN_TIME_HOOK, readNativeScreenTime } from "@/lib/007-tank/macos-screentime";
import {
  HEARTBEAT_MS,
  applyTick,
  emptyDay,
  formatDuration,
  isIdle,
  loadTimeStore,
  localDayKey,
  saveTimeStore,
  setConsent,
} from "@/lib/007-tank/time-tracking";
import { LIFE_PLAN_PERK_POLICY } from "@shared/life-plan-perk";
import "./tank-007.css";

function FrogMark() {
  return (
    <svg className="ak-tank-frog" viewBox="0 0 48 48" aria-hidden>
      <title>Leap motif</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        d="M8 34c6-2 9-10 16-10s10 8 16 10M14 22c2-8 7-12 10-12s8 4 10 12M18 22h12"
      />
      <path fill="none" stroke="currentColor" strokeWidth="1.4" d="M10 36c8-14 20-14 28 0" />
      <circle cx="20" cy="18" r="1.4" fill="currentColor" />
      <circle cx="28" cy="18" r="1.4" fill="currentColor" />
    </svg>
  );
}

function useNyClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
}

export default function Tank007() {
  const [unlocked, setUnlocked] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [gateError, setGateError] = useState<string | null>(null);
  const [consent, setConsentState] = useState(false);
  const [visibleMs, setVisibleMs] = useState(0);
  const [activeMs, setActiveMs] = useState(0);
  const [plan, setPlan] = useState(() => loadLifePlan());
  const [horizonFilter, setHorizonFilter] = useState<Horizon | "all">("all");
  const [draft, setDraft] = useState({
    title: "",
    why: "",
    nextAction: "",
    domain: "judgment" as Domain,
    horizon: "week" as Horizon,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const lastInput = useRef(Date.now());
  const clock = useNyClock();
  const native = useMemo(() => readNativeScreenTime(), []);

  useEffect(() => {
    document.title = "007 Tank | Internal";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
    setUnlocked(isGateOpen());
    const store = loadTimeStore();
    setConsentState(store.consent);
    const day = store.days[localDayKey()] ?? emptyDay();
    setVisibleMs(day.hudVisibleMs);
    setActiveMs(day.laptopActiveMs);
  }, []);

  useEffect(() => {
    if (!unlocked || !consent) return;
    const mark = () => {
      lastInput.current = Date.now();
    };
    const events: Array<keyof WindowEventMap> = ["pointerdown", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((name) => window.addEventListener(name, mark, { passive: true }));
    const id = window.setInterval(() => {
      const store = loadTimeStore();
      if (!store.consent) return;
      const key = localDayKey();
      const day = store.days[key] ?? emptyDay();
      const nextDay = applyTick({
        consent: true,
        visible: document.visibilityState === "visible",
        idle: isIdle(lastInput.current, Date.now()),
        dtMs: HEARTBEAT_MS,
        day,
      });
      store.days[key] = nextDay;
      saveTimeStore(store);
      setVisibleMs(nextDay.hudVisibleMs);
      setActiveMs(nextDay.laptopActiveMs);
    }, HEARTBEAT_MS);
    return () => {
      events.forEach((name) => window.removeEventListener(name, mark));
      window.clearInterval(id);
    };
  }, [unlocked, consent]);

  const unlock = (e: FormEvent) => {
    e.preventDefault();
    if (tryUnlock(phrase)) {
      setUnlocked(true);
      setGateError(null);
    } else {
      setGateError("Phrase rejected.");
    }
  };

  const toggleConsent = () => {
    const next = setConsent(!consent);
    setConsentState(next.consent);
  };

  const persistPlan = (next: typeof plan) => {
    setPlan(next);
    saveLifePlan(next);
  };

  const addGoal = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidGoalDraft(draft)) {
      setFormError("Title, why, and next action are required. Judgment needs a reason.");
      return;
    }
    const goal = createGoal(draft);
    persistPlan(upsertGoal(plan, goal));
    setDraft({ title: "", why: "", nextAction: "", domain: draft.domain, horizon: draft.horizon });
    setFormError(null);
  };

  const goals = plan.goals.filter((g) => (horizonFilter === "all" ? true : g.horizon === horizonFilter));

  if (!unlocked) {
    return (
      <main className="ak-tank flex min-h-screen items-center justify-center px-6">
        <div className="ak-tank-inner ak-tank-panel w-full max-w-md p-8">
          <p className="ak-tank-kicker">Internal · Commander only</p>
          <h1 className="ak-tank-display mt-3 text-4xl text-brand-ivory">007 Tank</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--tank-mute)]">
            Life-management HUD for Raphael Kammer. Not a public Agent Kammer surface. Phrase is in the tank spec.
          </p>
          <form className="mt-6 space-y-4" onSubmit={unlock}>
            <label className="block text-[10px] uppercase tracking-[0.18em] text-[var(--tank-brass)]">
              Clearance phrase
              <input
                className="mt-2"
                type="password"
                autoComplete="off"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                data-testid="tank-gate-input"
              />
            </label>
            {gateError ? <p className="text-sm text-red-300">{gateError}</p> : null}
            <button className="tank-btn w-full" type="submit" data-testid="tank-gate-submit">
              Open the tank
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="ak-tank min-h-screen">
      <div className="ak-tank-inner mx-auto max-w-[1440px] px-5 py-5 lg:px-8">
        <header className="ak-tank-panel flex flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <FrogMark />
            <div>
              <p className="ak-tank-kicker">Classified · Internal HUD</p>
              <h1 className="ak-tank-display text-3xl leading-none text-brand-ivory">007 Tank</h1>
            </div>
          </div>
          <div className="text-right">
            <p className="ak-tank-kicker">Commander Kammer · Manhattan</p>
            <p className="ak-tank-clock mt-1 text-sm text-brand-ivory/80">{clock} NY</p>
          </div>
          <button
            type="button"
            className="tank-ghost"
            onClick={() => {
              lockGate();
              setUnlocked(false);
            }}
          >
            Lock
          </button>
        </header>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="ak-tank-panel p-5" data-testid="tank-time-panel">
            <p className="ak-tank-kicker">Self-tracking</p>
            <h2 className="ak-tank-display mt-2 text-2xl">Time in this tank</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--tank-mute)]">
              Consentful, in-app only. No keylogger, no clipboard, no stealth. Totals are this HUD tab today — not macOS
              Screen Time.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" className="tank-btn" onClick={toggleConsent} data-testid="tank-consent">
                {consent ? "Tracking on" : "Enable tracking"}
              </button>
              <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--tank-mute)]">
                {consent ? "Heartbeat · visibility · idle" : "Paused until you consent"}
              </span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <TimeCard label="HUD visible" value={formatDuration(visibleMs)} note="Tab in the foreground" testId="tank-visible" />
              <TimeCard
                label="Laptop-active (in-app)"
                value={formatDuration(activeMs)}
                note="Visible and input in the last 60s"
                testId="tank-active"
              />
              <TimeCard
                label="macOS Screen Time"
                value="Unwired"
                note={native.reason}
                testId="tank-native"
              />
            </div>
            <p className="mt-4 text-[11px] leading-5 text-[var(--tank-mute)]">
              Native hook id <code>{MACOS_SCREEN_TIME_HOOK.id}</code> awaits a laptop worker. Do not treat HUD numbers as
              OS totals.
            </p>
          </section>

          <section className="ak-tank-panel p-5">
            <p className="ak-tank-kicker">Operating picture</p>
            <h2 className="ak-tank-display mt-2 text-2xl">The Dapper Analyst</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-brand-ivory/80">
              <li>Product is judgment. Fiduciary tone. Not inventory theater.</li>
              <li>Own board: Manhattan condos $5M+. Ready under $5M → Diego Micheo.</li>
              <li>Public promise: Live where you belong. Quiet library exists; it is not the pitch.</li>
              <li>Leap / stillness / amphibious: decide, wait, or work both media and advisory without cartoon frogs.</li>
            </ul>
          </section>
        </div>

        <section className="ak-tank-panel mt-4 p-5" data-testid="tank-life-plan">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="ak-tank-kicker">Life Plan</p>
              <h2 className="ak-tank-display mt-2 text-3xl">Goals for the commander</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--tank-mute)]">
                Personal first. Each goal needs a why (judgment) and a next action. Later this can be a Hub perk after
                Get Qualified — never a public nav item, never dumped on visitors.
              </p>
            </div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--tank-brass)]">
              Perk gate: {LIFE_PLAN_PERK_POLICY.gate}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <FilterChip active={horizonFilter === "all"} onClick={() => setHorizonFilter("all")} label="All horizons" />
            {HORIZONS.map((h) => (
              <FilterChip
                key={h}
                active={horizonFilter === h}
                onClick={() => setHorizonFilter(h)}
                label={HORIZON_LABEL[h]}
              />
            ))}
          </div>

          <form className="mt-6 grid gap-3 lg:grid-cols-2" onSubmit={addGoal} data-testid="tank-life-form">
            <label className="text-[10px] uppercase tracking-[0.16em] text-[var(--tank-brass)]">
              Goal
              <input
                className="mt-2"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                data-testid="life-title"
              />
            </label>
            <label className="text-[10px] uppercase tracking-[0.16em] text-[var(--tank-brass)]">
              Next action
              <input
                className="mt-2"
                value={draft.nextAction}
                onChange={(e) => setDraft({ ...draft, nextAction: e.target.value })}
                data-testid="life-next"
              />
            </label>
            <label className="text-[10px] uppercase tracking-[0.16em] text-[var(--tank-brass)] lg:col-span-2">
              Why this is the right move
              <textarea
                className="mt-2"
                value={draft.why}
                onChange={(e) => setDraft({ ...draft, why: e.target.value })}
                data-testid="life-why"
              />
            </label>
            <label className="text-[10px] uppercase tracking-[0.16em] text-[var(--tank-brass)]">
              Domain
              <select
                className="mt-2"
                value={draft.domain}
                onChange={(e) => setDraft({ ...draft, domain: e.target.value as Domain })}
              >
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {DOMAIN_LABEL[d]}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-[10px] uppercase tracking-[0.16em] text-[var(--tank-brass)]">
              Horizon
              <select
                className="mt-2"
                value={draft.horizon}
                onChange={(e) => setDraft({ ...draft, horizon: e.target.value as Horizon })}
              >
                {HORIZONS.map((h) => (
                  <option key={h} value={h}>
                    {HORIZON_LABEL[h]}
                  </option>
                ))}
              </select>
            </label>
            {formError ? <p className="text-sm text-red-300 lg:col-span-2">{formError}</p> : null}
            <button className="tank-btn lg:col-span-2" type="submit" data-testid="life-add">
              Log goal
            </button>
          </form>

          <ol className="mt-6 space-y-3" data-testid="life-list">
            {goals.length === 0 ? (
              <li className="border border-dashed border-[var(--tank-line)] px-4 py-6 text-sm text-[var(--tank-mute)]">
                No goals on this horizon. Log the next right move — not a building shortlist.
              </li>
            ) : (
              goals.map((goal) => (
                <GoalRow
                  key={goal.id}
                  goal={goal}
                  onCycle={() =>
                    persistPlan(
                      upsertGoal(plan, { ...goal, status: cycleStatus(goal.status), updatedAt: new Date().toISOString() }),
                    )
                  }
                  onRemove={() => persistPlan(removeGoal(plan, goal.id))}
                />
              ))
            )}
          </ol>
        </section>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <section className="ak-tank-panel p-5">
            <p className="ak-tank-kicker">Superpowers</p>
            <h2 className="ak-tank-display mt-2 text-2xl">Leap · stillness · amphibious</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--tank-mute)]">
              Leap when the decision is clear. Stillness when the Report says Wait or Pass. Amphibious: media and
              fiduciary advisory in the same week, without confusing the two. Camouflage: quiet work, no inspector
              costume.
            </p>
          </section>
          <section className="ak-tank-panel p-5">
            <p className="ak-tank-kicker">Later perk</p>
            <h2 className="ak-tank-display mt-2 text-2xl">Hub Life Plan</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--tank-mute)]">
              Same model for qualified members: situation → why → next action. Path: Get Qualified → Decision Hub.
              Planned route {LIFE_PLAN_PERK_POLICY.hubPathWhenLive} is not live and is not in primary nav. Product
              remains judgment — whether to buy, wait, or stay — never a building hero.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function TimeCard({
  label,
  value,
  note,
  testId,
}: {
  label: string;
  value: string;
  note: string;
  testId: string;
}) {
  return (
    <div className="border border-[var(--tank-line)] px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--tank-brass)]">{label}</p>
      <p className="ak-tank-clock ak-tank-display mt-2 text-3xl" data-testid={testId}>
        {value}
      </p>
      <p className="mt-2 text-[11px] leading-5 text-[var(--tank-mute)]">{note}</p>
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" className={active ? "tank-btn" : "tank-ghost"} onClick={onClick}>
      {label}
    </button>
  );
}

function GoalRow({
  goal,
  onCycle,
  onRemove,
}: {
  goal: LifeGoal;
  onCycle: () => void;
  onRemove: () => void;
}) {
  return (
    <li className="border border-[var(--tank-line)] px-4 py-4" data-testid={`life-goal-${goal.id}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-xl text-brand-ivory">{goal.title}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[var(--tank-brass)]">
            {DOMAIN_LABEL[goal.domain]} · {HORIZON_LABEL[goal.horizon]} · {STATUS_LABEL[goal.status]}
          </p>
          <p className="mt-2 text-sm text-brand-ivory/80">{goal.why}</p>
          <p className="mt-1 text-sm text-[var(--tank-mute)]">Next: {goal.nextAction}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="tank-ghost" onClick={onCycle} data-testid="life-cycle">
            Advance status
          </button>
          <button type="button" className="tank-ghost" onClick={onRemove}>
            Drop
          </button>
        </div>
      </div>
    </li>
  );
}
