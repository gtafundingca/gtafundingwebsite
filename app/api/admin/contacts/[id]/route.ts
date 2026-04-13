import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ADMIN_COOKIE, isValidAdminCookie } from "@/lib/admin-session";
import {
  deleteContactSubmission,
  setContactSubmissionCompleted,
} from "@/lib/contact-submissions-store";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const jar = await cookies();
  if (!isValidAdminCookie(jar.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await req.json()) as { completed?: unknown };
  const completed = Boolean(body.completed);

  await setContactSubmissionCompleted(id, completed);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const jar = await cookies();
  if (!isValidAdminCookie(jar.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteContactSubmission(id);
  return NextResponse.json({ ok: true });
}

