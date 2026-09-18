import { handleToolsWebhook } from "../../server/lib/tools/http";
import { adaptTools, type VercelReq, type VercelRes } from "./_adapter";

export const config = {
  api: { bodyParser: false },
};

async function readRawBody(req: VercelReq & { on?: Function }): Promise<Buffer> {
  if (Buffer.isBuffer(req.rawBody)) return req.rawBody;
  if (typeof req.rawBody === "string") return Buffer.from(req.rawBody);
  if (typeof req.body === "string") return Buffer.from(req.body);
  if (Buffer.isBuffer(req.body)) return req.body;
  if (!req.on) return Buffer.from("");
  const chunks: Buffer[] = [];
  await new Promise<void>((resolve, reject) => {
    req.on("data", (chunk: Buffer) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve());
    req.on("error", reject);
  });
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelReq, res: VercelRes) {
  const rawBody = await readRawBody(req);
  const adapted = adaptTools({ ...req, rawBody }, res);
  return handleToolsWebhook(adapted.req, adapted.res);
}
