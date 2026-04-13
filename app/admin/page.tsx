import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ComponentType } from "react";
import { Inbox, LayoutDashboard, Mail, TrendingUp } from "lucide-react";

import { AdminSideNav } from "@/components/admin/admin-side-nav";
import { ContactSubmissionCard } from "@/components/admin/contact-submission-card";
import { ADMIN_COOKIE, isValidAdminCookie } from "@/lib/admin-session";
import { listContactSubmissions } from "@/lib/contact-submissions-store";

export const dynamic = "force-dynamic";

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function StatTile({
  label,
  value,
  hint,
  icon: Icon,
  accent = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: ComponentType<{ className?: string }>;
  accent?: "default" | "sky";
}) {
  return (
    <div
      className={`rounded-2xl border p-4 backdrop-blur-sm sm:p-5 ${
        accent === "sky"
          ? "border-sky-500/25 bg-sky-500/[0.07] shadow-[0_0_40px_-24px_rgba(56,189,248,0.35)]"
          : "border-white/10 bg-zinc-900/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl">
            {value}
          </p>
          {hint ? (
            <p className="mt-1.5 text-xs leading-snug text-zinc-500">{hint}</p>
          ) : null}
        </div>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
            accent === "sky"
              ? "border-sky-400/30 bg-sky-500/15 text-sky-300"
              : "border-white/10 bg-white/[0.04] text-zinc-400"
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const jar = await cookies();
  if (!isValidAdminCookie(jar.get(ADMIN_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  const submissions = await listContactSubmissions();
  const snapshot = new Date();
  const weekStart = new Date(snapshot);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(snapshot);
  monthStart.setDate(monthStart.getDate() - 30);
  const calMonthStart = new Date(snapshot.getFullYear(), snapshot.getMonth(), 1);

  const last7 = submissions.filter(
    (s) => new Date(s.createdAt) >= weekStart
  ).length;
  const last30 = submissions.filter(
    (s) => new Date(s.createdAt) >= monthStart
  ).length;
  const thisCalendarMonth = submissions.filter(
    (s) => new Date(s.createdAt) >= calMonthStart
  ).length;

  const withPhone = submissions.filter((s) => s.phone?.trim()).length;

  const topicCounts = submissions.reduce<Record<string, number>>((acc, s) => {
    const t = s.topic?.trim() || "No topic";
    acc[t] = (acc[t] ?? 0) + 1;
    return acc;
  }, {});
  const topicEntries = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
  const maxTopic = Math.max(1, ...topicEntries.map(([, n]) => n));

  const recent = submissions.slice(0, 5);

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
                GTA Funding
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Admin dashboard
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Overview and contact form submissions
              </p>
            </header>

            <section
              id="overview"
              className="scroll-mt-[calc(3.5rem+1rem)] lg:scroll-mt-8"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Overview
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Lead volume and topic mix from the homepage form
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                <StatTile
                  label="Total leads"
                  value={submissions.length}
                  hint="All time"
                  icon={Inbox}
                />
                <StatTile
                  label="Last 7 days"
                  value={last7}
                  hint="Rolling week"
                  icon={TrendingUp}
                  accent="sky"
                />
                <StatTile
                  label="Last 30 days"
                  value={last30}
                  hint="Rolling month"
                  icon={Mail}
                />
                <StatTile
                  label="This month"
                  value={thisCalendarMonth}
                  hint="Calendar month to date"
                  icon={LayoutDashboard}
                />
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-4 sm:p-5 lg:col-span-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Contact completeness
                  </p>
                  <p className="mt-3 text-2xl font-semibold tabular-nums text-white">
                    {withPhone}
                    <span className="text-base font-normal text-zinc-500">
                      {" "}
                      / {submissions.length || "0"}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Submissions that include a phone number
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-4 sm:p-5 lg:col-span-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Topics
                  </p>
                  {topicEntries.length === 0 ? (
                    <p className="mt-4 text-sm text-zinc-500">No data yet</p>
                  ) : (
                    <ul className="mt-4 space-y-3">
                      {topicEntries.map(([topic, count]) => (
                        <li key={topic}>
                          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                            <span className="min-w-0 truncate font-medium text-zinc-200">
                              {topic}
                            </span>
                            <span className="shrink-0 tabular-nums text-zinc-500">
                              {count}
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-sky-600 to-sky-400"
                              style={{
                                width: `${Math.round((count / maxTopic) * 100)}%`,
                              }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {recent.length > 0 ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/40 p-4 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Recent activity
                  </p>
                  <ul className="mt-4 divide-y divide-white/[0.06]">
                    {recent.map((s) => (
                      <li
                        key={s.id}
                        className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-white">{s.name}</p>
                          <p className="truncate text-xs text-zinc-500">
                            {s.email}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-3 text-xs text-zinc-500">
                          {s.topic ? (
                            <span className="hidden max-w-[10rem] truncate rounded-md bg-white/[0.05] px-2 py-0.5 text-zinc-400 sm:inline">
                              {s.topic}
                            </span>
                          ) : null}
                          <time dateTime={s.createdAt}>
                            {formatWhen(s.createdAt)}
                          </time>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>

            <section
              id="contacts"
              className="mt-14 scroll-mt-[calc(3.5rem+1rem)] sm:mt-16 lg:scroll-mt-8"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Contact inbox
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Full details for every submission: ID, time, email, phone,
                    company, topic, and message
                  </p>
                </div>
                {submissions.length > 0 ? (
                  <p className="text-xs font-medium text-zinc-500">
                    Newest first · {submissions.length} total
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
                    with full contact details. Configure{" "}
                    <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-sky-300">
                      SUPABASE_URL
                    </code>{" "}
                    and{" "}
                    <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-sky-300">
                      SUPABASE_SERVICE_ROLE_KEY
                    </code>{" "}
                    (see{" "}
                    <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-sky-300">
                      supabase/migrations/001_contact_submissions.sql
                    </code>
                    ), or use the local JSON file when those are unset.
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
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
