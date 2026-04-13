"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-zinc-200/90 bg-white px-3.5 py-3 text-sm text-zinc-900 shadow-[0_1px_0_rgba(0,0,0,0.03)] outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500"
    >
      {children}
      {required ? <span className="ml-1 text-sky-600">*</span> : null}
    </label>
  );
}

export function ApplyForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    setSending(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          company: String(data.get("company") ?? "").trim(),
          monthlyRevenue: String(data.get("monthlyRevenue") ?? "").trim(),
          amountNeeded: String(data.get("amountNeeded") ?? "").trim(),
          fundingUse: String(data.get("fundingUse") ?? "").trim(),
        }),
      });
      if (!res.ok) {
        const j = (await res.json()) as { error?: string };
        setError(j.error ?? "Could not submit application.");
        return;
      }
      form.reset();
      setSent(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
        <p className="mt-3 text-base font-semibold text-emerald-900">
          Application submitted
        </p>
        <p className="mt-1 text-sm text-emerald-800">
          A funding advisor will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-7">
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          {error}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="apply-name" required>
            Full name
          </Label>
          <input id="apply-name" name="name" required className={inputClass} />
        </div>
        <div>
          <Label htmlFor="apply-email" required>
            Business email
          </Label>
          <input id="apply-email" name="email" type="email" required className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="apply-phone" required>
            Phone
          </Label>
          <input id="apply-phone" name="phone" type="tel" required className={inputClass} />
        </div>
        <div>
          <Label htmlFor="apply-company">Company</Label>
          <input id="apply-company" name="company" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="apply-revenue">Monthly revenue</Label>
          <select id="apply-revenue" name="monthlyRevenue" className={inputClass} defaultValue="">
            <option value="">Select</option>
            <option value="Under $25K">Under $25K</option>
            <option value="$25K - $100K">$25K - $100K</option>
            <option value="$100K - $500K">$100K - $500K</option>
            <option value="$500K+">$500K+</option>
          </select>
        </div>
        <div>
          <Label htmlFor="apply-amount">Amount needed</Label>
          <select id="apply-amount" name="amountNeeded" className={inputClass} defaultValue="">
            <option value="">Select</option>
            <option value="Under $50K">Under $50K</option>
            <option value="$50K - $150K">$50K - $150K</option>
            <option value="$150K - $300K">$150K - $300K</option>
            <option value="$300K - $500K">$300K - $500K</option>
            <option value="$500K+">$500K+</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="apply-use" required>
          What will this funding be used for?
        </Label>
        <textarea
          id="apply-use"
          name="fundingUse"
          required
          rows={4}
          className={cn(inputClass, "resize-y")}
          placeholder="Inventory, payroll, expansion, equipment, cashflow..."
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-500 disabled:opacity-60"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit application
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

