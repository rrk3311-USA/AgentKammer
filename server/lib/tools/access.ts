import { TOOLS_PREVIEW_HEADER } from "@shared/tools";

export function toolsArePublic(env: NodeJS.ProcessEnv = process.env): boolean {
  const value = (env.TOOLS_PUBLIC || "").trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

export function toolsAllowStubPayments(env: NodeJS.ProcessEnv = process.env): boolean {
  if (env.TOOLS_ALLOW_STUB_PAYMENTS === "1" || env.TOOLS_ALLOW_STUB_PAYMENTS === "true") return true;
  return (env.NODE_ENV || "development") !== "production";
}

export function stripeSecretKey(env: NodeJS.ProcessEnv = process.env): string {
  return (env.STRIPE_SECRET_KEY || "").trim();
}

export function stripeWebhookSecret(env: NodeJS.ProcessEnv = process.env): string {
  return (env.STRIPE_WEBHOOK_SECRET || "").trim();
}

export function stripePublishableKey(env: NodeJS.ProcessEnv = process.env): string {
  return (env.STRIPE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "").trim();
}

export function stripeIsConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(stripeSecretKey(env));
}

export function paymentsAreStubbed(env: NodeJS.ProcessEnv = process.env): boolean {
  return !stripeIsConfigured(env) && toolsAllowStubPayments(env);
}

export function siteUrl(env: NodeJS.ProcessEnv = process.env): string {
  return (env.SITE_URL || "https://www.agentkammer.com").replace(/\/$/, "");
}

export function hasToolsPreview(input: {
  query?: Record<string, string | string[] | undefined>;
  headers?: Record<string, string | string[] | undefined>;
}): boolean {
  const raw = input.query?.preview;
  const queryValue = Array.isArray(raw) ? raw[0] : raw;
  if (queryValue === "1" || queryValue === "true") return true;

  const header = input.headers?.[TOOLS_PREVIEW_HEADER] ?? input.headers?.["X-Tools-Preview"];
  const headerValue = Array.isArray(header) ? header[0] : header;
  return headerValue === "1" || headerValue === "true";
}

export function canAccessTools(input: {
  query?: Record<string, string | string[] | undefined>;
  headers?: Record<string, string | string[] | undefined>;
  env?: NodeJS.ProcessEnv;
}): boolean {
  return toolsArePublic(input.env) || hasToolsPreview(input);
}

export function toolsStatusPayload(env: NodeJS.ProcessEnv = process.env) {
  return {
    public: toolsArePublic(env),
    previewRequired: !toolsArePublic(env),
    stripeConfigured: stripeIsConfigured(env),
    paymentsStubbed: paymentsAreStubbed(env),
    publishableKeyPresent: Boolean(stripePublishableKey(env)),
  };
}
