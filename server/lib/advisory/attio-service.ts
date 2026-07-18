import {
  attioPeopleListForStage,
  type AttioTask,
  type ClientProfile,
} from "@shared/client-profile";
import {
  mapLifecycleToAttio,
  mapProfileToAttioHousingValues,
  mapProfileToAttioPersonValues,
  normalizeEmail,
  pruneAttioValues,
} from "./attio-mapping";

const ATTIO_BASE = "https://api.attio.com/v2";

export type AttioPerson = {
  id: { workspace_id: string; object_id: string; record_id: string };
  values?: Record<string, unknown>;
};

export type AttioRecord = {
  id: { workspace_id: string; object_id: string; record_id: string };
  values?: Record<string, unknown>;
};

export type AttioConfig = {
  apiKey: string;
  workspaceId?: string;
  peopleObjectId: string;
  housingRecordObjectId: string;
  leadListId: string;
  clientListId: string;
  dealListId: string;
};

export function getAttioConfig(): AttioConfig | null {
  const apiKey = process.env.ATTIO_API_KEY?.trim();
  const peopleObjectId = process.env.ATTIO_PEOPLE_OBJECT_ID?.trim() || "people";
  const housingRecordObjectId = process.env.ATTIO_HOUSING_RECORD_OBJECT_ID?.trim();
  if (!apiKey || !housingRecordObjectId) return null;
  if (process.env.ATTIO_SYNC_ENABLED?.toLowerCase() === "false") return null;
  return {
    apiKey,
    workspaceId: process.env.ATTIO_WORKSPACE_ID?.trim() || undefined,
    peopleObjectId,
    housingRecordObjectId,
    leadListId: process.env.ATTIO_LEAD_LIST_ID?.trim() || "lead_pipeline",
    clientListId: process.env.ATTIO_CLIENT_LIST_ID?.trim() || "client_pipeline",
    dealListId: process.env.ATTIO_DEAL_LIST_ID?.trim() || "deal_pipeline",
  };
}

export function isAttioConfigured(): boolean {
  return getAttioConfig() != null;
}

