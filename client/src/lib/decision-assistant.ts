export const DECISION_ASSISTANT_OPEN_EVENT = "ak:open-decision-assistant";

export function openDecisionAssistant() {
  window.dispatchEvent(new CustomEvent(DECISION_ASSISTANT_OPEN_EVENT));
}
