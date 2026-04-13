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

export default function CookiePolicyPage() {
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
          Cookie Policy
        </h1>
        <p className="mt-3 text-sm text-zinc-400 sm:text-base">
          Effective date: <span className="font-medium text-zinc-200">April 13, 2026</span>
        </p>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] sm:p-8">
          <Section title="1. What are cookies?">
            <p>
              Cookies are small text files stored on your device. They help
              websites remember your preferences and understand how the site is
              used.
            </p>
          </Section>

          <Section title="2. How we use cookies">
            <p>We may use cookies and similar technologies to:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Keep the site secure and prevent abuse.</li>
              <li>Remember basic preferences.</li>
              <li>Measure and improve site performance.</li>
            </ul>
          </Section>

          <Section title="3. Types of cookies">
            <p>Cookies we use may include:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <span className="font-medium text-zinc-100">Essential</span>{" "}
                cookies required for the site to function.
              </li>
              <li>
                <span className="font-medium text-zinc-100">Analytics</span>{" "}
                cookies to understand usage and improve performance.
              </li>
            </ul>
          </Section>

          <Section title="4. Managing cookies">
            <p>
              You can control cookies through your browser settings. Note that
              disabling cookies may affect the functionality of the site.
            </p>
          </Section>

          <Section title="5. Contact">
            <p>
              Questions about cookies on this site? Email{" "}
              <a
                href="mailto:hello@gtafunding.ca"
                className="font-medium text-sky-300 underline-offset-2 hover:underline"
              >
                hello@gtafunding.ca
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

