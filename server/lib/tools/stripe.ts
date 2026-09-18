import { isTopUpPack, type TopUpPack } from "@shared/tools";
import { paymentsAreStubbed, siteUrl, stripeSecretKey, stripeWebhookSecret } from "./access";

export type StripeCheckoutResult =
  | { stub: true; credits: TopUpPack; amountCents: number }
  | { stub: false; url: string; sessionId: string; credits: TopUpPack; amountCents: number };

function priceEnv(pack: TopUpPack): string {
  return (process.env[`STRIPE_PRICE_${pack}`] || "").trim();
}

async function getStripe() {
  const secret = stripeSecretKey();
  if (!secret) return null;
  const { default: Stripe } = await import("stripe");
  return new Stripe(secret);
}

export async function createToolsCheckoutSession(input: {
  pack: unknown;
  walletId: string;
  visitorId: string;
  email?: string | null;
}): Promise<StripeCheckoutResult> {
  const pack = Number(input.pack);
  if (!isTopUpPack(pack)) {
    throw new Error("Choose a top-up of $5, $10, $15, or $25.");
  }
  const amountCents = pack * 100;

  if (!stripeSecretKey()) {
    if (!paymentsAreStubbed()) {
      throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY to accept top-ups.");
    }
    return { stub: true, credits: pack, amountCents };
  }

  const stripe = await getStripe();
  if (!stripe) {
    throw new Error("Stripe is not configured.");
  }

  const success = `${siteUrl()}/tools/livability?topup=success&session_id={CHECKOUT_SESSION_ID}`;
  const cancel = `${siteUrl()}/tools/livability?topup=cancel`;
  const priceId = priceEnv(pack);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: input.email || undefined,
    success_url: success,
    cancel_url: cancel,
    metadata: {
      walletId: input.walletId,
      visitorId: input.visitorId,
      credits: String(pack),
      product: "agentkammer_tools",
    },
    line_items: priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: amountCents,
              product_data: {
                name: `Agent Kammer Tools — ${pack} credits`,
                description: `${pack} analysis credits ($1 per run).`,
              },
            },
          },
        ],
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  return {
    stub: false,
    url: session.url,
    sessionId: session.id,
    credits: pack,
    amountCents,
  };
}

export async function retrievePaidCheckoutSession(sessionId: string): Promise<{
  sessionId: string;
  paymentIntentId: string | null;
  credits: number;
  amountCents: number;
  walletId: string | null;
  paid: boolean;
} | null> {
  const stripe = await getStripe();
  if (!stripe) return null;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const credits = Number(session.metadata?.credits || 0);
  return {
    sessionId: session.id,
    paymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || null,
    credits,
    amountCents: session.amount_total || credits * 100,
    walletId: session.metadata?.walletId || null,
    paid: session.payment_status === "paid" || session.status === "complete",
  };
}

export async function constructStripeEvent(rawBody: Buffer | string, signature: string) {
  const secret = stripeWebhookSecret();
  const stripe = await getStripe();
  if (!stripe || !secret) {
    throw new Error("Stripe webhook is not configured.");
  }
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}
