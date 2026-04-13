"use client";

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#service", label: "Services" },
  { href: "/#why-choose", label: "Why us" },
  { href: "/#testimonials", label: "Stories" },
  { href: "/#contact", label: "Contact" },
] as const;

const pillLinkClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white";

const mobileLinkClass =
  "flex min-h-12 items-center rounded-xl border border-white/10 bg-white/[0.04] px-4 text-base font-medium text-zinc-200 transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-white active:bg-white/[0.1]";

const solidBarClass =
  "border-b border-white/10 bg-zinc-950/80 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-zinc-950/70";

const heroBarClass =
  "border-b border-white/10 bg-black/35 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-black/25";

function parseHomeHashHref(href: string): string | null {
  const i = href.indexOf("#");
  if (i === -1) return null;
  const id = href.slice(i + 1).trim();
  if (!id) return null;
  const path = i === 0 ? "/" : href.slice(0, i);
  if (path !== "" && path !== "/") return null;
  return decodeURIComponent(id);
}

export function SiteHeader({
  variant = "solid",
}: {
  variant?: "solid" | "hero";
} = {}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [heroBarOpaque, setHeroBarOpaque] = useState(false);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  const onHashNavClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (pathname !== "/") return;
      const id = parseHomeHashHref(href);
      if (!id) return;
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        el.scrollIntoView({
          behavior: reduce ? "instant" : "smooth",
          block: "start",
        });
      }
      window.history.pushState(null, "", `/#${encodeURIComponent(id)}`);
      close();
    },
    [pathname, close]
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (variant !== "hero") return;
    const onScroll = () => setHeroBarOpaque(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const barClass = variant === "hero" && !heroBarOpaque ? heroBarClass : solidBarClass;

  return (
    <header className={`relative sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${barClass}`}>
      <nav
        className="relative mx-auto flex min-h-[3.25rem] w-full max-w-6xl items-center justify-between gap-3 px-4 sm:min-h-16 sm:px-6"
        aria-label="Main"
      >
        <Link
          href="/"
          className="group flex shrink-0 items-center outline-none"
          onClick={close}
        >
          <Image
            src="/logo.png"
            alt="GTA Funding"
            width={170}
            height={56}
            className="h-9 w-auto object-contain transition-opacity group-hover:opacity-90 sm:h-10"
            priority
          />
        </Link>

        {/* Laptop / desktop — centered pill */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 lg:flex">
          <div className="flex items-center rounded-full border border-white/[0.08] bg-black/20 px-1.5 py-1 backdrop-blur-sm">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={pillLinkClass}
                onClick={(e) => onHashNavClick(e, href)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/#apply"
            className="rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-[0_0_20px_-4px_rgba(37,99,235,0.55)] ring-1 ring-white/10 transition-[background-color,box-shadow] hover:bg-blue-500 hover:shadow-[0_0_24px_-4px_rgba(59,130,246,0.65)] sm:px-4 sm:text-sm"
            onClick={(e) => onHashNavClick(e, "/#apply")}
          >
            Apply Now
          </Link>

          {/* Phone + small tablet: menu */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] text-zinc-200 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay + panel */}
      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[3.25rem] z-40 bg-black/55 backdrop-blur-sm sm:top-16 lg:hidden"
            aria-label="Close menu"
            onClick={close}
          />
          <div
            id={panelId}
            className="absolute left-0 right-0 top-full z-50 border-b border-white/10 bg-zinc-950/98 px-4 py-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:px-6 lg:hidden"
            role="navigation"
            aria-label="Mobile sections"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 pb-2">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={mobileLinkClass}
                  onClick={(e) => onHashNavClick(e, href)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/#apply"
                className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-blue-600 text-base font-semibold text-white transition-colors hover:bg-blue-500"
                onClick={(e) => onHashNavClick(e, "/#apply")}
              >
                Apply now
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
