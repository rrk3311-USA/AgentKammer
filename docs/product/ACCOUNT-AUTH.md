# Account Auth — Email + PIN (no password)

**Status:** Canonical auth model for Decision Hub  
**Philosophy:** Private advisor experience — no dashboard signup ceremony, no Google Auth required.

**Note on framing:** This document names the internal model ("Account Auth") because that's what it is technically — email + PIN, cookies, member records. The auth *mechanism* does not change. What changes is the vocabulary shown to visitors: never present this as software account creation. See the vocabulary table below, and the category/Cases framing in [`docs/brand/AGENT-KAMMER-BRAND.md`](../brand/AGENT-KAMMER-BRAND.md) and [`docs/product/DECISION-CASES.md`](./DECISION-CASES.md).

## Model

```txt
No account required → chat freely → save by email → verify with PIN → resume anywhere
```

### Three recovery layers

| Method | Purpose |
|--------|---------|
| **Cookie** (`ak_visitor_id` / `ak_member_token` httpOnly) | Automatic return on same device |
| **Magic link** (planned) | Open Decision Hub directly from email |
| **Email + PIN** | Recover from another device |

### What the visitor experiences

1. Chat anonymously — invisible visitor profile builds from conversation, pages, signals.
2. When they want to save or retrieve work: enter email.
3. Receive a one-time PIN (and later a magic link).
4. Enter PIN → Decision Map, briefs, and conversation reopen.
5. Optional: “Send me a private copy” → polished **Decision Recap** email with a **Resume My Decision** link — not the raw transcript by default.

### What you see (admin / CRM)

Every profile via visitor ID, conversation history, decision profile, pages viewed, saved recommendations, help-worthiness routing.

## Public-UI vocabulary (do not lead with "account")

The auth mechanism below is unchanged. The words a visitor sees describing it should read like **a private advisor remembers you** — not like signing up for software. Category to own: **Decision Intelligence for Housing** (not "AI Real Estate Advisor," not a chatbot). The mental model is a **Case**, not a "user" — see [`docs/product/DECISION-CASES.md`](./DECISION-CASES.md).

| Retired / avoid as a primary label | Preferred |
|---|---|
| Account | Resume My Decision |
| Dashboard | My Decision / Decision Hub |
| Login / Sign in | Resume My Decision |
| Profile (as a UI label) | My Decision / Decision Map |
| "Create an account" | "Resume My Decision" / "Continue Planning" |
| Login history / session history | Decision History |

`/account` and `/hub` remain the URL paths (avoid breaking links) — only the visible labels change. "Decision Hub" and "Decision Map" are still fine as neutral product nouns; "Account," "Dashboard," "Login," and "Profile" should not be the words a visitor sees first.

## Security rules

- **Never** issue a member session from email alone.
- Member session lives in **httpOnly** cookie (`ak_member_token`). Prefer `credentials: "include"` — do not rely on `localStorage` for auth.
- PIN: 6 digits, short TTL (~10–15 minutes), rate-limited.
- `/api/account/briefs` must not auto-claim by unverified email.
- Copy: after `/api/leads`, say **Saved and submitted** unless visitor email delivery is confirmed.

## Related

- Brand: [`docs/brand/AGENT-KAMMER-BRAND.md`](../brand/AGENT-KAMMER-BRAND.md)
- Decision Cases model: [`docs/product/DECISION-CASES.md`](./DECISION-CASES.md)
- Belonging Assessment: [`docs/product/BELONGING-ASSESSMENT.md`](./BELONGING-ASSESSMENT.md)
- Architecture: [`docs/architecture/SYSTEM-DESIGN.md`](../architecture/SYSTEM-DESIGN.md)

---

*Last updated: July 2026*