/** Status for admin troubleshooting — never returns the API key. */
export function getAttioSetupStatus() {
  const apiKey = Boolean(process.env.ATTIO_API_KEY?.trim());
  const peopleObjectId = process.env.ATTIO_PEOPLE_OBJECT_ID?.trim() || "people";
  const housingRecordObjectId = Boolean(process.env.ATTIO_HOUSING_RECORD_OBJECT_ID?.trim());
  const workspaceId = Boolean(process.env.ATTIO_WORKSPACE_ID?.trim());
  const syncEnabled = process.env.ATTIO_SYNC_ENABLED?.toLowerCase() !== "false";
  return {
    apiKey,
    peopleObjectId,
    housingRecordObjectId,
    workspaceId,
    syncEnabled,
    ready: apiKey && housingRecordObjectId && syncEnabled,
  };
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

export class AttioService {
  constructor(private readonly config: AttioConfig) {}

  static fromEnv(): AttioService | null {
    const config = getAttioConfig();
    return config ? new AttioService(config) : null;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    attempt = 1,
  ): Promise<T> {
    const res = await fetch(`${ATTIO_BASE}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body != null ? JSON.stringify(body) : undefined,
    });

    if ((res.status === 429 || res.status >= 500) && attempt < 4) {
      const retryAfter = Number(res.headers.get("retry-after") || 0);
      await sleep(Math.max(retryAfter * 1000, 250 * 2 ** attempt));
      return this.request<T>(method, path, body, attempt + 1);
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Attio ${method} ${path} failed (${res.status}): ${text.slice(0, 500)}`);
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  }

  async findPersonByEmail(email: string): Promise<AttioPerson | null> {
    const normalized = normalizeEmail(email);
    if (!normalized) return null;

    const object = encodeURIComponent(this.config.peopleObjectId);
    const result = await this.request<{ data: AttioPerson[] }>(
      "POST",
      `/objects/${object}/records/query`,
      {
        filter: {
          email_addresses: normalized,
        },
        limit: 1,
      },
    );

    return result.data?.[0] ?? null;
  }

  async createPerson(profile: ClientProfile): Promise<AttioPerson> {
    const object = encodeURIComponent(this.config.peopleObjectId);
    const values = pruneAttioValues(
      mapProfileToAttioPersonValues(profile, { syncStatus: "Synced" }),
    );
    const result = await this.request<{ data: AttioPerson }>("POST", `/objects/${object}/records`, {
      data: { values },
    });
    return result.data;
  }

  async updatePerson(personId: string, profile: ClientProfile): Promise<void> {
    const object = encodeURIComponent(this.config.peopleObjectId);
    const values = pruneAttioValues(
      mapProfileToAttioPersonValues(profile, { syncStatus: "Synced" }),
    );
    await this.request("PATCH", `/objects/${object}/records/${encodeURIComponent(personId)}`, {
      data: { values },
    });
  }

  /**
   * Prefer assert (PUT matching email) when email is present;
   * otherwise search/create by stored attioPersonId or create new.
   */
  async upsertPerson(profile: ClientProfile): Promise<AttioPerson> {
    const email = normalizeEmail(profile.email);
    const object = encodeURIComponent(this.config.peopleObjectId);
    const values = pruneAttioValues(
      mapProfileToAttioPersonValues(profile, { syncStatus: "Synced" }),
    );

    if (email) {
      const result = await this.request<{ data: AttioPerson }>(
        "PUT",
        `/objects/${object}/records?matching_attribute=email_addresses`,
        { data: { values } },
      );
      return result.data;
    }

    if (profile.attioPersonId) {
      await this.updatePerson(profile.attioPersonId, profile);
      return {
        id: {
          workspace_id: this.config.workspaceId || "",
          object_id: this.config.peopleObjectId,
          record_id: profile.attioPersonId,
        },
      };
    }

    return this.createPerson(profile);
  }

  async createHousingRecord(profile: ClientProfile): Promise<AttioRecord> {
    const object = encodeURIComponent(this.config.housingRecordObjectId);
    const values = pruneAttioValues(
      mapProfileToAttioHousingValues(profile, {
        personRecordId: profile.attioPersonId,
      }),
    );
    const result = await this.request<{ data: AttioRecord }>("POST", `/objects/${object}/records`, {
      data: { values },
    });
    return result.data;
  }

  async updateHousingRecord(recordId: string, profile: ClientProfile): Promise<void> {
    const object = encodeURIComponent(this.config.housingRecordObjectId);
    const values = pruneAttioValues(
      mapProfileToAttioHousingValues(profile, {
        personRecordId: profile.attioPersonId,
      }),
    );
    await this.request("PATCH", `/objects/${object}/records/${encodeURIComponent(recordId)}`, {
      data: { values },
    });
  }

  async upsertHousingRecord(profile: ClientProfile): Promise<AttioRecord> {
    if (profile.attioRecordId) {
      await this.updateHousingRecord(profile.attioRecordId, profile);
      return {
        id: {
          workspace_id: this.config.workspaceId || "",
          object_id: this.config.housingRecordObjectId,
          record_id: profile.attioRecordId,
        },
      };
    }

    // Prefer assert on website_visitor_id when available (unique custom attribute).
    if (profile.visitorId) {
      try {
        const object = encodeURIComponent(this.config.housingRecordObjectId);
        const values = pruneAttioValues(
          mapProfileToAttioHousingValues(profile, {
            personRecordId: profile.attioPersonId,
          }),
        );
        const result = await this.request<{ data: AttioRecord }>(
          "PUT",
          `/objects/${object}/records?matching_attribute=website_visitor_id`,
          { data: { values } },
        );
        return result.data;
      } catch (err) {
        console.warn("[attio] housing assert by visitor id failed; creating", err);
      }
    }

    return this.createHousingRecord(profile);
  }

  async addNote(recordId: string, note: string, title = "Website update"): Promise<void> {
    await this.request("POST", "/notes", {
      data: {
        parent_object: this.config.housingRecordObjectId,
        parent_record_id: recordId,
        title,
        format: "plaintext",
        content: note.slice(0, 10000),
      },
    });
  }

  async createTask(recordId: string, task: AttioTask): Promise<void> {
    await this.request("POST", "/tasks", {
      data: {
        content: task.content.slice(0, 2000),
        format: "plaintext",
        deadline_at: task.deadlineAt ?? null,
        is_completed: false,
        linked_records: [
          {
            target_object: this.config.housingRecordObjectId,
            target_record_id: recordId,
          },
        ],
      },
    });
  }

  async updateLifecycleStage(recordId: string, stage: string): Promise<void> {
    const object = encodeURIComponent(this.config.housingRecordObjectId);
    await this.request("PATCH", `/objects/${object}/records/${encodeURIComponent(recordId)}`, {
      data: {
        values: {
          lifecycle_stage: [{ option: stage }],
        },
      },
    });
  }

  /**
   * Keep People on exactly one relationship board:
   * Lead Pipeline (pre-client) OR Current Clients (advisory / past).
   * Transactions / deal files stay on the separate Transactions object + Active Transactions list.
   */
  async syncPipelineLists(profile: ClientProfile): Promise<void> {
    const personId = profile.attioPersonId;
    if (!personId) return;

    const stage = mapLifecycleToAttio(profile.lifecycleStage);
    const kind = attioPeopleListForStage(stage);
    const targetList =
      kind === "client" ? this.config.clientListId : this.config.leadListId;
    const otherList =
      kind === "client" ? this.config.leadListId : this.config.clientListId;

    await this.assertListEntry(targetList, personId, stage);
    await this.removeListEntriesForPerson(otherList, personId);
  }

  private async assertListEntry(
    listId: string,
    personRecordId: string,
    stage: string,
  ): Promise<void> {
    const list = encodeURIComponent(listId);
    try {
      await this.request("PUT", `/lists/${list}/entries`, {
        data: {
          parent_record_id: personRecordId,
          parent_object: this.config.peopleObjectId,
          entry_values: {
            stage,
          },
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (!/multiple_match_results/i.test(message)) throw err;
      // Duplicates: keep one entry, update it, delete the rest
      const entries = await this.findListEntriesForPerson(listId, personRecordId);
      const [keep, ...extras] = entries;
      if (!keep) throw err;
      await this.request(
        "PATCH",
        `/lists/${list}/entries/${encodeURIComponent(keep.entryId)}`,
        { data: { entry_values: { stage } } },
      );
      for (const extra of extras) {
        await this.request(
          "DELETE",
          `/lists/${list}/entries/${encodeURIComponent(extra.entryId)}`,
        );
      }
    }
  }

  private async findListEntriesForPerson(
    listId: string,
    personRecordId: string,
  ): Promise<Array<{ entryId: string }>> {
    const list = encodeURIComponent(listId);
    const result = await this.request<{
      data: Array<{ id: { entry_id: string }; parent_record_id: string }>;
    }>("POST", `/lists/${list}/entries/query`, {
      filter: {
        parent_record: {
          target_record_id: { $eq: personRecordId },
        },
      },
      limit: 20,
    });
    return (result.data || []).map((e) => ({ entryId: e.id.entry_id }));
  }

  private async removeListEntriesForPerson(
    listId: string,
    personRecordId: string,
  ): Promise<void> {
    const entries = await this.findListEntriesForPerson(listId, personRecordId);
    const list = encodeURIComponent(listId);
    for (const entry of entries) {
      await this.request(
        "DELETE",
        `/lists/${list}/entries/${encodeURIComponent(entry.entryId)}`,
      );
    }
  }
}
