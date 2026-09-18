import type { ToolsReq, ToolsRes } from "../../server/lib/tools/http";

export type VercelReq = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  body?: unknown;
  rawBody?: Buffer | string;
};

export type VercelRes = {
  setHeader: (name: string, value: string | string[]) => void;
  getHeader: (name: string) => string | number | string[] | undefined;
  status: (code: number) => { json: (body: unknown) => void };
};

export function adaptTools(req: VercelReq, res: VercelRes, params?: Record<string, string>): { req: ToolsReq; res: ToolsRes } {
  return {
    req: {
      method: req.method,
      headers: req.headers,
      query: req.query,
      body: req.body,
      rawBody: req.rawBody,
      params,
    },
    res,
  };
}
