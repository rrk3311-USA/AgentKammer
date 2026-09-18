import { handleToolsStatus } from "../../../server/lib/tools/http";
import { adaptTools, type VercelReq, type VercelRes } from "./_adapter";

export default async function handler(req: VercelReq, res: VercelRes) {
  const adapted = adaptTools(req, res);
  return handleToolsStatus(adapted.req, adapted.res);
}
