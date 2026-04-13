"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Inbox, LayoutGrid, LogOut, Menu, X } from "lucide-react";

import { adminLogout } from "@/app/admin/actions";
import { BackButton } from "@/components/back-button";

import { cn } from "@/lib/utils";

function NavLink({
  href,
  icon: Icon,
  label,
  badge,
  active,
  onNavigate,
}: {
  href: string;
  icon: typeof LayoutGrid;
  label: string;
  badge?: number;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-[background-color,border-color,color]",
        active
          ? "border-sky-500/35 bg-sky-500/12 text-white shadow-[0_0_24px_-12px_rgba(56,189,248,0.35)]"
          : "border-transparent text-zinc-400 hover:border-white/8 hover:bg-white/[0.04] hover:text-zinc-100"
      )}
    >
      <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
      <span className="min-w-0 flex-1">{label}</span>
      {badge != null && badge > 0 ? (
        <span className="shrink-0 rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-sky-300">
          {badge}
        </span>
      ) : null}
    </a>
  );
}

export function AdminSideNav({ inboxCount }: { inboxCount: number }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<"overview" | "contacts">("overview");

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const overview = document.getElementById("overview");
    const contacts = document.getElementById("contacts");
    if (!overview && !contacts) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target.id;
        if (top === "overview" || top === "contacts") {
          setActive(top);
        }
      },
      { root: null, rootMargin: "-12% 0px -55% 0px", threshold: [0, 0.15, 0.35] }
    );

    if (overview) observer.observe(overview);
    if (contacts) observer.observe(contacts);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const shell = (
    <>
      <div className="border-b border-white/10 px-4 py-5 sm:px-5">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl outline-none ring-sky-400/40 transition-opacity hover:opacity-90 focus-visible:ring-2"
          onClick={closeMobile}
        >
          <Image
            src="/logo.png"
            alt="GTA Funding"
            width={150}
            height={50}
            className="h-9 w-auto shrink-0 object-contain"
            priority
          />
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              Admin
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3 sm:p-4" aria-label="Dashboard">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Navigate
        </p>
        <NavLink
          href="#overview"
          icon={LayoutGrid}
          label="Overview"
          active={active === "overview"}
          onNavigate={closeMobile}
        />
        <NavLink
          href="#contacts"
          icon={Inbox}
          label="Contact inbox"
          badge={inboxCount}
          active={active === "contacts"}
          onNavigate={closeMobile}
        />
      </nav>

      <div className="border-t border-white/10 p-3 sm:p-4">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Exit
        </p>
        <div className="flex flex-col gap-2">
          <BackButton
            href="/"
            label="Back"
            variant="dark"
            preferHistory
            className="!w-full justify-center"
          />
          <Link
            href="/"
            onClick={closeMobile}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
          >
            <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
            View site
          </Link>
          <form action={adminLogout}>
            <button
              type="submit"
              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-red-400/35 hover:bg-red-500/10 hover:text-red-200"
            >
              <LogOut className="h-3.5 w-3.5 opacity-90" aria-hidden />
              Sign out
            </button>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex w-full flex-col lg:h-screen lg:w-64 lg:max-w-[16rem] lg:shrink-0">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-white/10 bg-zinc-950/90 px-3 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/75 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
          aria-expanded={mobileOpen}
          aria-label="Open sidebar menu"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
        <span className="text-sm font-semibold tracking-tight text-white">
          Dashboard
        </span>
      </div>

      {/* Mobile overlay */}
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm lg:hidden"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      ) : null}

      {/* Sidebar: drawer on mobile, column on lg */}
      <aside
        className={cn(
          "fixed left-0 top-14 z-50 flex h-[calc(100dvh-3.5rem)] w-[min(100%,17.5rem)] flex-col border-r border-white/10 bg-zinc-950 shadow-2xl shadow-black/50 transition-transform duration-300 ease-out sm:w-64 lg:static lg:top-auto lg:z-0 lg:h-full lg:min-h-0 lg:flex-1 lg:translate-x-0 lg:shadow-none lg:backdrop-blur-xl supports-[backdrop-filter]:lg:bg-zinc-950/85",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-end border-b border-white/10 px-3 py-2 lg:hidden">
          <button
            type="button"
            onClick={closeMobile}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          {shell}
        </div>
      </aside>
    </div>
  );
}
