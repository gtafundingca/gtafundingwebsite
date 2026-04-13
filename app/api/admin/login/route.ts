import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE,
  getAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin-session";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    loginId?: string;
    password?: string;
  };
  const loginId = String(body.loginId ?? "").trim();
  const password = String(body.password ?? "");
  if (!loginId || !password || !verifyAdminCredentials(loginId, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = getAdminSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
