import { describe, expect, it } from "vitest";
import handler from "../api/[...route].js";

type Out = { statusCode: number; body: unknown; headers: Record<string, string | string[]> };

function mockRes(): { res: Parameters<typeof handler>[1]; out: Out } {
  const out: Out = { statusCode: 0, body: null, headers: {} };
  const res = {
    setHeader(name: string, value: string | string[]) {
      out.headers[name] = value;
    },
    getHeader(name: string) {
      return out.headers[name];
    },
    status(code: number) {
      out.statusCode = code;
      return {
        json(body: unknown) {
          out.body = body;
        },
      };
    },
  };
  return { res, out };
}

async function hit(method: string, path: string, body?: unknown, headers: Record<string, string> = {}) {
  const { res, out } = mockRes();
  const parts = path.replace(/^\/api\/?/, "").split("/").filter(Boolean);
  await handler(
    {
      method,
      url: path,
      body,
      headers,
      query: { route: parts },
    },
    res,
  );
  return out;
}

describe("Vercel catch-all keeps existing endpoint shapes", () => {
  it("returns the same method and validation shapes as the former one-file functions", async () => {
    const contactGet = await hit("GET", "/api/contact");
    expect(contactGet.statusCode).toBe(405);

    const contactPost = await hit("POST", "/api/contact", {});
    expect(contactPost.statusCode).toBe(400);
    expect((contactPost.body as { error?: string }).error).toBe("Invalid form data");

    const leadsGet = await hit("GET", "/api/leads");
    expect(leadsGet.statusCode).toBe(405);

    const leadsPost = await hit("POST", "/api/leads", {});
    expect(leadsPost.statusCode).toBe(400);

    const snapshot = await hit("GET", "/api/hub/snapshot");
    expect(snapshot.statusCode).toBe(404);

    const qualifyGet = await hit("GET", "/api/qualify");
    expect(qualifyGet.statusCode).toBe(405);

    const qualifyPost = await hit("POST", "/api/qualify", {});
    expect(qualifyPost.statusCode).toBe(400);

    const qualifySession = await hit("POST", "/api/qualify/session", {});
    expect(qualifySession.statusCode).toBe(400);
    expect((qualifySession.body as { error?: string }).error).toMatch(/email/i);

    const claim = await hit("POST", "/api/account/claim", {});
    expect(claim.statusCode).toBe(400);

    const verify = await hit("POST", "/api/account/verify", {});
    expect(verify.statusCode).toBe(400);

    const hub = await hit("GET", "/api/account/hub");
    expect(hub.statusCode).toBe(401);

    const briefs = await hit("POST", "/api/account/briefs", {});
    expect([400, 401]).toContain(briefs.statusCode);

    const chatGet = await hit("GET", "/api/decision-guide/chat");
    expect(chatGet.statusCode).toBe(405);

    const chatPost = await hit("POST", "/api/decision-guide/chat", {});
    expect([400, 503]).toContain(chatPost.statusCode);

    const convo = await hit("POST", "/api/decision-assistant/conversation", { sessionId: "test" });
    expect(convo.statusCode).toBe(200);
    expect((convo.body as { ok?: boolean }).ok).toBe(true);

    const session = await hit("GET", "/api/decision-assistant/conversation/test");
    expect(session.statusCode).toBe(200);
    expect(session.body).toBeNull();
  });

  it("restores Livability boost routes on the same function", async () => {
    const status = await hit("GET", "/api/livability/vision-status");
    expect(status.statusCode).toBe(200);
    expect(status.body).toMatchObject({ cv: true });

    const statusPost = await hit("POST", "/api/livability/vision-status");
    expect(statusPost.statusCode).toBe(405);

    const read = await hit("POST", "/api/livability/read-plan", {});
    expect(read.statusCode).toBe(200);
    expect((read.body as { boost?: boolean }).boost).toBe(false);

    const missing = await hit("GET", "/api/nope");
    expect(missing.statusCode).toBe(404);
  });
});
