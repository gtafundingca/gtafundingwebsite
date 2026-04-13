import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Inbox } from "lucide-react";

import { AdminSideNav } from "@/components/admin/admin-side-nav";
import { ContactSubmissionCard } from "@/components/admin/contact-submission-card";
import { ADMIN_COOKIE, isValidAdminCookie } from "@/lib/admin-session";
import { listContactSubmissions } from "@/lib/contact-submissions-store";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const jar = await cookies();
  if (!isValidAdminCookie(jar.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  const submissions = await listContactSubmissions();

  return (
    <div className="min-h-screen min-h-dvh bg-zinc-950 text-zinc-100">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(56,189,248,0.12),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(14,165,233,0.1),transparent_55%)]"
        aria-hidden
      />

      <div className="relative flex min-h-dvh w-full flex-col lg:flex-row">
        <AdminSideNav inboxCount={submissions.length} />

        <div className="relative flex min-h-dvh min-w-0 flex-1 flex-col">
          <main className="relative mx-auto w-full max-w-7xl flex-1 px-3 py-6 min-[400px]:px-4 sm:px-5 sm:py-8 md:px-6 md:py-10 lg:px-8">
            <header className="mb-8 border-b border-white/10 pb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-400/90 sm:text-xs">
                Admin
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Contact inbox
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Full details for every submission: ID, time, email, phone, company,
                topic, and message
              </p>
            </header>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  Submissions
                </h2>
                <p className="mt-1 text-sm text-zinc-500">Newest first</p>
              </div>
              {submissions.length > 0 ? (
                <p className="text-xs font-medium text-zinc-500">
                  {submissions.length} total
                </p>
              ) : null}
            </div>

            {submissions.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-zinc-900/30 px-4 py-14 text-center sm:mt-10 sm:px-8 sm:py-20">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-500">
                  <Inbox className="h-7 w-7" aria-hidden />
                </span>
                <p className="mt-6 text-lg font-semibold text-zinc-200">
                  No messages yet
                </p>
                <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-zinc-500">
                  Submissions from your homepage contact form will show up here
                  with full contact details.
                </p>
              </div>
            ) : (
              <ul className="mt-8 grid list-none gap-5 sm:mt-10 lg:grid-cols-2 lg:gap-6">
                {submissions.map((s) => (
                  <li key={s.id}>
                    <ContactSubmissionCard s={s} />
                  </li>
                ))}
              </ul>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

