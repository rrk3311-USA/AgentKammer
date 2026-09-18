export const LIFE_PLAN_STORE_KEY = "ak.007.life-plan";

export const HORIZONS = ["week", "quarter", "year", "north-star"] as const;
export type Horizon = (typeof HORIZONS)[number];

export const DOMAINS = [
  "judgment",
  "practice",
  "media",
  "license",
  "body",
  "relationships",
  "wealth",
  "operating",
] as const;
export type Domain = (typeof DOMAINS)[number];

export const GOAL_STATUSES = ["next", "active", "waiting", "done"] as const;
export type GoalStatus = (typeof GOAL_STATUSES)[number];

export type LifeGoal = {
  id: string;
  title: string;
  why: string;
  nextAction: string;
  domain: Domain;
  horizon: Horizon;
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
};

export type LifePlanStore = {
  owner: "raphi";
  goals: LifeGoal[];
};

export const HORIZON_LABEL: Record<Horizon, string> = {
  week: "This week",
  quarter: "This quarter",
  year: "This year",
  "north-star": "North star",
};

export const DOMAIN_LABEL: Record<Domain, string> = {
  judgment: "Judgment",
  practice: "Practice",
  media: "Media / Report",
  license: "License",
  body: "Body / Energy",
  relationships: "Relationships",
  wealth: "Wealth",
  operating: "Operating cadence",
};

export const STATUS_LABEL: Record<GoalStatus, string> = {
  next: "Next",
  active: "In motion",
  waiting: "Stillness",
  done: "Closed",
};

export function emptyLifePlan(): LifePlanStore {
  return { owner: "raphi", goals: [] };
}

export function createGoalId(): string {
  return `g_${Math.random().toString(36).slice(2, 10)}`;
}

export function createGoal(
  input: Pick<LifeGoal, "title" | "why" | "nextAction" | "domain" | "horizon">,
  now = new Date().toISOString(),
): LifeGoal {
  return {
    id: createGoalId(),
    title: input.title.trim(),
    why: input.why.trim(),
    nextAction: input.nextAction.trim(),
    domain: input.domain,
    horizon: input.horizon,
    status: "next",
    createdAt: now,
    updatedAt: now,
  };
}

export function isValidGoalDraft(input: { title: string; why: string; nextAction: string }): boolean {
  return Boolean(input.title.trim() && input.why.trim() && input.nextAction.trim());
}

export function cycleStatus(status: GoalStatus): GoalStatus {
  const i = GOAL_STATUSES.indexOf(status);
  return GOAL_STATUSES[(i + 1) % GOAL_STATUSES.length];
}

export function upsertGoal(store: LifePlanStore, goal: LifeGoal): LifePlanStore {
  const idx = store.goals.findIndex((g) => g.id === goal.id);
  const goals = [...store.goals];
  if (idx >= 0) goals[idx] = goal;
  else goals.unshift(goal);
  return { ...store, goals };
}

export function removeGoal(store: LifePlanStore, id: string): LifePlanStore {
  return { ...store, goals: store.goals.filter((g) => g.id !== id) };
}

export function loadLifePlan(): LifePlanStore {
  if (typeof window === "undefined") return emptyLifePlan();
  try {
    const raw = window.localStorage.getItem(LIFE_PLAN_STORE_KEY);
    if (!raw) return emptyLifePlan();
    const parsed = JSON.parse(raw) as LifePlanStore;
    if (!parsed || !Array.isArray(parsed.goals)) return emptyLifePlan();
    return { owner: "raphi", goals: parsed.goals };
  } catch {
    return emptyLifePlan();
  }
}

export function saveLifePlan(store: LifePlanStore) {
  window.localStorage.setItem(LIFE_PLAN_STORE_KEY, JSON.stringify(store));
}
