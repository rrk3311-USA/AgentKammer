export const DECISION_ASSISTANT_OPEN_EVENT = "ak:open-decision-assistant";

export function openDecisionAssistant() {
  const el = document.getElementById("decision-assistant");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  window.dispatchEvent(new CustomEvent(DECISION_ASSISTANT_OPEN_EVENT));
}
