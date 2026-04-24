"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

function FieldLabel({
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
      {required ? (
        <span className="ml-0.5 font-normal normal-case tracking-normal text-sky-600" aria-hidden>
          *
        </span>
      ) : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-zinc-200/90 bg-white px-3.5 py-3 text-sm text-zinc-900 shadow-[0_1px_0_rgba(0,0,0,0.03)] outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15";

export type ContactFormProps = {
  className?: string;
  variant?: "default" | "embedded";
};

export function ContactForm({
  className,
  variant = "default",
}: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const embedded = variant === "embedded";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          topic,
          message,
        }),
      });
      if (!res.ok) {
        const j = (await res.json()) as { error?: string };
        setError(j.error ?? "Could not send. Try again or email us directly.");
        return;
      }
      form.reset();
      setSent(true);
    } catch {
      setError("Network error. Try again or email info@gtafunding.ca.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.45, ease: easeOut } }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white",
        "shadow-[0_1px_0_rgba(14,165,233,0.12),0_20px_50px_-28px_rgba(15,23,42,0.12)]",
        embedded ? "p-6 sm:p-8" : "p-6 sm:p-8 md:p-9",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600">
            Message us
          </p>
          <h2
            className={cn(
              "mt-2 font-semibold tracking-tight text-zinc-950",
              embedded ? "text-xl sm:text-2xl" : "text-xl sm:text-2xl"
            )}
          >
            Request a call-back
          </h2>
          <p
            className={cn(
              "mt-2 leading-relaxed text-zinc-600",
              embedded ? "text-sm" : "text-sm sm:text-[0.9375rem]"
            )}
          >
            Share a few details — an advisor reviews your file and reaches out with
            options. No credit check to talk.
          </p>
        </motion.div>

        <div className={cn(embedded ? "mt-6 sm:mt-7" : "mt-8")}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                role="status"
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.48, ease: easeOut }}
                className="rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50 to-white px-5 py-8 text-center shadow-[0_12px_40px_-28px_rgba(16,185,129,0.25)] sm:px-8 sm:py-10"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 20,
                    delay: 0.06,
                  }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 ring-4 ring-emerald-50"
                >
                  <CheckCircle2
                    className="h-9 w-9 text-emerald-600"
                    strokeWidth={2}
                    aria-hidden
                  />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: easeOut }}
                  className="mt-5 text-base font-semibold text-emerald-950"
                >
                  You’re on the list
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.4, ease: easeOut }}
                  className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-emerald-900/85"
                >
                  We received your message and will reply shortly. Questions
                  meanwhile?{" "}
                  <a
                    href="mailto:info@gtafunding.ca"
                    className="font-medium text-sky-700 underline-offset-2 hover:underline"
                  >
                    info@gtafunding.ca
                  </a>
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: easeOut }}
              >
                <AnimatePresence>
                  {error ? (
                    <motion.p
                      key={error}
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginTop: 20,
                      }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                      className="overflow-hidden rounded-xl border border-red-200 bg-red-50/90 px-4 py-3.5 text-sm text-red-900"
                      role="alert"
                    >
                      {error}
                    </motion.p>
                  ) : null}
                </AnimatePresence>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <p className="mb-4 text-xs font-medium text-zinc-400">Contact</p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <FieldLabel htmlFor="contact-name" required>
                          Full name
                        </FieldLabel>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          className={inputClass}
                          placeholder="Alex Chen"
                        />
                      </div>
                      <div>
                        <FieldLabel htmlFor="contact-email" required>
                          Business email
                        </FieldLabel>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className={inputClass}
                          placeholder="you@yourbusiness.ca"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-4 text-xs font-medium text-zinc-400">Business</p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <FieldLabel htmlFor="contact-phone">Phone</FieldLabel>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          className={inputClass}
                          placeholder="(416) 555-0142"
                        />
                      </div>
                      <div>
                        <FieldLabel htmlFor="contact-company">Company name</FieldLabel>
                        <input
                          id="contact-company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          className={inputClass}
                          placeholder="Registered business name"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <FieldLabel htmlFor="contact-topic">
                      What are you looking for?
                    </FieldLabel>
                    <div className="relative">
                      <select
                        id="contact-topic"
                        name="topic"
                        className={cn(inputClass, "cursor-pointer appearance-none pr-10")}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Choose a topic
                        </option>
                        <option value="Merchant cash advance">Merchant cash advance</option>
                        <option value="Startup or growth funding">
                          Startup or growth funding
                        </option>
                        <option value="Women entrepreneur programs">
                          Women entrepreneur programs
                        </option>
                        <option value="Refinance or top-up">Refinance or top-up</option>
                        <option value="Something else">Something else</option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                        aria-hidden
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel htmlFor="contact-message" required>
                      Tell us more
                    </FieldLabel>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={embedded ? 4 : 5}
                      className={cn(
                        inputClass,
                        "resize-y min-h-[108px] sm:min-h-[128px]"
                      )}
                      placeholder="Rough amount, industry, how soon you need capital, and any questions."
                    />
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 p-4">
                    <input
                      id="contact-consent"
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-sky-600 focus:ring-2 focus:ring-sky-500/25"
                    />
                    <label
                      htmlFor="contact-consent"
                      className="text-sm leading-relaxed text-zinc-600"
                    >
                      I agree to be contacted by GTA Funding about this inquiry. We
                      use your information only to respond — we never sell contact
                      lists.
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] transition-[background-color,opacity] hover:bg-sky-500 disabled:pointer-events-none disabled:opacity-55 sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          className="h-4 w-4 shrink-0 animate-spin"
                          aria-hidden
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4 opacity-90" aria-hidden />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
