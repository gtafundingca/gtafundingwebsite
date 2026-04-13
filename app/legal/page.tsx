import Link from "next/link";
import { BackButton } from "@/components/back-button";

const items = [
  {
    title: "Privacy Policy",
    href: "/legal/privacy-policy",
    description:
      "How we collect, use, and protect your personal information when you use our website and services.",
  },
  {
    title: "Terms of Service",
    href: "/legal/terms-of-service",
    description:
      "The rules and conditions that apply when you access our website, apply for funding, or use our services.",
  },
  {
    title: "Cookie Policy",
    href: "/legal/cookie-policy",
    description:
      "Details on cookies and similar technologies we use, and how you can manage your preferences.",
  },
  {
    title: "Refund Policy",
    href: "/legal/refund-policy",
    description:
      "When refunds may apply and how to request them, including timelines and any eligibility requirements.",
  },
] as const;

export default function LegalIndexPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-16 text-zinc-100 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <BackButton href="/" label="Back to home" variant="dark" />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400/90">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Policies & terms
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          These documents explain how GTA Funding operates and how we handle your
          information. If you have questions, contact{" "}
          <a
            href="mailto:hello@gtafunding.ca"
            className="font-medium text-sky-300 underline-offset-2 hover:underline"
          >
            hello@gtafunding.ca
          </a>
          .
        </p>

        <div className="mt-10 grid gap-4 sm:mt-12">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition-[border-color,transform] hover:border-sky-400/25 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold tracking-tight text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>
                <span className="mt-0.5 shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-zinc-300 transition-colors group-hover:border-sky-400/30 group-hover:bg-sky-500/10 group-hover:text-sky-200">
                  View
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

