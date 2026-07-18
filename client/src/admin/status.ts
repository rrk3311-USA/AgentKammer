/**
 * Canonical CRM stage labels — identical in website DB mapping, Attio lists, and admin.
 * Do not invent parallel labels like "Exploring" for internal CRM views.
 */

import {
  ATTIO_PIPELINE_STAGES,
  LIFECYCLE_TO_ATTIO,
  type AttioPipelineStage,
  type LifecycleStage,
} from "@shared/client-profile";

export const CRM_STAGES = ATTIO_PIPELINE_STAGES;
export type CrmStage = AttioPipelineStage;

/** Display label for admin / Attio — always an Attio pipeline stage. */
export function toCrmStage(stage?: string | null): CrmStage {
  if (!stage) return "New Signal";
  if ((ATTIO_PIPELINE_STAGES as readonly string[]).includes(stage)) {
    return stage as CrmStage;
  }
  if (stage in LIFECYCLE_TO_ATTIO) {
    return LIFECYCLE_TO_ATTIO[stage as LifecycleStage];
  }
  return "New Signal";
}

/** @deprecated Use toCrmStage — kept so existing imports keep compiling during rename. */
export function toAdvisoryStatus(stage?: string | null): CrmStage {
  return toCrmStage(stage);
}

/** Map a CRM label back to website lifecycle for API filters. */
export function crmStageToLifecycle(status: string): LifecycleStage | undefined {
  const entries = Object.entries(LIFECYCLE_TO_ATTIO) as Array<[LifecycleStage, AttioPipelineStage]>;
  const hit = entries.find(([, label]) => label === status);
  return hit?.[0];
}

/** @deprecated Use crmStageToLifecycle */
export function advisoryStatusToLifecycle(status: string): string | undefined {
  return crmStageToLifecycle(status);
}

export const LIFECYCLE_FILTER_OPTIONS: Array<{ value: LifecycleStage; label: CrmStage }> = [
  { value: "anonymous", label: "New Signal" },
  { value: "engaged", label: "Engaged" },
  { value: "profiled", label: "Profiled" },
  { value: "qualified", label: "Qualified" },
  { value: "call_ready", label: "Call Ready" },
  { value: "long_term_nurture", label: "Long-Term Nurture" },
  { value: "advisory_client", label: "Advisory Client" },
  { value: "transaction_ready", label: "Transaction Ready" },
  { value: "active_client", label: "Transaction Ready" },
  { value: "closed", label: "Advisory Client" },
  { value: "inactive", label: "Inactive" },
];

export function formatRelativeActivity(iso?: string | null): string {
  if (!iso) return "—";
  try {
    const then = new Date(iso).getTime();
    const diff = Date.now() - then;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 14) return `${days}d ago`;
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return "—";
  }
}
