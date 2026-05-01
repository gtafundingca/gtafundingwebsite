"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-zinc-900 px-3.5 py-3 text-sm text-zinc-100 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] outline-none transition-[border-color,box-shadow] placeholder:text-zinc-500 focus:border-sky-400/70 focus:ring-2 focus:ring-sky-500/20";

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
      className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400"
    >
      {children}
      {required ? <span className="ml-1 text-sky-600">*</span> : null}
    </label>
  );
}

export default function MerchantCashAdvancePage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const businessName = String(fd.get("businessName") ?? "").trim();
    const businessOperatingName = String(fd.get("businessOperatingName") ?? "").trim();
    const streetAddress = String(fd.get("streetAddress") ?? "").trim();
    const streetAddress2 = String(fd.get("streetAddress2") ?? "").trim();
    const city = String(fd.get("city") ?? "").trim();
    const stateProvince = String(fd.get("stateProvince") ?? "").trim();
    const postalCode = String(fd.get("postalCode") ?? "").trim();
    const businessPhone = String(fd.get("businessPhone") ?? "").trim();
    const businessEmail = String(fd.get("businessEmail") ?? "").trim();
    const incorporatedAt = String(fd.get("incorporatedAt") ?? "").trim();
    const businessNumber = String(fd.get("businessNumber") ?? "").trim();
    const businessWebsite = String(fd.get("businessWebsite") ?? "").trim();
    const businessIndustry = String(fd.get("businessIndustry") ?? "").trim();
    const entityType = String(fd.get("entityType") ?? "").trim();
    const employees = String(fd.get("employees") ?? "").trim();
    const propertyType = String(fd.get("propertyType") ?? "").trim();

    const details = [
      `Business Operating Name: ${businessOperatingName || "-"}`,
      `Business Address: ${streetAddress || "-"}${streetAddress2 ? `, ${streetAddress2}` : ""}`,
      `City: ${city || "-"}`,
      `State / Province: ${stateProvince || "-"}`,
      `Postal / Zip Code: ${postalCode || "-"}`,
      `When Incorporated: ${incorporatedAt || "-"}`,
      `Business Number: ${businessNumber || "-"}`,
      `Business Website: ${businessWebsite || "-"}`,
      `Business Industry: ${businessIndustry || "-"}`,
      `Entity Type: ${entityType || "-"}`,
      `Number of Employees: ${employees || "-"}`,
      `Business Property Is: ${propertyType || "-"}`,
    ].join("\n");

    setSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: businessName,
          email: businessEmail,
          phone: businessPhone,
          company: businessOperatingName || businessName,
          monthlyRevenue: "",
          amountNeeded: "",
          fundingUse: `Merchant Cash Advance Application\n\n${details}`,
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
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <SiteHeader variant="solid" />

      <section className="px-4 pb-16 pt-28 sm:px-6 sm:pt-32 md:pt-36">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-8">
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400/90">
              Merchant Cash Advance
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Crown Capital Merchant Cash Advance Application Form
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              We ask that you fill out the application below with complete and
              accurate details.
            </p>
          </div>

          {sent ? (
            <div className="rounded-2xl border border-emerald-300/30 bg-emerald-500/10 p-6 sm:p-8">
              <CheckCircle2 className="h-8 w-8 text-emerald-300" />
              <h2 className="mt-3 text-xl font-semibold text-emerald-100">
                Application received
              </h2>
              <p className="mt-2 text-sm text-emerald-100/90 sm:text-base">
                Thanks for submitting your Merchant Cash Advance application.
                A GTA Funding advisor will review it and contact you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/10 bg-zinc-950 p-6 text-zinc-100 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] sm:p-8"
            >
              {error ? (
                <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                  {error}
                </p>
              ) : null}

              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                Business information
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Please complete the fields below in order.
              </p>

              <div className="mt-6 grid gap-5">
                <div>
                  <FieldLabel htmlFor="mca-business-name" required>
                    Business Name (Number company/Name company)
                  </FieldLabel>
                  <input
                    id="mca-business-name"
                    name="businessName"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="mca-operating-name" required>
                    Business Operating Name
                  </FieldLabel>
                  <input
                    id="mca-operating-name"
                    name="businessOperatingName"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <FieldLabel htmlFor="mca-street-1" required>
                  Business&apos;s Address - Street Address
                </FieldLabel>
                <input
                  id="mca-street-1"
                  name="streetAddress"
                  required
                  className={inputClass}
                />
              </div>

              <div className="mt-5">
                <FieldLabel htmlFor="mca-street-2">
                  Street Address Line 2
                </FieldLabel>
                <input id="mca-street-2" name="streetAddress2" className={inputClass} />
              </div>

              <div className="mt-5 grid gap-5">
                <div>
                  <FieldLabel htmlFor="mca-city" required>
                    City
                  </FieldLabel>
                  <input id="mca-city" name="city" required className={inputClass} />
                </div>
                <div>
                  <FieldLabel htmlFor="mca-state" required>
                    State / Province
                  </FieldLabel>
                  <input
                    id="mca-state"
                    name="stateProvince"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="mca-postal" required>
                    Postal / Zip Code
                  </FieldLabel>
                  <input
                    id="mca-postal"
                    name="postalCode"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-5">
                <div>
                  <FieldLabel htmlFor="mca-phone" required>
                    Business Phone Number
                  </FieldLabel>
                  <input
                    id="mca-phone"
                    name="businessPhone"
                    type="tel"
                    required
                    className={inputClass}
                    placeholder="(000) 000-0000"
                  />
                  <p className="mt-1.5 text-xs text-zinc-400">
                    Please enter a valid phone number. Format: (000) 000-0000.
                  </p>
                </div>
                <div>
                  <FieldLabel htmlFor="mca-email" required>
                    Business Email Address
                  </FieldLabel>
                  <input
                    id="mca-email"
                    name="businessEmail"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="example@example.com"
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-5">
                <div>
                  <FieldLabel htmlFor="mca-incorporated" required>
                    When was your business incorporated?
                  </FieldLabel>
                  <input
                    id="mca-incorporated"
                    name="incorporatedAt"
                    type="date"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="mca-business-number" required>
                    Business Number
                  </FieldLabel>
                  <input
                    id="mca-business-number"
                    name="businessNumber"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-5">
                <div>
                  <FieldLabel htmlFor="mca-website" required>
                    Business Website
                  </FieldLabel>
                  <input
                    id="mca-website"
                    name="businessWebsite"
                    required
                    className={inputClass}
                    placeholder="https://"
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="mca-industry" required>
                    Business Industry
                  </FieldLabel>
                  <input
                    id="mca-industry"
                    name="businessIndustry"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-5">
                <div>
                  <FieldLabel htmlFor="mca-entity-type" required>
                    Entity Type
                  </FieldLabel>
                  <select
                    id="mca-entity-type"
                    name="entityType"
                    required
                    className={cn(inputClass, "cursor-pointer")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <FieldLabel htmlFor="mca-employees" required>
                    Number of Employees
                  </FieldLabel>
                  <input
                    id="mca-employees"
                    name="employees"
                    type="number"
                    min={0}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="mca-property" required>
                    Business Property is
                  </FieldLabel>
                  <select
                    id="mca-property"
                    name="propertyType"
                    required
                    className={cn(inputClass, "cursor-pointer")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Rented">Rented</option>
                    <option value="Owned">Owned</option>
                    <option value="Home-based business">Home-based business</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <Link
                  href="/#service"
                  className="inline-flex min-w-24 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-w-28 items-center justify-center gap-2 rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-500 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
