import type { ReactNode } from "react";

import type { ContactSubmission } from "@/lib/contact-submissions-store";
import { ContactInboxActions } from "@/components/admin/contact-inbox-actions";

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatRelative(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 48) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 14) return `${d}d ago`;
  return formatWhen(iso);
}

function Detail({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-zinc-200">{children}</dd>
    </div>
  );
}

export function ContactSubmissionCard({ s }: { s: ContactSubmission }) {
  const completed = Boolean(s.completedAt);
  return (
    <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-zinc-900/70 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-sm transition-[border-color,box-shadow] hover:border-sky-500/20 hover:shadow-[0_0_40px_-20px_rgba(56,189,248,0.15)]">
      <div className="flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-white">
              {s.name}
            </h3>
            {completed ? (
              <span className="inline-flex items-center rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                Completed
              </span>
            ) : null}
          </div>
          <p className="mt-1 font-mono text-[11px] text-zinc-500 break-all">
            ID {s.id}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <time
            dateTime={s.createdAt}
            className="block text-sm font-medium text-zinc-300"
            title={s.createdAt}
          >
            {formatWhen(s.createdAt)}
          </time>
          <p className="mt-0.5 text-xs text-zinc-500">{formatRelative(s.createdAt)}</p>
        </div>
      </div>

      <dl className="grid gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-5">
        <Detail label="Email">
          <a
            href={`mailto:${s.email}?subject=${encodeURIComponent(`Re: GTA Funding inquiry (${s.name})`)}`}
            className="break-all font-medium text-sky-400 hover:text-sky-300 hover:underline"
          >
            {s.email}
          </a>
        </Detail>
        <Detail label="Phone">
          {s.phone ? (
            <a
              href={`tel:${s.phone.replace(/\s/g, "")}`}
              className="font-medium text-sky-400 hover:text-sky-300 hover:underline"
            >
              {s.phone}
            </a>
          ) : (
            <span className="text-zinc-500">Not provided</span>
          )}
        </Detail>
        <Detail label="Company" className="sm:col-span-2">
          {s.company ? (
            <span className="text-white">{s.company}</span>
          ) : (
            <span className="text-zinc-500">Not provided</span>
          )}
        </Detail>
        <Detail label="Topic" className="sm:col-span-2">
          {s.topic ? (
            <span className="inline-flex rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
              {s.topic}
            </span>
          ) : (
            <span className="text-zinc-500">Not specified</span>
          )}
        </Detail>
      </dl>

      <div className="border-t border-white/[0.06] px-4 pb-4 sm:px-5 sm:pb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Message
        </p>
        <div className="mt-2 max-h-[min(40vh,20rem)] overflow-y-auto rounded-xl border border-white/[0.06] bg-black/35 p-4 text-sm leading-relaxed text-zinc-200">
          <p className="whitespace-pre-wrap break-words">{s.message}</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${s.email}?subject=${encodeURIComponent("Re: Your GTA Funding inquiry")}&body=${encodeURIComponent(`Hi ${s.name.split(" ")[0] || "there"},\n\n`)}`}
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-500"
            >
              Reply by email
            </a>
            {s.phone ? (
              <a
                href={`tel:${s.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-white/25 hover:bg-white/5"
              >
                Call
              </a>
            ) : null}
          </div>
          <ContactInboxActions id={s.id} completed={completed} />
        </div>
      </div>
    </article>
  );
}
