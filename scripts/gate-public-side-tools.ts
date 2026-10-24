#!/usr/bin/env node
/**
 * When public side tools are off, overwrite the built Livability HTML with a
 * noindex homepage stub and drop the Wheel of Life footer link. Source stays.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { publicSideToolsEnabled } from "../shared/public-side-tools";

export const PUBLIC_SIDE_TOOLS_OFFLINE_STUB = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Agent Kammer</title>
<meta name="robots" content="noindex, nofollow, noarchive">
<meta http-equiv="refresh" content="0;url=/">
<link rel="canonical" href="/">
</head>
<body>
<p><a href="/">Continue to Agent Kammer</a></p>
<script>location.replace("/");</script>
</body>
</html>
`;

const LIVABILITY_HREF = /<a href="\/tools\/livability\/">Livability<\/a>\s*/g;
const ROBOTS_COMMUNICATION = "Disallow: /tools/communication-map";

export function gatePublicSideTools(
  root = path.join(path.dirname(fileURLToPath(import.meta.url)), ".."),
  enabled = publicSideToolsEnabled(),
) {
  if (enabled) return { gated: false as const, files: [] as string[] };

  const dist = path.join(root, "dist/public");
  const files: string[] = [];

  const stubTargets = [
    path.join(dist, "tools/livability/index.html"),
    path.join(dist, "tools/livability/harness.html"),
  ];
  for (const file of stubTargets) {
    if (!existsSync(file)) continue;
    writeFileSync(file, PUBLIC_SIDE_TOOLS_OFFLINE_STUB);
    files.push(file);
  }

  const wheel = path.join(dist, "tools/wheel-of-life/index.html");
  if (existsSync(wheel)) {
    const next = readFileSync(wheel, "utf8").replace(LIVABILITY_HREF, "");
    writeFileSync(wheel, next);
    files.push(wheel);
  }

  const robots = path.join(dist, "robots.txt");
  if (existsSync(robots)) {
    const text = readFileSync(robots, "utf8");
    if (!text.includes(ROBOTS_COMMUNICATION)) {
      writeFileSync(robots, text.replace("Disallow: /tools/livability\n", `Disallow: /tools/livability\n${ROBOTS_COMMUNICATION}\n`));
      files.push(robots);
    }
  }

  return { gated: true as const, files };
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const result = gatePublicSideTools();
  if (!result.gated) {
    console.log("Public side tools are on; leaving built Livability and Decision Guide in place.");
  } else {
    console.log(`Public side tools are off; gated ${result.files.length} built files.`);
  }
}
