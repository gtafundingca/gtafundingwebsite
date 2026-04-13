"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Trash2, Undo2 } from "lucide-react";

import { cn } from "@/lib/utils";

export function ContactInboxActions({
  id,
  completed,
}: {
  id: string;
  completed: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<"complete" | "delete" | null>(null);

  const completeLabel = useMemo(
    () => (completed ? "Mark uncompleted" : "Mark completed"),
    [completed]
  );

  async function toggleCompleted() {
    setBusy("complete");
    try {
      const res = await fetch(`/api/admin/contacts/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) return;
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function onDelete() {
    const ok = window.confirm("Delete this submission? This cannot be undone.");
    if (!ok) return;
    setBusy("delete");
    try {
      const res = await fetch(`/api/admin/contacts/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) return;
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={toggleCompleted}
        disabled={busy != null}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
          completed
            ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15"
            : "border-white/15 bg-white/[0.03] text-zinc-200 hover:border-white/25 hover:bg-white/[0.06]",
          busy != null && "opacity-60"
        )}
        aria-label={completeLabel}
      >
        {completed ? (
          <>
            <Undo2 className="h-4 w-4 opacity-90" aria-hidden />
            Uncomplete
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4 opacity-90" aria-hidden />
            Complete
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={busy != null}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-red-400/25 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200 transition-colors hover:bg-red-500/15",
          busy != null && "opacity-60"
        )}
        aria-label="Delete submission"
      >
        <Trash2 className="h-4 w-4 opacity-90" aria-hidden />
        Delete
      </button>
    </div>
  );
}

