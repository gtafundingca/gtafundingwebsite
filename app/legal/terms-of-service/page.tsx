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

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-zinc-400 sm:text-base">
          Effective date: <span className="font-medium text-zinc-200">April 13, 2026</span>
        </p>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] sm:p-8">
          <Section title="1. Agreement">
            <p>
              These Terms of Service (“Terms”) govern your access to and use of
              the GTA Funding website and related services. By using the site, you
              agree to these Terms.
            </p>
          </Section>

          <Section title="2. Information only — not financial advice">
            <p>
              Content on this site is provided for informational purposes only and
              does not constitute legal, tax, or financial advice. Funding
              availability, terms, and eligibility may vary.
            </p>
          </Section>

          <Section title="3. Contact submissions">
            <p>
              When you submit information via our contact forms, you represent
              that the information is accurate and that you have the right to
              provide it.
            </p>
          </Section>

          <Section title="4. Acceptable use">
            <p>You agree not to:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Use the site for unlawful, harmful, or fraudulent purposes.</li>
              <li>Attempt to gain unauthorized access to systems or data.</li>
              <li>Interfere with the site’s security or normal operation.</li>
            </ul>
          </Section>

          <Section title="5. Intellectual property">
            <p>
              The site and its content are owned by GTA Funding or its licensors
              and are protected by applicable intellectual property laws.
            </p>
          </Section>

          <Section title="6. Third‑party services">
            <p>
              We may link to third‑party websites or services. We are not
              responsible for third‑party content, policies, or practices.
            </p>
          </Section>

          <Section title="7. Disclaimer of warranties">
            <p>
              The site is provided “as is” and “as available”. We disclaim all
              warranties to the maximum extent permitted by law.
            </p>
          </Section>

          <Section title="8. Limitation of liability">
            <p>
              To the maximum extent permitted by law, GTA Funding will not be
              liable for indirect, incidental, special, consequential, or punitive
              damages, or any loss of profits or revenues.
            </p>
          </Section>

          <Section title="9. Changes">
            <p>
              We may update these Terms from time to time. Continued use of the
              site after changes become effective constitutes acceptance of the
              updated Terms.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              Questions about these Terms? Email{" "}
              <a
                href="mailto:info@gtafunding.ca"
                className="font-medium text-sky-300 underline-offset-2 hover:underline"
              >
                info@gtafunding.ca
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

