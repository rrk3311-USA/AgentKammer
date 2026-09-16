import {
  TOOLS_PREVIEW_HEADER,
  TOOLS_PREVIEW_QUERY,
  TOOLS_PREVIEW_STORAGE_KEY,
  type LivabilityResult,
} from "@shared/tools";

export type ToolsStatus = {
  ok: boolean;
  public: boolean;
  previewRequired: boolean;
  unlocked: boolean;
  stripeConfigured: boolean;
  paymentsStubbed: boolean;
  catalog: Array<{
    slug: string;
    name: string;
    eyebrow?: string;
    tagline?: string;
    description?: string;
    href: string;
    status: "live" | "scaffold";
  }>;
};

export type ToolsWalletView = {
  credits: number;
  freeLivabilityUsed: boolean;
  nextRunCredits: number;
  nextRunLabel: string;
  identifiedBy: "visitor" | "member";
  email: string | null;
  persistence: "database" | "cookie" | "memory";
  stripeConfigured: boolean;
  paymentsStubbed: boolean;
  topUps: Array<{ credits: number; usd: number; label: string }>;
};

export type PublicToolRun = {
  id: string;
  toolSlug: string;
  status: string;
  address: string | null;
  listingUrl: string | null;
  imageCount: number;
  chargedCredits: number;
  errorMessage: string | null;
  result: LivabilityResult | null;
  createdAt: string;
  updatedAt: string;
};

function previewActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get(TOOLS_PREVIEW_QUERY) === "1") {
      window.sessionStorage.setItem(TOOLS_PREVIEW_STORAGE_KEY, "1");
      return true;
    }
    return window.sessionStorage.getItem(TOOLS_PREVIEW_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function toolsHeaders(): HeadersInit {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (previewActive()) headers[TOOLS_PREVIEW_HEADER] = "1";
  return headers;
}

export function rememberToolsPreviewFromLocation() {
  previewActive();
}

export async function fetchToolsStatus(): Promise<ToolsStatus> {
  rememberToolsPreviewFromLocation();
  const res = await fetch("/api/tools/status", { credentials: "include", headers: toolsHeaders() });
  const body = await res.json().catch(() => ({}));
  return body as ToolsStatus;
}

export async function fetchToolsWallet(): Promise<{ wallet: ToolsWalletView; ledger: Array<{ id: string; type: string; credits: number; reason: string | null; createdAt: string }> }> {
  const res = await fetch("/api/tools/wallet", { credentials: "include", headers: toolsHeaders() });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Could not load wallet");
  return body;
}

export async function createLivabilityRun(input: {
  address: string;
  listingUrl: string;
  notes?: string;
  images: Array<{ name: string; mime: string; size: number; dataUrl?: string }>;
}): Promise<{ run: PublicToolRun; chargedCredits: number; firstFree: boolean; wallet: ToolsWalletView }> {
  const res = await fetch("/api/tools/runs", {
    method: "POST",
    credentials: "include",
    headers: toolsHeaders(),
    body: JSON.stringify({ tool: "livability", ...input }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(body.error || "Could not run analysis") as Error & { status?: number; credits?: number };
    error.status = res.status;
    error.credits = body.credits;
    throw error;
  }
  return body;
}

export async function checkoutTopUp(pack: number): Promise<{ stub: boolean; url?: string; wallet?: ToolsWalletView; message?: string; credits?: number }> {
  const res = await fetch("/api/tools/checkout", {
    method: "POST",
    credentials: "include",
    headers: toolsHeaders(),
    body: JSON.stringify({ pack }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Checkout failed");
  return body;
}

export async function confirmTopUp(sessionId: string): Promise<{ wallet: ToolsWalletView; credits: number; duplicate?: boolean }> {
  const res = await fetch("/api/tools/checkout/confirm", {
    method: "POST",
    credentials: "include",
    headers: toolsHeaders(),
    body: JSON.stringify({ sessionId }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Could not confirm top-up");
  return body;
}

export async function readImagePayloads(files: File[]) {
  const selected = files.slice(0, 3);
  return Promise.all(
    selected.map(
      (file) =>
        new Promise<{ name: string; mime: string; size: number; dataUrl?: string }>((resolve, reject) => {
          if (file.size > 1_500_000) {
            reject(new Error(`${file.name} is over 1.5 MB.`));
            return;
          }
          if (file.size > 800_000) {
            resolve({ name: file.name, mime: file.type, size: file.size });
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              name: file.name,
              mime: file.type,
              size: file.size,
              dataUrl: typeof reader.result === "string" ? reader.result : undefined,
            });
          };
          reader.onerror = () => reject(new Error("Could not read photo"));
          reader.readAsDataURL(file);
        }),
    ),
  );
}
