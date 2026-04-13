import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "gf_admin_session";

export function getAdminSessionToken(): string {
  const secret =
    process.env.ADMIN_SESSION_SECRET ?? "dev-only-change-in-production";
  return createHmac("sha256", secret).update("gf-admin-v1").digest("hex");
}

export function isValidAdminCookie(value: string | undefined): boolean {
  if (!value) return false;
  const expected = getAdminSessionToken();
  try {
    const a = Buffer.from(value, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyAdminCredentials(
  loginId: string,
  password: string
): boolean {
  const expectedId = process.env.ADMIN_LOGIN_ID?.trim();
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (
    expectedId == null ||
    expectedId === "" ||
    expectedPassword == null ||
    expectedPassword === ""
  ) {
    return false;
  }
  return loginId.trim() === expectedId && password === expectedPassword;
}
