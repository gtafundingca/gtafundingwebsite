"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: reduce ? "instant" : "smooth",
    block: "start",
  });
}

/**
 * After client navigation to `/` with a hash (e.g. from another route), scroll to
 * the target section. Same-page clicks are handled in the header.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const raw = window.location.hash.slice(1);
    if (!raw) return;
    const id = decodeURIComponent(raw);
    if (!id) return;
    const t = window.setTimeout(() => scrollToId(id), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
