import { handleToolsRunById } from "../../../server/lib/tools/http";
import { adaptTools, type VercelReq, type VercelRes } from "../_adapter";

export default async function handler(req: VercelReq & { query?: { id?: string } }, res: VercelRes) {
  const id = typeof req.query?.id === "string" ? req.query.id : "";
  const adapted = adaptTools(req, res, { id });
  return handleToolsRunById(adapted.req, adapted.res);
}
