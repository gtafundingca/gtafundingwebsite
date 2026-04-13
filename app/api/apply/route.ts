import { NextResponse } from "next/server";

import { addApplySubmission } from "@/lib/apply-submissions-store";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const company = String(body.company ?? "").trim();
    const monthlyRevenue = String(body.monthlyRevenue ?? "").trim();
    const amountNeeded = String(body.amountNeeded ?? "").trim();
    const fundingUse = String(body.fundingUse ?? "").trim();

    if (!name || name.length > 200) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    if (!email || email.length > 320 || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!phone || phone.length > 80) {
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }
    if (!fundingUse || fundingUse.length > 20_000) {
      return NextResponse.json({ error: "Invalid funding use details" }, { status: 400 });
    }

    const row = await addApplySubmission({
      name,
      email,
      phone,
      company: company.slice(0, 200),
      monthlyRevenue: monthlyRevenue.slice(0, 120),
      amountNeeded: amountNeeded.slice(0, 120),
      fundingUse,
    });

    return NextResponse.json({ ok: true, id: row.id });
  } catch {
    return NextResponse.json({ error: "Could not submit application" }, { status: 500 });
  }
}

