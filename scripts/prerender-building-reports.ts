#!/usr/bin/env node
/**
 * Post-build prerender for building report pages.
 *
 * ChatGPT, many answer engines, and lightweight crawlers do not execute JS.
 * Without this, /building-reports/:slug returns the empty SPA shell (#root)
 * with homepage meta — so bots "can't see" the report even though humans can.
 *
 * Writes dist/public/building-reports/{slug}/index.html with:
 * - correct title / description / canonical / OG / JSON-LD
 * - full report text inside #root (crawlable)
 * - the same Vite SPA assets so humans still get the React app
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildingReports, type BuildingReport } from "../client/src/data/building-reports";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distPublic = path.join(root, "dist", "public");
const SITE = "https://www.agentkammer.com";

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphs(items: string[]) {
  return items.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n");
}

function list(items: string[]) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function extractAssetTags(indexHtml: string) {
  const scripts = [...indexHtml.matchAll(/<script\b[^>]*src="[^"]+"[^>]*><\/script>/g)].map((m) => m[0]);
  const styles = [...indexHtml.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map((m) => m[0]);
  return { scripts, styles };
}

function renderReportArticle(report: BuildingReport) {
  const sections: string[] = [];

  sections.push(`<h1>${escapeHtml(report.buildingName)} Building Report</h1>`);
  sections.push(
    `<p><strong>${escapeHtml(report.location)}</strong> · ${escapeHtml(report.publishedAt)} · ${report.readMinutes} min read</p>`,
  );
  sections.push(`<p>${escapeHtml(report.series)}</p>`);

  sections.push("<h2>Building profile</h2>");
  sections.push(
    list([
      `Neighborhood: ${report.buildingProfile.neighborhood}`,
      `Type: ${report.buildingProfile.buildingType}`,
      `Design: ${report.buildingProfile.design}`,
      `Positioning: ${report.buildingProfile.positioning}`,
    ]),
  );

  sections.push("<h2>Executive summary</h2>");
  sections.push(paragraphs(report.executiveSummary));

  sections.push("<h2>Observation</h2>");
  sections.push(paragraphs(report.observation));

  sections.push("<h2>Who it fits</h2>");
  sections.push("<h3>Likely residents</h3>");
  sections.push(list(report.residentProfile.likely));
  sections.push("<h3>Less common</h3>");
  sections.push(list(report.residentProfile.lessCommon));

  sections.push("<h2>Differentiators</h2>");
  for (const item of report.differentiators) {
    sections.push(`<h3>${escapeHtml(item.title)}</h3>`);
    sections.push(`<p>${escapeHtml(item.body)}</p>`);
  }

  sections.push("<h2>Strengths</h2>");
  sections.push(list(report.strengths));

  sections.push("<h2>Tradeoffs</h2>");
  if (report.tradeoffsNote) sections.push(`<p>${escapeHtml(report.tradeoffsNote)}</p>`);
  sections.push(list(report.tradeoffs));

  sections.push("<h2>Neighborhood context</h2>");
  sections.push(`<p>${escapeHtml(report.neighborhoodContext.intro)}</p>`);
  sections.push(list(report.neighborhoodContext.combines));
  sections.push(`<p>${escapeHtml(report.neighborhoodContext.closing)}</p>`);

  if (report.comparables?.length) {
    sections.push(`<h2>Comparables</h2>`);
    if (report.comparablesIntro) sections.push(`<p>${escapeHtml(report.comparablesIntro)}</p>`);
    for (const c of report.comparables) {
      sections.push(`<h3>${escapeHtml(c.name)}</h3>`);
      sections.push(list(c.lines));
    }
  }

  if (report.fit?.length) {
    sections.push("<h2>Fit</h2>");
    for (const tier of report.fit) {
      sections.push(`<h3>${escapeHtml(tier.label)}</h3>`);
      sections.push(list(tier.items));
    }
  }

  if (report.commute) {
    sections.push("<h2>Commute</h2>");
    sections.push(list(report.commute.destinations));
    sections.push(`<p>${escapeHtml(report.commute.closing)}</p>`);
  }

  sections.push("<h2>Agent Kammer perspective</h2>");
  sections.push(paragraphs(report.agentKammerPerspective));

  sections.push("<h2>Bottom line</h2>");
  sections.push(paragraphs(report.bottomLine));

  sections.push(
    `<p><a href="${SITE}/building-reports">More building reports</a> · <a href="${SITE}/contact">Request a private review</a></p>`,
  );

  return sections.join("\n");
}

function buildPage(report: BuildingReport, assetTags: { scripts: string[]; styles: string[] }) {
  const url = `${SITE}/building-reports/${report.slug}`;
  const title = `${report.buildingName} Building Report | Agent Kammer`;
  const description =
    report.executiveSummary[0] ||
    `${report.buildingName} in ${report.location} — Agent Kammer building intelligence.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${report.buildingName} Building Report`,
    description,
    datePublished: report.publishedAt,
    author: { "@type": "Organization", name: "Agent Kammer" },
    publisher: { "@type": "Organization", name: "Agent Kammer", url: SITE },
    mainEntityOfPage: url,
    about: {
      "@type": "Residence",
      name: report.buildingName,
      address: {
        "@type": "PostalAddress",
        addressLocality: report.buildingProfile.neighborhood,
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
  };

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:locale" content="en_US" />
    <meta name="geo.region" content="US-NY" />
    <meta name="geo.placename" content="Manhattan, New York" />
    <link rel="alternate" hreflang="en" href="${url}" />
    <link rel="alternate" hreflang="x-default" href="${url}" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    ${assetTags.styles.join("\n    ")}
  </head>
  <body>
    <div id="root">
      <article class="ak-prerender" data-prerender="building-report" style="max-width:42rem;margin:2rem auto;padding:0 1.25rem;font-family:Georgia,serif;line-height:1.6;color:#1a1f2c">
        ${renderReportArticle(report)}
      </article>
    </div>
    ${assetTags.scripts.join("\n    ")}
  </body>
</html>
`;
}

async function main() {
  const indexPath = path.join(distPublic, "index.html");
  let indexHtml;
  try {
    indexHtml = await readFile(indexPath, "utf8");
  } catch {
    console.error("prerender-building-reports: dist/public/index.html missing — run vite build first");
    process.exit(1);
  }

  const assetTags = extractAssetTags(indexHtml);
  if (!assetTags.scripts.length) {
    console.warn("prerender-building-reports: no script tags found in index.html");
  }

  for (const report of buildingReports) {
    const dir = path.join(distPublic, "building-reports", report.slug);
    await mkdir(dir, { recursive: true });
    const html = buildPage(report, assetTags);
    await writeFile(path.join(dir, "index.html"), html, "utf8");
    console.log(`prerendered /building-reports/${report.slug}`);
  }

  console.log(`prerender-building-reports: ${buildingReports.length} pages`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
