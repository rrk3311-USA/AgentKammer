import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { expect, test } from "vitest";

function listVercelFunctions(apiRoot: string): string[] {
  const found: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (name.startsWith("_") || name.startsWith(".")) continue;
      const full = join(dir, name);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (!name.endsWith(".ts") || name.endsWith(".test.ts") || name.endsWith(".d.ts")) continue;
      found.push(relative(apiRoot, full).replaceAll("\\", "/"));
    }
  };
  walk(apiRoot);
  return found.sort();
}

test("agentkammer Hobby deploy stays at 12 serverless functions", () => {
  const fns = listVercelFunctions(join(process.cwd(), "api"));
  expect(fns).toEqual([
    "account/briefs.ts",
    "account/claim.ts",
    "account/hub.ts",
    "account/verify.ts",
    "contact.ts",
    "decision-assistant/conversation.ts",
    "decision-assistant/conversation/[sessionId].ts",
    "decision-guide/chat.ts",
    "hub/snapshot.ts",
    "leads.ts",
    "qualify/index.ts",
    "qualify/session.ts",
  ]);
  expect(fns.length).toBeLessThanOrEqual(12);
});

test("agentkammer-ops overflow stays at 12 or fewer serverless functions", () => {
  const fns = listVercelFunctions(join(process.cwd(), "overflow/api"));
  expect(fns).toEqual([
    "international-strategy.ts",
    "tools/checkout.ts",
    "tools/checkout/confirm.ts",
    "tools/runs.ts",
    "tools/status.ts",
    "tools/wallet.ts",
    "tools/webhook.ts",
  ]);
  expect(fns.length).toBeLessThanOrEqual(12);
});
