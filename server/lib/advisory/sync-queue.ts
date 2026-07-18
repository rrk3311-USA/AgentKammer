import { LIFECYCLE_TO_ATTIO, type AttioSyncAction, type ClientProfile } from "@shared/client-profile";
import { AttioService, isAttioConfigured } from "./attio-service";
import {
  enqueueAttioSyncJob,
  getClientProfileById,
  listPendingAttioJobs,
  rowToClientProfile,
  updateAttioSyncJob,
  updateClientProfile,
  writeAttioSyncLog,
} from "./repository";

function backoffMs(attemptCount: number): number {
  return Math.min(1000 * 60 * 60, 1000 * 2 ** Math.min(attemptCount, 8));
}

export async function queueAttioSync(input: {
  clientProfileId: string;
  action: AttioSyncAction;
  payload?: unknown;
  dedupeKey?: string;
}): Promise<void> {
  if (!isAttioConfigured()) {
    await writeAttioSyncLog({
      clientProfileId: input.clientProfileId,
      action: input.action,
      level: "info",
      message: "Attio sync skipped (not configured)",
    });
    return;
  }

  await enqueueAttioSyncJob({
    clientProfileId: input.clientProfileId,
    action: input.action,
    payload: input.payload ?? {},
    dedupeKey: input.dedupeKey,
  });

  // Fire-and-forget processing — never awaited by chat handlers
  void processAttioSyncQueue().catch((err) => {
    console.error("[attio-sync] queue processor error", err);
  });
}

export async function queueProfileSyncBundle(
  profileId: string,
  opts: {
    note?: string;
    taskContent?: string;
    taskDedupeKey?: string;
    updateStage?: boolean;
  } = {},
): Promise<void> {
  await queueAttioSync({
    clientProfileId: profileId,
    action: "upsert_person",
    dedupeKey: `upsert_person:${profileId}`,
  });
  await queueAttioSync({
    clientProfileId: profileId,
    action: "upsert_housing_record",
    dedupeKey: `upsert_housing:${profileId}`,
  });
  if (opts.updateStage) {
    await queueAttioSync({
      clientProfileId: profileId,
      action: "update_stage",
      dedupeKey: `update_stage:${profileId}`,
    });
  }
  await queueAttioSync({
    clientProfileId: profileId,
    action: "sync_pipeline_lists",
    dedupeKey: `sync_lists:${profileId}`,
  });
  if (opts.note) {
    await queueAttioSync({
      clientProfileId: profileId,
      action: "add_note",
      payload: { note: opts.note },
      dedupeKey: `note:${profileId}:${opts.note.slice(0, 40)}`,
    });
  }
  if (opts.taskContent) {
    await queueAttioSync({
      clientProfileId: profileId,
      action: "create_task",
      payload: { content: opts.taskContent },
      dedupeKey: opts.taskDedupeKey ?? `task:${profileId}:${opts.taskContent.slice(0, 40)}`,
    });
  }
}

let processing = false;

export async function processAttioSyncQueue(): Promise<{ processed: number; failed: number }> {
  if (processing) return { processed: 0, failed: 0 };
  processing = true;
  let processed = 0;
  let failed = 0;

  try {
    const service = AttioService.fromEnv();
    if (!service) return { processed: 0, failed: 0 };

    const jobs = await listPendingAttioJobs(25);
    for (const job of jobs) {
      await updateAttioSyncJob(job.id, {
        status: "processing",
        attemptCount: (job.attemptCount ?? 0) + 1,
      });

      try {
        const row = await getClientProfileById(job.clientProfileId);
        if (!row) throw new Error("Client profile not found");
        const profile = rowToClientProfile(row) as ClientProfile;
        const payload = (() => {
          try {
            return JSON.parse(job.payload || "{}");
          } catch {
            return {};
          }
        })();

        switch (job.action as AttioSyncAction) {
          case "upsert_person": {
            const person = await service.upsertPerson(profile);
            const personId = person.id.record_id;
            if (personId && personId !== row.attioPersonId) {
              await updateClientProfile(row.id, { attioPersonId: personId });
              profile.attioPersonId = personId;
            } else if (personId) {
              profile.attioPersonId = personId;
            }
            break;
          }
          case "upsert_housing_record": {
            if (!profile.attioPersonId && profile.email) {
              const person = await service.upsertPerson(profile);
              profile.attioPersonId = person.id.record_id;
              await updateClientProfile(row.id, { attioPersonId: person.id.record_id });
            }
            const record = await service.upsertHousingRecord(profile);
            const recordId = record.id.record_id;
            if (recordId && recordId !== row.attioRecordId) {
              await updateClientProfile(row.id, { attioRecordId: recordId });
            }
            break;
          }
          case "add_note": {
            const recordId = profile.attioRecordId;
            if (!recordId) throw new Error("No Attio housing record for note");
            await service.addNote(recordId, String(payload.note || "Profile update"));
            break;
          }
          case "create_task": {
            const recordId = profile.attioRecordId;
            if (!recordId) {
              // Ensure housing record exists first
              const record = await service.upsertHousingRecord(profile);
              await updateClientProfile(row.id, { attioRecordId: record.id.record_id });
              await service.createTask(record.id.record_id, {
                content: String(payload.content || "Follow up"),
                deadlineAt: payload.deadlineAt ?? null,
              });
            } else {
              await service.createTask(recordId, {
                content: String(payload.content || "Follow up"),
                deadlineAt: payload.deadlineAt ?? null,
              });
            }
            break;
          }
          case "update_stage": {
            const recordId = profile.attioRecordId;
            if (!recordId) throw new Error("No Attio housing record for stage update");
            const stage =
              LIFECYCLE_TO_ATTIO[profile.lifecycleStage] ||
              String(payload.stage || "New Signal");
            await service.updateLifecycleStage(recordId, stage);
            break;
          }
          case "sync_pipeline_lists": {
            if (!profile.attioPersonId && profile.email) {
              const person = await service.upsertPerson(profile);
              profile.attioPersonId = person.id.record_id;
              await updateClientProfile(row.id, { attioPersonId: person.id.record_id });
            }
            if (!profile.attioPersonId) {
              throw new Error("No Attio person for pipeline list sync");
            }
            await service.syncPipelineLists(profile);
            break;
          }
          default:
            throw new Error(`Unknown Attio action: ${job.action}`);
        }

        await updateAttioSyncJob(job.id, { status: "completed", lastError: null });
        await writeAttioSyncLog({
          jobId: job.id,
          clientProfileId: job.clientProfileId,
          action: job.action,
          level: "info",
          message: "Sync completed",
        });
        processed += 1;
      } catch (err) {
        failed += 1;
        const message = err instanceof Error ? err.message : String(err);
        const attempts = (job.attemptCount ?? 0) + 1;
        await updateAttioSyncJob(job.id, {
          status: "failed",
          lastError: message.slice(0, 1000),
          nextRetryAt: new Date(Date.now() + backoffMs(attempts)),
        });
        await writeAttioSyncLog({
          jobId: job.id,
          clientProfileId: job.clientProfileId,
          action: job.action,
          level: "error",
          message: "Sync failed",
          detail: message.slice(0, 2000),
        });
        console.error("[attio-sync] job failed", job.id, message);
      }
    }
  } finally {
    processing = false;
  }

  return { processed, failed };
}
