/**
 * Contact submissions: Supabase when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set,
 * otherwise a local JSON file (dev only; serverless hosts cannot persist it).
 */
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { randomUUID } from "crypto";

import { getSupabaseServiceClient, isSupabaseConfigured } from "@/lib/supabase/service";

export type ContactSubmission = {
  id: string;
  createdAt: string;
  completedAt?: string | null;
  deletedAt?: string | null;
  name: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
  message: string;
};

type ContactSubmissionRow = {
  id: string;
  created_at: string;
  completed_at?: string | null;
  deleted_at?: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  topic: string | null;
  message: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "contact-submissions.json");

function isSupabaseTransportError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /fetch failed|network|ECONN|ENOTFOUND|ETIMEDOUT/i.test(message);
}

function rowToSubmission(row: ContactSubmissionRow): ContactSubmission {
  return {
    id: row.id,
    createdAt: row.created_at,
    completedAt: row.completed_at ?? null,
    deletedAt: row.deleted_at ?? null,
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    company: row.company ?? "",
    topic: row.topic ?? "",
    message: row.message,
  };
}

async function ensureFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf-8");
  } catch {
    await writeFile(DATA_FILE, "[]\n", "utf-8");
  }
}

async function readAllFile(): Promise<ContactSubmission[]> {
  await ensureFile();
  const raw = await readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as ContactSubmission[];
  } catch {
    return [];
  }
}

async function writeAllFile(rows: ContactSubmission[]): Promise<void> {
  await ensureFile();
  await writeFile(DATA_FILE, JSON.stringify(rows, null, 2) + "\n", "utf-8");
}

async function addFile(
  input: Omit<ContactSubmission, "id" | "createdAt">
): Promise<ContactSubmission> {
  const rows = await readAllFile();
  const row: ContactSubmission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    completedAt: null,
    deletedAt: null,
    ...input,
  };
  rows.unshift(row);
  await writeAllFile(rows);
  return row;
}

async function listFile(): Promise<ContactSubmission[]> {
  const rows = await readAllFile();
  return rows.filter((r) => !r.deletedAt);
}

export async function addContactSubmission(
  input: Omit<ContactSubmission, "id" | "createdAt">
): Promise<ContactSubmission> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServiceClient();
      const { data, error } = await supabase
        .from("contact_submissions")
        .insert({
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          topic: input.topic,
          message: input.message,
        })
        .select(
          "id, created_at, completed_at, deleted_at, name, email, phone, company, topic, message"
        )
        .single();

      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error("No row returned from insert");
      }
      return rowToSubmission(data as ContactSubmissionRow);
    } catch (error) {
      if (!isSupabaseTransportError(error)) {
        throw error;
      }
      console.warn(
        "[contact-submissions-store] Supabase unavailable, falling back to local file storage for insert."
      );
    }
  }

  return addFile(input);
}

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServiceClient();
      const { data, error } = await supabase
        .from("contact_submissions")
        .select(
          "id, created_at, completed_at, deleted_at, name, email, phone, company, topic, message"
        )
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return (data as ContactSubmissionRow[]).map(rowToSubmission);
    } catch (error) {
      if (!isSupabaseTransportError(error)) {
        throw error;
      }
      console.warn(
        "[contact-submissions-store] Supabase unavailable, falling back to local file storage for list."
      );
    }
  }

  return listFile();
}

export async function setContactSubmissionCompleted(
  id: string,
  completed: boolean
): Promise<void> {
  if (!id) return;

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServiceClient();
      const { error } = await supabase
        .from("contact_submissions")
        .update({ completed_at: completed ? new Date().toISOString() : null })
        .eq("id", id);
      if (error) throw new Error(error.message);
      return;
    } catch (error) {
      if (!isSupabaseTransportError(error)) {
        throw error;
      }
      console.warn(
        "[contact-submissions-store] Supabase unavailable, falling back to local file storage for update."
      );
    }
  }

  const rows = await readAllFile();
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return;
  rows[idx] = {
    ...rows[idx],
    completedAt: completed ? new Date().toISOString() : null,
  };
  await writeAllFile(rows);
}

export async function deleteContactSubmission(id: string): Promise<void> {
  if (!id) return;

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServiceClient();
      const { error } = await supabase
        .from("contact_submissions")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw new Error(error.message);
      return;
    } catch (error) {
      if (!isSupabaseTransportError(error)) {
        throw error;
      }
      console.warn(
        "[contact-submissions-store] Supabase unavailable, falling back to local file storage for delete."
      );
    }
  }

  const rows = await readAllFile();
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return;
  rows[idx] = { ...rows[idx], deletedAt: new Date().toISOString() };
  await writeAllFile(rows);
}
