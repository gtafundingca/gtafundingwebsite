"use client";

import { usePathname } from "next/navigation";

import { BackButton } from "@/components/back-button";

/**
 * Fixed back control on admin login (header row is busy on the left).
 * Dashboard uses an in-header BackButton on the page.
 */
export function AdminBackChrome() {
  const pathname = usePathname();
  if (pathname !== "/admin/login") return null;

  return (
    <div className="pointer-events-none fixed right-3 top-3 z-[200] sm:right-4 sm:top-4">
      <div className="pointer-events-auto">
        <BackButton
          href="/"
          label="Back to site"
          variant="dark"
          preferHistory
          className="shadow-lg shadow-black/30 backdrop-blur-sm"
        />
      </div>
    </div>
  );
}
