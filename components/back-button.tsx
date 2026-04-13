"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

export type BackButtonProps = {
  /** Where to go when not using browser history. */
  href?: string;
  label?: string;
  className?: string;
  /** Dark glass (admin, hero) vs light (white sections). */
  variant?: "dark" | "light";
  /**
   * When true, clicking uses router.back() if there is history; otherwise `href`.
   */
  preferHistory?: boolean;
};

export function BackButton({
  href = "/",
  label = "Back",
  className,
  variant = "dark",
  preferHistory = false,
}: BackButtonProps) {
  const router = useRouter();

  const base =
    "group inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-[border-color,background-color,color,transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100";

  const styles =
    variant === "dark"
      ? "border-white/[0.12] bg-white/[0.04] text-zinc-300 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] hover:border-sky-400/35 hover:bg-sky-500/[0.12] hover:text-white hover:shadow-[0_0_24px_-8px_rgba(56,189,248,0.35)] focus-visible:ring-offset-zinc-950"
      : "border-zinc-200/90 bg-white text-zinc-600 shadow-sm hover:border-sky-300/80 hover:bg-sky-50/80 hover:text-sky-900 focus-visible:ring-offset-white";

  if (preferHistory) {
    return (
      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
          } else {
            router.push(href);
          }
        }}
        className={cn(base, styles, className)}
      >
        <ArrowLeft
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
          aria-hidden
        />
        {label}
      </button>
    );
  }

  return (
    <Link href={href} className={cn(base, styles, className)}>
      <ArrowLeft
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
        aria-hidden
      />
      {label}
    </Link>
  );
}
