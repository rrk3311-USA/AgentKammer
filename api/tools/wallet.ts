import { handleToolsWallet } from "../../server/lib/tools/http";
import { adaptTools, type VercelReq, type VercelRes } from "./_adapter";

export default async function handler(req: VercelReq, res: VercelRes) {
  const adapted = adaptTools(req, res);
  return handleToolsWallet(adapted.req, adapted.res);
}
