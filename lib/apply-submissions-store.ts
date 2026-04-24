/**
 * Apply submissions: Supabase when configured, otherwise local JSON fallback.
 */
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

import { getSupabaseServiceClient, isSupabaseConfigured } from "@/lib/supabase/service";

export type ApplySubmission = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  monthlyRevenue: string;
  amountNeeded: string;
  fundingUse: string;
};

type ApplySubmissionRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  monthly_revenue: string | null;
  amount_needed: string | null;
  funding_use: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "apply-submissions.json");

function isSupabaseTransportError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /fetch failed|network|ECONN|ENOTFOUND|ETIMEDOUT/i.test(message);
}

function rowToSubmission(row: ApplySubmissionRow): ApplySubmission {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    company: row.company ?? "",
    monthlyRevenue: row.monthly_revenue ?? "",
    amountNeeded: row.amount_needed ?? "",
    fundingUse: row.funding_use,
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

async function readAllFile(): Promise<ApplySubmission[]> {
  await ensureFile();
  const raw = await readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as ApplySubmission[];
  } catch {
    return [];
  }
}

async function writeAllFile(rows: ApplySubmission[]): Promise<void> {
  await ensureFile();
  await writeFile(DATA_FILE, JSON.stringify(rows, null, 2) + "\n", "utf-8");
}

export async function addApplySubmission(
  input: Omit<ApplySubmission, "id" | "createdAt">
): Promise<ApplySubmission> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServiceClient();
      const { data, error } = await supabase
        .from("apply_submissions")
        .insert({
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          monthly_revenue: input.monthlyRevenue,
          amount_needed: input.amountNeeded,
          funding_use: input.fundingUse,
        })
        .select(
          "id, created_at, name, email, phone, company, monthly_revenue, amount_needed, funding_use"
        )
        .single();

      if (error) throw new Error(error.message);
      if (!data) throw new Error("No row returned from insert");
      return rowToSubmission(data as ApplySubmissionRow);
    } catch (error) {
      if (!isSupabaseTransportError(error)) {
        throw error;
      }
      console.warn(
        "[apply-submissions-store] Supabase unavailable, falling back to local file storage for insert."
      );
    }
  }

  const rows = await readAllFile();
  const row: ApplySubmission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  rows.unshift(row);
  await writeAllFile(rows);
  return row;
}

