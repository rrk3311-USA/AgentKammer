/** Print report markup. Letter pages using LOI spacing, Livability brand only. */

import { CONSIDERATIONS, LIVABILITY_AID_LINE, SEVERITY_LABELS } from "./diligence.js";

const SEV_ORDER = ["dealbreaker", "tax", "nit"];

export function shortNote(note) {
  const text = String(note || "")
    .replace(/\u2014/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  const first = text.split(/(?<=\.)\s+/)[0] || text;
  if (first.length <= 110) return first;
  return `${first.slice(0, 107).replace(/\s+\S*$/, "")}.`;
}

export function flaggedBySeverity(breakdown) {
  const flagged = (breakdown || []).filter((row) => row.passed === false || row.caution);
  return SEV_ORDER.map((severity) => ({
    severity,
    label: SEVERITY_LABELS[severity]?.label || severity,
    items: flagged.filter((row) => (row.severity || "tax") === severity),
  })).filter((group) => group.items.length);
}

function escape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pageChrome(page, total, inner) {
  return `<article class="pr-page" data-page="${page}" aria-label="Report page ${page} of ${total}">
    <header class="pr-band pr-band-top">
      <img class="pr-liv" src="/tools/livability/icon-512.png" alt="" width="40" height="40">
      <span class="pr-word">Livability</span>
      <div class="pr-tags"><span class="pr-tag">Planning aid</span><span class="pr-tag">Not an inspection</span></div>
    </header>
    <div class="pr-brass pr-brass-top" aria-hidden="true"></div>
    <div class="pr-body">${inner}</div>
    <p class="pr-disclaimer">${escape(LIVABILITY_AID_LINE)}</p>
    <div class="pr-brass pr-brass-bot" aria-hidden="true"></div>
    <footer class="pr-band pr-band-bot">
      <span class="pr-word sm">Livability</span>
      <span class="pr-folio">${String(page).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
    </footer>
  </article>`;
}

function glanceMarkup(result) {
  const dims = [
    ["Circulation", result.dimensions?.circulation],
    ["Quiet", result.dimensions?.quiet],
    ["Storage", result.dimensions?.storage],
    ["Household fit", result.dimensions?.fit],
    ["Light and air", result.dimensions?.light],
    ["Comfort", result.dimensions?.comfort],
  ].filter((row) => row[1] != null);
  return `<section class="pr-glance" aria-label="Breakdown">
    <div class="pr-glance-h">Breakdown</div>
    <div class="pr-glance-cols">${dims
      .map(([label, value]) => `<div><div class="k">${escape(label)}</div><div class="v">${escape(value)}</div></div>`)
      .join("")}</div>
  </section>`;
}

function flagsMarkup(groups) {
  if (!groups.length) {
    return `<section class="pr-block"><div class="pr-sec">Flagged checks</div><p class="pr-empty">No flagged checks on this run.</p></section>`;
  }
  return `<section class="pr-block"><div class="pr-sec">Flagged checks</div>${groups
    .map(
      (group) => `<div class="pr-flag-group">
        <h3>${escape(group.label)}</h3>
        <ul>${group.items
          .map((item) => `<li><strong>${escape(item.label)}</strong><span>${escape(shortNote(item.note))}</span></li>`)
          .join("")}</ul>
      </div>`,
    )
    .join("")}</section>`;
}

function considerMarkup() {
  return `<section class="pr-block"><div class="pr-sec">Considerations to confirm</div>
    <div class="pr-consider">${CONSIDERATIONS.map(
      (group) => `<div class="pr-consider-group">
        <h3>${escape(group.label)}</h3>
        ${group.items
          .map((item) => {
            const extra = [item.linkLabel, item.ask].filter(Boolean).join(" · ");
            return `<label class="pr-check"><span class="pr-box" aria-hidden="true"></span><span><b>${escape(item.label)}</b>${
              extra ? `<i>${escape(extra)}</i>` : ""
            }</span></label>`;
          })
          .join("")}
      </div>`,
    ).join("")}</div>
  </section>`;
}

export function buildPrintReport({ plan, result, profile, horizon, heatSvg }) {
  if (!result) return "";
  const address = plan.address || plan.name || "Untitled plan";
  const sampleMark = plan.sampleMark || (plan.sampleReport ? "Sample report, example data" : "");
  const house = Number(profile?.householdSize) || 1;
  const years = String(horizon || "10");
  const demoName = /willow house/i.test(plan.name || "") ? "Willow house demo" : plan.name && plan.name !== address ? plan.name : "Floor plan";
  const flags = flaggedBySeverity(result.breakdown);
  const pages = [];

  pages.push(`<p class="pr-eyebrow">Livability report</p>
    <h1 class="pr-title">${escape(address)}</h1>
    ${sampleMark ? `<p class="pr-sample">${escape(sampleMark)}</p>` : ""}
    <p class="pr-meta">${escape(demoName)} · Household of ${house} · ${escape(years)} years</p>
    <div class="pr-score"><strong>${escape(result.score)}</strong><span>Livability</span></div>
    ${glanceMarkup(result)}
    <section class="pr-heat"><div class="pr-sec">Heat map</div>${heatSvg || ""}</section>`);

  const flagHtml = flagsMarkup(flags);
  const considerHtml = considerMarkup();
  const flagCount = flags.reduce((sum, group) => sum + group.items.length, 0);
  if (flagCount > 12) {
    pages.push(flagHtml);
    pages.push(considerHtml);
  } else {
    pages.push(`${flagHtml}${considerHtml}`);
  }

  const total = pages.length;
  return pages.map((inner, index) => pageChrome(index + 1, total, inner)).join("");
}
