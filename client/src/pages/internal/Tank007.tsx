import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { APPLE_HEALTH_SLEEP_HOOK, readNativeSleep } from "@/lib/007-tank/apple-health-sleep";
import {
  clearCommanderPin,
  hasCommanderPin,
  isGateOpen,
  lockGate,
  setCommanderPin,
  tankSharePath,
  tryUnlockPin,
} from "@/lib/007-tank/gate";
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
import {
  QUALITY_LABEL,
  SleepQuality,
  addNight,
  createNight,
  formatClock,
  formatSleepDuration,
  durationMs,
  isValidNight,
  loadSleepStore,
  removeNight,
  saveSleepStore,
} from "@/lib/007-tank/sleep";
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
  const [needsSetup, setNeedsSetup] = useState(false);
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [gateError, setGateError] = useState<string | null>(null);
  const [shareNote, setShareNote] = useState<string | null>(null);
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
  const [sleepStore, setSleepStore] = useState(() => loadSleepStore());
  const [sleepDraft, setSleepDraft] = useState({ bedAt: "", wakeAt: "", quality: "" as SleepQuality, note: "" });
  const [sleepError, setSleepError] = useState<string | null>(null);
  const lastInput = useRef(Date.now());
  const clock = useNyClock();
  const native = useMemo(() => readNativeScreenTime(), []);
  const nativeSleep = useMemo(() => readNativeSleep(), []);

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
    setNeedsSetup(!hasCommanderPin());
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

  const unlock = async (e: FormEvent) => {
    e.preventDefault();
    setGateError(null);
    if (needsSetup) {
      const result = await setCommanderPin(pin, pinConfirm);
      if (!result.ok) {
        setGateError(result.error);
        return;
      }
      setUnlocked(true);
      setNeedsSetup(false);
      setPin("");
      setPinConfirm("");
      return;
    }
    if (await tryUnlockPin(pin)) {
      setUnlocked(true);
      setPin("");
    } else {
      setGateError("PIN rejected.");
    }
  };

  const copyShareLink = async () => {
    const url = `${window.location.origin}${tankSharePath()}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareNote("Copied.");
    } catch {
      setShareNote(url);
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

  const persistSleep = (next: typeof sleepStore) => {
    setSleepStore(next);
    saveSleepStore(next);
  };

  const logNight = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidNight(sleepDraft)) {
      setSleepError("Bed and wake are required. Wake must be after bed. This is your log, not Watch sleep.");
      return;
    }
    persistSleep(addNight(sleepStore, createNight(sleepDraft)));
    setSleepDraft({ bedAt: "", wakeAt: "", quality: "", note: "" });
    setSleepError(null);
  };

  const goals = plan.goals.filter((g) => (horizonFilter === "all" ? true : g.horizon === horizonFilter));

  if (!unlocked) {
    return (
      <main className="ak-tank flex min-h-screen items-center justify-center px-6">
        <div className="ak-tank-inner ak-tank-gate w-full">
          <p className="ak-tank-kicker">Personal development · Commander only</p>
          <h1 className="ak-tank-display mt-4 text-5xl text-[var(--tank-ivory)]">007 Tank</h1>
          <p className="ak-tank-ui mt-4 text-sm leading-7 text-[var(--tank-mute)]">
            {needsSetup
              ? "First visit: set a numeric PIN on this device. It stays in this browser. Session unlocks after."
              : "Enter PIN. Session-only until you lock or close the tab."}
          </p>
          <form className="ak-tank-ui mt-8 space-y-5" onSubmit={unlock}>
            <label className="block text-[10px] uppercase tracking-[0.22em] text-[var(--tank-brass)]">
              PIN
              <input
                className="ak-tank-pin mt-2"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
                data-testid="tank-pin-input"
              />
            </label>
            {needsSetup ? (
              <label className="block text-[10px] uppercase tracking-[0.22em] text-[var(--tank-brass)]">
                Confirm PIN
                <input
                  className="ak-tank-pin mt-2"
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  value={pinConfirm}
                  onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  data-testid="tank-pin-confirm"
                />
              </label>
            ) : null}
            {gateError ? <p className="text-sm text-red-300">{gateError}</p> : null}
            <button className="tank-btn" type="submit" data-testid="tank-gate-submit">
              {needsSetup ? "Set PIN and open" : "Open the tank"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="ak-tank min-h-screen">
      <div className="ak-tank-inner mx-auto max-w-[1080px] px-6 py-8 lg:px-10 lg:py-12">
        <div className="ak-tank-tape">
          <span>Personal development</span>
          <span>Not for public · Not a home dashboard</span>
          <span className="ak-tank-clock">{clock} NY</span>
        </div>

        <header className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-start gap-4">
            <FrogMark />
            <div>
              <p className="ak-tank-kicker">Dapper Analyst · Commander Kammer</p>
              <h1 className="ak-tank-display mt-2 text-5xl leading-[0.9] sm:text-6xl">007 Tank</h1>
              <p className="ak-tank-ui mt-4 max-w-xl text-sm leading-7 text-[var(--tank-mute)]">
                A private briefing on the man, not the inventory. Life Plan first. Stillness and attention as logs. Leap
                when the decision is clear.
              </p>
            </div>
          </div>
          <div className="ak-tank-ui flex flex-col items-start gap-1 sm:items-end">
            <button type="button" className="tank-ghost" onClick={copyShareLink} data-testid="tank-copy-link">
              Copy phone link
            </button>
            <button
              type="button"
              className="tank-ghost"
              onClick={() => {
                lockGate();
                setUnlocked(false);
                setNeedsSetup(!hasCommanderPin());
              }}
            >
              Lock
            </button>
            <button
              type="button"
              className="tank-ghost"
              onClick={() => {
                clearCommanderPin();
                setUnlocked(false);
                setNeedsSetup(true);
              }}
            >
              Reset PIN
            </button>
            {shareNote ? <p className="text-[11px] text-[var(--tank-brass)]">{shareNote}</p> : null}
          </div>
        </header>

        <p className="ak-tank-ui mt-8 max-w-3xl border-l border-[var(--tank-brass)] pl-4 text-sm leading-7 text-[var(--tank-ivory)]/85">
          Judgment is the product. Manhattan $5M+ is the board. Under $5M ready → Diego. Fiduciary tone. Quiet work. No
          inspector costume. No IoT chrome.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:gap-16">
          <section className="ak-tank-brief" data-testid="tank-life-plan">
            <p className="ak-tank-kicker">Life Plan</p>
            <h2 className="ak-tank-display mt-3 text-4xl leading-none">The next right move</h2>
            <p className="ak-tank-ui mt-3 max-w-xl text-sm leading-7 text-[var(--tank-mute)]">
              Personal first. Title, why (judgment), next action. Later this can be a Hub perk after Get Qualified —
              never a public nav item. Perk gate: {LIFE_PLAN_PERK_POLICY.gate}.
            </p>

            <div className="ak-tank-ui mt-6 flex flex-wrap gap-x-5 gap-y-2">
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

            <form className="ak-tank-ui mt-8 grid gap-5" onSubmit={addGoal} data-testid="tank-life-form">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--tank-brass)]">
                Goal
                <input
                  className="mt-1"
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  data-testid="life-title"
                />
              </label>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--tank-brass)]">
                Next action
                <input
                  className="mt-1"
                  value={draft.nextAction}
                  onChange={(e) => setDraft({ ...draft, nextAction: e.target.value })}
                  data-testid="life-next"
                />
              </label>
              <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--tank-brass)]">
                Why this is the right move
                <textarea
                  className="mt-2"
                  value={draft.why}
                  onChange={(e) => setDraft({ ...draft, why: e.target.value })}
                  data-testid="life-why"
                />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--tank-brass)]">
                  Domain
                  <select
                    className="mt-1"
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
                <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--tank-brass)]">
                  Horizon
                  <select
                    className="mt-1"
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
              </div>
              {formError ? <p className="text-sm text-red-300">{formError}</p> : null}
              <button className="tank-btn w-fit" type="submit" data-testid="life-add">
                Log goal
              </button>
            </form>

            <ol className="mt-10" data-testid="life-list">
              {goals.length === 0 ? (
                <li className="ak-tank-ui text-sm leading-7 text-[var(--tank-mute)]">
                  No goals on this horizon. Log the next right move — not a building shortlist.
                </li>
              ) : (
                goals.map((goal) => (
                  <GoalRow
                    key={goal.id}
                    goal={goal}
                    onCycle={() =>
                      persistPlan(
                        upsertGoal(plan, {
                          ...goal,
                          status: cycleStatus(goal.status),
                          updatedAt: new Date().toISOString(),
                        }),
                      )
                    }
                    onRemove={() => persistPlan(removeGoal(plan, goal.id))}
                  />
                ))
              )}
            </ol>
          </section>

          <aside className="space-y-12">
            <section className="ak-tank-brief" data-testid="tank-time-panel">
              <p className="ak-tank-kicker">Attention</p>
              <h2 className="ak-tank-display mt-3 text-3xl leading-none">Time in this briefing</h2>
              <p className="ak-tank-ui mt-3 text-sm leading-7 text-[var(--tank-mute)]">
                Consentful, in-app only. This tab today — not macOS Screen Time, not a house sensor.
              </p>
              <div className="ak-tank-ui mt-4">
                <button type="button" className="tank-btn" onClick={toggleConsent} data-testid="tank-consent">
                  {consent ? "Tracking on" : "Enable tracking"}
                </button>
                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[var(--tank-mute)]">
                  {consent ? "Heartbeat · visibility · idle" : "Paused until you consent"}
                </p>
              </div>
              <div className="ak-tank-instrument mt-8">
                <Instrument label="HUD visible" value={formatDuration(visibleMs)} note="Tab in the foreground" testId="tank-visible" />
                <Instrument
                  label="Laptop-active"
                  value={formatDuration(activeMs)}
                  note="Visible and input in the last 60s"
                  testId="tank-active"
                />
                <Instrument label="macOS Screen Time" value="Unwired" note={native.reason} testId="tank-native" />
              </div>
              <p className="ak-tank-ui mt-4 text-[11px] leading-5 text-[var(--tank-mute)]">
                Hook <code>{MACOS_SCREEN_TIME_HOOK.id}</code> awaits a laptop worker.
              </p>
            </section>

            <section className="ak-tank-brief" data-testid="tank-sleep">
              <p className="ak-tank-kicker">Stillness</p>
              <h2 className="ak-tank-display mt-3 text-3xl leading-none">Sleep log</h2>
              <p className="ak-tank-ui mt-3 text-sm leading-7 text-[var(--tank-mute)]">
                You write bed and wake. Optional quality. Not Apple Health. Hook{" "}
                <code>{APPLE_HEALTH_SLEEP_HOOK.id}</code> is unwired.
              </p>
              <p className="ak-tank-ui mt-1 text-[11px] text-[var(--tank-mute)]">{nativeSleep.reason}</p>
              <form className="ak-tank-ui mt-6 grid gap-4" onSubmit={logNight} data-testid="tank-sleep-form">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--tank-brass)]">
                  Bed
                  <input
                    className="mt-1"
                    type="datetime-local"
                    value={sleepDraft.bedAt}
                    onChange={(e) => setSleepDraft({ ...sleepDraft, bedAt: e.target.value })}
                    data-testid="sleep-bed"
                  />
                </label>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--tank-brass)]">
                  Wake
                  <input
                    className="mt-1"
                    type="datetime-local"
                    value={sleepDraft.wakeAt}
                    onChange={(e) => setSleepDraft({ ...sleepDraft, wakeAt: e.target.value })}
                    data-testid="sleep-wake"
                  />
                </label>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--tank-brass)]">
                  Quality (optional)
                  <select
                    className="mt-1"
                    value={sleepDraft.quality}
                    onChange={(e) => setSleepDraft({ ...sleepDraft, quality: e.target.value as SleepQuality })}
                    data-testid="sleep-quality"
                  >
                    <option value="">Skip</option>
                    <option value="thin">{QUALITY_LABEL.thin}</option>
                    <option value="ok">{QUALITY_LABEL.ok}</option>
                    <option value="deep">{QUALITY_LABEL.deep}</option>
                  </select>
                </label>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--tank-brass)]">
                  Note (optional)
                  <input
                    className="mt-1"
                    value={sleepDraft.note}
                    onChange={(e) => setSleepDraft({ ...sleepDraft, note: e.target.value })}
                    data-testid="sleep-note"
                  />
                </label>
                {sleepError ? <p className="text-sm text-red-300">{sleepError}</p> : null}
                <button className="tank-btn w-fit" type="submit" data-testid="sleep-log">
                  Log night
                </button>
              </form>
              <ol className="mt-8" data-testid="sleep-list">
                {sleepStore.nights.length === 0 ? (
                  <li className="ak-tank-ui text-sm leading-7 text-[var(--tank-mute)]">
                    No nights logged. Stillness is a choice you record, not a Watch estimate.
                  </li>
                ) : (
                  sleepStore.nights.map((night) => {
                    const ms = durationMs(night.bedAt, night.wakeAt) ?? 0;
                    return (
                      <li key={night.id} className="ak-tank-goal" data-testid={`sleep-night-${night.id}`}>
                        <p className="ak-tank-clock ak-tank-display text-2xl">{formatSleepDuration(ms)}</p>
                        <p className="ak-tank-ui mt-1 text-sm text-[var(--tank-ivory)]/80">
                          {formatClock(night.bedAt)} → {formatClock(night.wakeAt)}
                          {night.quality ? ` · ${QUALITY_LABEL[night.quality]}` : ""}
                        </p>
                        {night.note ? <p className="ak-tank-ui mt-1 text-sm text-[var(--tank-mute)]">{night.note}</p> : null}
                        <button
                          type="button"
                          className="tank-ghost mt-2"
                          onClick={() => persistSleep(removeNight(sleepStore, night.id))}
                        >
                          Drop
                        </button>
                      </li>
                    );
                  })
                )}
              </ol>
            </section>
          </aside>
        </div>

        <footer className="ak-tank-tape mt-16">
          <span>Leap · stillness · amphibious</span>
          <span>Hub Life Plan later · {LIFE_PLAN_PERK_POLICY.hubPathWhenLive} not live</span>
        </footer>
      </div>
    </main>
  );
}

function Instrument({
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
    <div>
      <p className="ak-tank-kicker">{label}</p>
      <p className="ak-tank-clock ak-tank-display mt-2 text-3xl" data-testid={testId}>
        {value}
      </p>
      <p className="ak-tank-ui mt-2 text-[11px] leading-5 text-[var(--tank-mute)]">{note}</p>
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
    <li className="ak-tank-goal" data-testid={`life-goal-${goal.id}`}>
      <p className="ak-tank-display text-2xl text-[var(--tank-ivory)]">{goal.title}</p>
      <p className="ak-tank-kicker mt-2">
        {DOMAIN_LABEL[goal.domain]} · {HORIZON_LABEL[goal.horizon]} · {STATUS_LABEL[goal.status]}
      </p>
      <p className="ak-tank-ui mt-2 text-sm leading-6 text-[var(--tank-ivory)]/80">{goal.why}</p>
      <p className="ak-tank-ui mt-1 text-sm text-[var(--tank-mute)]">Next: {goal.nextAction}</p>
      <div className="ak-tank-ui mt-3 flex gap-5">
        <button type="button" className="tank-ghost" onClick={onCycle} data-testid="life-cycle">
          Advance status
        </button>
        <button type="button" className="tank-ghost" onClick={onRemove}>
          Drop
        </button>
      </div>
    </li>
  );
}
