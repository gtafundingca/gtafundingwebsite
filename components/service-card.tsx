"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

export type ServiceCardProps = {
  badge: string;
  step: string;
  title: string;
  overviewTitle: string;
  overviewBody: string;
  bullets: string[];
  bulletsGrid?: boolean;
  /** Cover photo — paths under /public, e.g. /services/photo.jpg */
  imageSrc?: string;
  imageAlt?: string;
  /** Tailwind object-position classes for the cover (e.g. `object-[20%_center]`). */
  coverPositionClassName?: string;
  /** Light cards for white section backgrounds; default is dark. */
  theme?: "dark" | "light";
  /** Extra classes on the root article (e.g. grid column span) */
  className?: string;
  /** Override title typography for longer headlines */
  titleClassName?: string;
};

export function ServiceCard({
  badge,
  step,
  title,
  overviewTitle,
  overviewBody,
  bullets,
  bulletsGrid = false,
  imageSrc,
  imageAlt,
  coverPositionClassName,
  theme = "dark",
  className,
  titleClassName,
}: ServiceCardProps) {
  const [overviewOpen, setOverviewOpen] = useState(false);
  const light = theme === "light";
  const alt = imageAlt ?? `${badge} — ${title}`;

  return (
    <>
      <article
        className={cn(
          "group/card relative flex flex-col overflow-hidden rounded-2xl border transition-[border-color,box-shadow,transform] duration-300 motion-reduce:transition-none",
          light
            ? "border-black/[0.07] bg-white shadow-[0_1px_0_rgba(14,165,233,0.22),0_12px_40px_-28px_rgba(15,23,42,0.12)] hover:border-sky-500/30 hover:shadow-[0_1px_0_rgba(56,189,248,0.35),0_28px_56px_-32px_rgba(14,165,233,0.2)]"
            : "border-white/[0.08] bg-zinc-950/60 shadow-[0_1px_0_rgba(56,189,248,0.15),0_0_0_1px_rgba(255,255,255,0.03)_inset] hover:border-sky-400/25 hover:shadow-[0_1px_0_rgba(125,211,252,0.25),0_24px_50px_-24px_rgba(59,130,246,0.28)]",
          className
        )}
      >
        {/* Cover: photo or gradient fallback */}
        {imageSrc ? (
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-200">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/card:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100",
                coverPositionClassName ?? "object-center"
              )}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/70"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
              aria-hidden
            />

            <span
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-xs font-semibold tabular-nums text-white shadow-lg backdrop-blur-md sm:right-4 sm:top-4"
              aria-hidden
            >
              {step}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-md sm:text-[11px] sm:tracking-[0.14em]">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.85)]"
                  aria-hidden
                />
                <span className="truncate">{badge}</span>
              </span>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "relative flex aspect-[16/10] w-full shrink-0 items-end justify-between gap-3 overflow-hidden p-4 sm:p-5",
              light
                ? "bg-[radial-gradient(120%_100%_at_80%_0%,rgba(56,189,248,0.18),transparent_50%),radial-gradient(90%_80%_at_10%_100%,rgba(59,130,246,0.12),transparent_55%),linear-gradient(165deg,#f8fafc_0%,#f1f5f9_45%,#e0f2fe_100%)]"
                : "bg-[radial-gradient(100%_80%_at_70%_0%,rgba(59,130,246,0.2),transparent_55%),linear-gradient(165deg,#18181b_0%,#09090b_100%)]"
            )}
          >
            <span
              className={cn(
                "relative z-[1] inline-flex max-w-[min(100%,18rem)] items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.14em]",
                light
                  ? "border-black/10 bg-white/95 text-zinc-800 shadow-sm backdrop-blur-sm"
                  : "border-white/12 bg-black/40 text-zinc-100 shadow-lg backdrop-blur-md"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.6)]",
                  light ? "bg-sky-500" : "bg-sky-400"
                )}
                aria-hidden
              />
              <span className="truncate">{badge}</span>
            </span>
            <span
              className={cn(
                "relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums",
                light
                  ? "border-black/10 bg-white text-zinc-700 shadow-sm"
                  : "border-white/15 bg-white/10 text-zinc-100 backdrop-blur-sm"
              )}
              aria-hidden
            >
              {step}
            </span>
          </div>
        )}

        <div
          className={cn(
            "flex flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6",
            light ? "text-zinc-950" : "text-white"
          )}
        >
          <h3
            className={cn(
              "font-semibold tracking-tight",
              light ? "text-zinc-950" : "text-white",
              titleClassName ?? "text-xl leading-snug sm:text-2xl sm:leading-snug"
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "mt-3 line-clamp-2 text-sm leading-relaxed",
              light ? "text-zinc-600" : "text-zinc-400"
            )}
          >
            {overviewBody}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setOverviewOpen(true)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-[background-color,color,box-shadow,transform] active:scale-[0.98]",
                light
                  ? "bg-sky-600 text-white shadow-sky-600/25 hover:bg-sky-500 hover:shadow-sky-500/30"
                  : "bg-sky-500 text-white shadow-sky-500/20 hover:bg-sky-400"
              )}
            >
              View overview
              <ArrowUpRight className="h-4 w-4 opacity-90" aria-hidden />
            </button>
            <a
              href="#apply"
              className={cn(
                "text-sm font-medium underline-offset-2 transition-colors hover:underline",
                light ? "text-sky-700 hover:text-sky-800" : "text-sky-300 hover:text-sky-200"
              )}
            >
              Apply
            </a>
          </div>
        </div>
      </article>

      <Dialog.Root open={overviewOpen} onOpenChange={setOverviewOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            className={cn(
              "fixed inset-0 z-[200] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              light ? "bg-black/50" : "bg-black/70"
            )}
          />
          <Dialog.Content
            className={cn(
              "fixed left-1/2 top-1/2 z-[201] max-h-[min(90vh,40rem)] w-[min(calc(100vw-1.5rem),28rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border p-6 shadow-2xl outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-h-[min(90vh,44rem)] sm:w-[min(calc(100vw-2rem),36rem)] sm:p-8",
              light
                ? "border-black/[0.08] bg-white text-zinc-950"
                : "border-white/10 bg-zinc-950 text-white"
            )}
          >
            <Dialog.Close
              type="button"
              className={cn(
                "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-colors sm:right-4 sm:top-4",
                light
                  ? "border-black/10 bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                  : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
              )}
              aria-label="Close overview"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </Dialog.Close>

            {imageSrc ? (
              <div className="relative mb-6 aspect-[2.2/1] w-full overflow-hidden rounded-xl bg-zinc-200">
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 36rem, calc(100vw - 2rem)"
                  className={cn(
                    "h-full w-full object-cover",
                    coverPositionClassName ?? "object-center"
                  )}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white",
                      "border-white/20 bg-black/45 backdrop-blur-md"
                    )}
                  >
                    {badge}
                  </span>
                  <span className="flex h-7 min-w-7 items-center justify-center rounded-full border border-white/20 bg-black/45 px-2 text-xs font-semibold tabular-nums text-white backdrop-blur-md">
                    {step}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
                    light
                      ? "border-black/10 bg-sky-500/10 text-sky-800"
                      : "border-white/15 bg-white/5 text-sky-300"
                  )}
                >
                  {badge}
                </span>
                <span
                  className={cn(
                    "flex h-8 min-w-8 items-center justify-center rounded-full border px-2 text-xs font-semibold tabular-nums",
                    light
                      ? "border-black/10 bg-zinc-100 text-zinc-700"
                      : "border-white/12 bg-white/5 text-zinc-200"
                  )}
                >
                  {step}
                </span>
              </div>
            )}

            <Dialog.Title
              className={cn(
                "pr-10 text-xl font-semibold tracking-tight sm:text-2xl sm:leading-snug",
                light ? "text-zinc-950" : "text-white"
              )}
            >
              {overviewTitle}
            </Dialog.Title>
            <Dialog.Description
              className={cn(
                "mt-3 text-sm leading-relaxed sm:text-base",
                light ? "text-zinc-600" : "text-zinc-400"
              )}
            >
              {overviewBody}
            </Dialog.Description>

            <ul
              className={cn(
                "mt-8 text-sm",
                light ? "text-zinc-800" : "text-zinc-200",
                bulletsGrid ? "grid gap-3 sm:grid-cols-2" : "space-y-3"
              )}
            >
              {bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
                      light
                        ? "bg-sky-500/12 text-sky-700"
                        : "bg-sky-500/15 text-sky-300"
                    )}
                  >
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div
              className={cn(
                "mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between",
                light ? "border-black/[0.08]" : "border-white/10"
              )}
            >
              <a
                href="#apply"
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors",
                  light
                    ? "bg-sky-600 text-white hover:bg-sky-500"
                    : "bg-sky-500 text-white hover:bg-sky-400"
                )}
                onClick={() => setOverviewOpen(false)}
              >
                Apply for funding
              </a>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className={cn(
                    "text-sm font-medium underline-offset-2 hover:underline",
                    light ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-400 hover:text-white"
                  )}
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
