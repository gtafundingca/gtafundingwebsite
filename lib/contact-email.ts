import { Resend } from "resend";

import type { ContactSubmission } from "@/lib/contact-submissions-store";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(s: ContactSubmission): string {
  const rows: [string, string][] = [
    ["Name", s.name],
    ["Email", s.email],
    ["Phone", s.phone || "—"],
    ["Company", s.company || "—"],
    ["Topic", s.topic || "—"],
    ["Message", s.message],
  ];
  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e4e4e7;font-weight:600;color:#52525b;width:120px">${escapeHtml(k)}</td><td style="padding:8px 12px;border:1px solid #e4e4e7;color:#18181b;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
    )
    .join("");
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;font-size:14px"><p style="margin:0 0 16px">New contact form submission (ID <code>${escapeHtml(s.id)}</code>).</p><table style="border-collapse:collapse;width:100%;max-width:560px">${body}</table></body></html>`;
}

/**
 * Sends a team notification via Resend. Fails softly if env is not set.
 * Required: RESEND_API_KEY, CONTACT_RESEND_FROM, CONTACT_RESEND_TO
 */
export async function sendContactSubmissionNotification(
  submission: ContactSubmission
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_RESEND_FROM?.trim();
  const to = process.env.CONTACT_RESEND_TO?.trim();
  if (!apiKey || !from || !to) {
    return;
  }

  const resend = new Resend(apiKey);
  const subject = `New lead: ${submission.name}`;
  const text = [
    `New contact form submission (${submission.id})`,
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || "—"}`,
    `Company: ${submission.company || "—"}`,
    `Topic: ${submission.topic || "—"}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: submission.email,
    subject,
    html: buildHtml(submission),
    text,
  });

  if (error) {
    console.error("[contact-email] Resend error:", error.message);
  }
}
