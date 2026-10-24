import type { IncomingHttpHeaders } from "node:http";
import contact from "./_contact.js";
import leads from "./_leads.js";
import hubSnapshot from "./hub/_snapshot.js";
import qualifyIndex from "./qualify/_index.js";
import qualifySession from "./qualify/_session.js";
import accountClaim from "./account/_claim.js";
import accountVerify from "./account/_verify.js";
import accountHub from "./account/_hub.js";
import accountBriefs from "./account/_briefs.js";
import decisionGuideChat from "./decision-guide/_chat.js";
import conversation from "./decision-assistant/_conversation.js";
import conversationSession from "./decision-assistant/_session.js";
import livabilityVisionStatus from "./livability/_vision-status.js";
import livabilityReadPlan from "./livability/_read-plan.js";
import { livabilityApiIsPublic } from "../shared/preview-draft";

type ApiRequest = {
  method?: string;
  url?: string;
  body?: unknown;
  headers: IncomingHttpHeaders | { cookie?: string; authorization?: string };
  query?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  setHeader?: (name: string, value: string | string[]) => void;
  getHeader?: (name: string) => string | number | string[] | undefined;
  status: (code: number) => { json: (body: unknown) => void };
};

type Handler = (req: ApiRequest, res: ApiResponse) => unknown | Promise<unknown>;

function routePath(req: ApiRequest): string {
  const q = req.query?.route;
  if (Array.isArray(q) && q.length) return q.filter(Boolean).join("/");
  if (typeof q === "string" && q) return q.replace(/^\/+|\/+$/g, "");
  const url = String(req.url || "").split("?")[0];
  return url.replace(/^\/api\/?/, "").replace(/^\/+|\/+$/g, "");
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const path = routePath(req);
  let target: Handler | null = null;

  if (path === "contact") target = contact;
  else if (path === "leads") target = leads;
  else if (path === "hub/snapshot") target = hubSnapshot;
  else if (path === "qualify" || path === "qualify/index") target = qualifyIndex;
  else if (path === "qualify/session") target = qualifySession;
  else if (path === "account/claim") target = accountClaim;
  else if (path === "account/verify") target = accountVerify;
  else if (path === "account/hub") target = accountHub;
  else if (path === "account/briefs") target = accountBriefs;
  else if (path === "decision-guide/chat") target = decisionGuideChat;
  else if (path === "decision-assistant/conversation") target = conversation;
  else if (path.startsWith("decision-assistant/conversation/")) {
    const sessionId = path.slice("decision-assistant/conversation/".length);
    req.query = { ...req.query, sessionId };
    target = conversationSession;
  } else if (path === "livability/vision-status" || path === "livability/read-plan") {
    const headers = req.headers as { host?: string | string[]; Host?: string | string[] };
    const host = headers.host ?? headers.Host;
    if (
      !livabilityApiIsPublic({
        host: Array.isArray(host) ? host[0] : host,
        vercelEnv: process.env.VERCEL_ENV,
      })
    ) {
      return res.status(404).json({ error: "Not found" });
    }
    target = path === "livability/vision-status" ? livabilityVisionStatus : livabilityReadPlan;
  }

  if (!target) {
    return res.status(404).json({ error: "Not found" });
  }
  return target(req, res);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4.5mb",
    },
  },
};
