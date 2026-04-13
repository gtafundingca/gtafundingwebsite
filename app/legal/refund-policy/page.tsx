import Link from "next/link";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-16 text-zinc-100 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/legal"
          className="text-sm font-medium text-sky-300 underline-offset-2 hover:underline"
        >
          ← Back to Legal
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Refund Policy
        </h1>
        <p className="mt-3 text-sm text-zinc-400 sm:text-base">
          Effective date: <span className="font-medium text-zinc-200">April 13, 2026</span>
        </p>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] sm:p-8">
          <Section title="1. Overview">
            <p>
              GTA Funding primarily provides information and connects businesses
              with funding options. Unless explicitly stated in writing for a
              specific paid service, fees are generally non-refundable.
            </p>
          </Section>

          <Section title="2. When refunds may apply">
            <p>
              If a paid service includes a refund option, the specific terms will
              be communicated at the time of purchase. Refund eligibility may
              depend on the service type, time elapsed, and whether work has
              started.
            </p>
          </Section>

          <Section title="3. How to request a refund">
            <p>
              Email{" "}
              <a
                href="mailto:hello@gtafunding.ca"
                className="font-medium text-sky-300 underline-offset-2 hover:underline"
              >
                hello@gtafunding.ca
              </a>{" "}
              with your name, contact details, and a description of the request.
            </p>
          </Section>

          <Section title="4. Processing time">
            <p>
              If approved, refunds are processed to the original payment method.
              Processing times vary by provider and financial institution.
            </p>
          </Section>

          <Section title="5. Changes">
            <p>
              We may update this Refund Policy from time to time. The latest
              version will always be posted on this page.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

