# Advisor OS — Website + Attio

## Principle

The Agent Kammer website is the **client-facing decision guide**.  
Attio is the **internal client chart**. Customers never see Attio.

## Phase status

### Phase 1 (shipped in this build)

1. Client profile database tables (`visitors`, `client_profiles`, chat, events, goals, sync jobs/logs, …)
2. Anonymous visitor identity (`ak_visitor_id` cookie)
3. Structured chat → profile updates via Decision Guide
4. Lead scoring engine (internal only)
5. Attio person + housing record upsert (queued, non-blocking)
6. Request-a-call / score / timeline task creation
7. Internal admin at `/admin/clients`
8. Sync logs + retry queue

### Phase 2 (foundations)

- Lightweight hub routes: `/hub`, `/hub/roadmap`, `/hub/conversations`, `/hub/saved`, `/hub/reviews`, `/hub/profile`
- Account claim continues via existing email + PIN (`/account`)
- Advisor reviews API + hub display of client-visible summaries
- Returning visitor recognition via cookie + profile merge on email

### Phase 3 (planned)

- Professional team roles beyond admin basic auth
- Secure document storage (not Attio)
- Calendar, paid membership, automated review reminders

## Key code

| Area | Path |
|------|------|
| Types | `shared/client-profile.ts` |
| Schema | `shared/schema.ts` (Advisor OS tables) |
| Scoring | `server/lib/advisory/lead-scoring.ts` |
| Attio service | `server/lib/advisory/attio-service.ts` |
| Field mapping | `server/lib/advisory/attio-mapping.ts` |
| Sync queue | `server/lib/advisory/sync-queue.ts` |
| Profile orchestration | `server/lib/advisory/profile-service.ts` |
| Repository | `server/lib/advisory/repository.ts` |
| Admin API | `server/lib/advisory/admin-routes.ts` |
| Decision Guide hook | `server/routes.ts` → `POST /api/decision-guide/chat` |

## API surface

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/decision-guide/chat` | Chat + profile enrich + queue Attio |
| GET | `/api/hub/snapshot` | Customer hub (no lead score) |
| GET | `/api/admin/clients` | List / filter clients |
| GET | `/api/admin/clients/:id` | Detail + conversations + sync logs |
| POST | `/api/admin/clients/:id/note` | Internal note → Attio note |
| POST | `/api/admin/clients/:id/assign` | Assign advisor |
| POST | `/api/admin/clients/:id/lifecycle` | Stage override |
| POST | `/api/admin/clients/:id/resync` | Force Attio sync |
| POST | `/api/admin/clients/:id/task` | Create Attio task |
| POST | `/api/admin/clients/:id/reviews` | Quarterly review |
| POST | `/api/admin/attio/process-queue` | Drain retry queue |

## Lead score thresholds (internal)

| Score | Stage |
|------:|-------|
| 0–24 | anonymous |
| 25–44 | engaged |
| 45–64 | profiled |
| 65–79 | qualified |
| 80+ | call_ready |

Never expose score in customer UI.

## Local vs production storage

If `DATABASE_URL` is unset, advisory tables use an in-memory repository (same pattern as other MemStorage paths). Set Neon `DATABASE_URL` and run `npm run db:push` for durable profiles and sync jobs.
