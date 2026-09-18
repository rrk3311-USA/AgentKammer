import type { Express, Request, Response } from "express";
import {
  handleToolsCheckout,
  handleToolsCheckoutConfirm,
  handleToolsCreateRun,
  handleToolsRunById,
  handleToolsRunsList,
  handleToolsStatus,
  handleToolsWallet,
  handleToolsWebhook,
  toolsNoindexHeaders,
  type ToolsReq,
  type ToolsRes,
} from "./http";

function adapt(req: Request, res: Response): { req: ToolsReq; res: ToolsRes } {
  return {
    req: {
      method: req.method,
      headers: req.headers as ToolsReq["headers"],
      query: req.query as ToolsReq["query"],
      body: req.body,
      rawBody: req.rawBody as Buffer | string | undefined,
      params: req.params,
    },
    res,
  };
}

export function registerToolsRoutes(app: Express) {
  app.use((req, res, next) => {
    if (toolsNoindexHeaders(req.path)) {
      res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    }
    next();
  });

  app.get("/api/tools/status", (req, res) => {
    const adapted = adapt(req, res);
    return handleToolsStatus(adapted.req, adapted.res);
  });
  app.get("/api/tools/wallet", (req, res) => {
    const adapted = adapt(req, res);
    return handleToolsWallet(adapted.req, adapted.res);
  });
  app.get("/api/tools/runs", (req, res) => {
    const adapted = adapt(req, res);
    return handleToolsRunsList(adapted.req, adapted.res);
  });
  app.post("/api/tools/runs", (req, res) => {
    const adapted = adapt(req, res);
    return handleToolsCreateRun(adapted.req, adapted.res);
  });
  app.get("/api/tools/runs/:id", (req, res) => {
    const adapted = adapt(req, res);
    return handleToolsRunById(adapted.req, adapted.res);
  });
  app.post("/api/tools/checkout", (req, res) => {
    const adapted = adapt(req, res);
    return handleToolsCheckout(adapted.req, adapted.res);
  });
  app.post("/api/tools/checkout/confirm", (req, res) => {
    const adapted = adapt(req, res);
    return handleToolsCheckoutConfirm(adapted.req, adapted.res);
  });
  app.post("/api/tools/webhook", (req, res) => {
    const adapted = adapt(req, res);
    return handleToolsWebhook(adapted.req, adapted.res);
  });
}
