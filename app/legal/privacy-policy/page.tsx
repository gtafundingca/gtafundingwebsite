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

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-zinc-400 sm:text-base">
          Effective date: <span className="font-medium text-zinc-200">April 13, 2026</span>
        </p>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] sm:p-8">
          <Section title="1. Overview">
            <p>
              This Privacy Policy describes how GTA Funding (“we”, “us”, “our”)
              collects, uses, and protects personal information when you visit our
              website or submit a request for information.
            </p>
          </Section>

          <Section title="2. Information we collect">
            <p>
              When you use the “Message us” contact form, we may collect details
              such as your name, email, phone number, company name, topic of
              interest, and the message you submit.
            </p>
            <p>
              We may also collect basic technical information (for example browser
              type, approximate location, and usage data) to help maintain and
              improve the site.
            </p>
          </Section>

          <Section title="3. How we use your information">
            <p>We use information to:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Respond to inquiries and provide requested information.</li>
              <li>Route requests to the appropriate internal team member.</li>
              <li>Improve our services and website experience.</li>
              <li>Comply with legal obligations and protect against fraud.</li>
            </ul>
          </Section>

          <Section title="4. Sharing and disclosure">
            <p>
              We do not sell your personal information. We may share information
              with service providers that help us operate (for example, email
              delivery providers) and only to the extent necessary to provide the
              service.
            </p>
          </Section>

          <Section title="5. Data retention">
            <p>
              We retain contact submissions for as long as needed to respond,
              follow up, and maintain records, unless a longer retention period is
              required by law.
            </p>
          </Section>

          <Section title="6. Security">
            <p>
              We use reasonable administrative, technical, and physical safeguards
              designed to protect personal information. No method of transmission
              or storage is 100% secure.
            </p>
          </Section>

          <Section title="7. Your choices">
            <p>
              You can request access, correction, or deletion of your personal
              information by contacting{" "}
              <a
                href="mailto:info@gtafunding.ca"
                className="font-medium text-sky-300 underline-offset-2 hover:underline"
              >
                info@gtafunding.ca
              </a>
              .
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              If you have questions about this Privacy Policy, email{" "}
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

