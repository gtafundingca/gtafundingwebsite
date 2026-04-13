import { NextResponse } from "next/server";

import { sendContactSubmissionNotification } from "@/lib/contact-email";
import { addContactSubmission } from "@/lib/contact-submissions-store";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const company = String(body.company ?? "").trim();
    const topic = String(body.topic ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || name.length > 200) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    if (!email || email.length > 320 || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!message || message.length > 20_000) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const row = await addContactSubmission({
      name,
      email,
      phone: phone.slice(0, 80),
      company: company.slice(0, 200),
      topic: topic.slice(0, 200),
      message,
    });

    void sendContactSubmissionNotification(row);

    return NextResponse.json({ ok: true, id: row.id });
  } catch {
    return NextResponse.json(
      { error: "Could not save submission" },
      { status: 500 }
    );
  }
}
