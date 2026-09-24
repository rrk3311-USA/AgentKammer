#!/usr/bin/env node
/**
 * Writes client/public/guides/guides-index.json from the public guide catalog.
 * Keep this in prebuild so static field-guide pages stay in sync.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { publicGuides } from "../client/src/data/guides";

export type GuideIndexEntry = {
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
};

export function buildGuidesIndex(guides = publicGuides): GuideIndexEntry[] {
  return guides
    .filter((guide) => guide.audience === "public")
    .map((guide) => ({
      title: guide.title,
      url: guide.href,
      description: guide.description,
      category: guide.category,
      tags: [...guide.tags],
    }));
}

export function writeGuidesIndex(
  outPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "client",
    "public",
    "guides",
    "guides-index.json",
  ),
) {
  const guides = buildGuidesIndex();
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify({ guides }, null, 2)}\n`);
  return { outPath, count: guides.length };
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const { outPath, count } = writeGuidesIndex();
  console.log(`Wrote ${count} public guides to ${outPath}`);
}
