export const DECISION_ASSISTANT_OPEN_EVENT = "ak:open-decision-assistant";
export const DECISION_ASSISTANT_NUDGE_EVENT = "ak:advisor-nudge";
export const DECISION_ASSISTANT_NUDGE_CLEAR_EVENT = "ak:advisor-nudge-clear";

export function openDecisionAssistant() {
  window.dispatchEvent(new CustomEvent(DECISION_ASSISTANT_OPEN_EVENT));
}

export function nudgeDecisionAssistant(text: string) {
  window.dispatchEvent(new CustomEvent(DECISION_ASSISTANT_NUDGE_EVENT, { detail: { text } }));
}

export function clearDecisionAssistantNudge() {
  window.dispatchEvent(new CustomEvent(DECISION_ASSISTANT_NUDGE_CLEAR_EVENT));
}
