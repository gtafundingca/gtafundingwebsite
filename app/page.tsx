import Link from "next/link";
import Image from "next/image";
import { ApplyForm } from "@/components/apply-form";
import { ContactForm } from "@/components/contact-form";
import { FadeIn, ScrollReveal } from "@/components/motion-ui";
import { AnimatedStat } from "@/components/ui/animated-stat";
import { ServiceCard } from "@/components/service-card";
import { Marquee } from "@/components/ui/marquee";
import { SiteHeader } from "@/components/site-header";
import { CONTACT_CHANNELS } from "@/lib/contact-channels";
import { Check } from "lucide-react";
const testimonialItems = [
  {
    rating: "5.0",
    quote:
      "As a startup with no credit history, I thought funding was impossible. GTA found us $50K in days. Phenomenal service.",
    name: "Alex Liang",
    role: "E-Commerce Founder, Calgary",
    initials: "AL",
  },
  {
    rating: "4.5",
    quote:
      "As a female founder, I was skeptical. But GTA connected me to a government-backed women's program I never knew existed.",
    name: "Sara Patel",
    role: "Boutique Owner, Vancouver",
    initials: "SP",
  },
  {
    rating: "4.8",
    quote:
      "The team is incredibly fast. Advisor called within an hour of my application, and funds were in my account next morning.",
    name: "Priya Rajan",
    role: "Boutique Owner, Brampton",
    initials: "PR",
  },
  {
    rating: "5.0",
    quote:
      "We needed $80K for new kitchen equipment. GTA gave us 3 lender offers within hours. The process was shockingly smooth.",
    name: "Farhan Nawaz",
    role: "Restaurant Chain, Toronto",
    initials: "FN",
  },
] as const;

function TestimonialBlock({
  item,
}: {
  item: (typeof testimonialItems)[number];
}) {
  return (
    <article className="w-full shrink-0 py-2">
      <p className="text-sm font-semibold text-amber-400">
        ★★★★★ <span className="ml-1 text-zinc-200">{item.rating}</span>
      </p>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">
        {"\u201C"}
        {item.quote}
        {"\u201D"}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
          {item.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{item.name}</p>
          <p className="text-xs text-zinc-500">{item.role}</p>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SiteHeader variant="hero" />
      <section
        id="hero"
        className="relative isolate scroll-mt-24 min-h-[min(100dvh,56rem)] overflow-hidden border-b border-dashed border-white/10 bg-zinc-950 bg-cover bg-no-repeat [background-image:url('/herobg.jpg')] [background-position:58%_center] sm:[background-position:65%_center] md:[background-position:70%_center] lg:[background-position:72%_28%]"
      >
        {/* Readability overlays on top of CSS background */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/82 to-black/35 sm:via-black/75 sm:to-black/25"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/55 sm:to-black/45"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_40%,transparent_20%,rgba(0,0,0,0.45)_75%)]"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[min(100dvh,56rem)] w-full flex-col">
          <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-16 pt-8 text-center sm:px-6 sm:pb-20 sm:pt-10 md:justify-center md:pb-20 md:pt-6 lg:pt-10">
            <FadeIn className="md:flex-1 md:flex md:flex-col md:justify-center">
              <p className="mx-auto inline-flex max-w-[calc(100%-2rem)] items-center justify-center rounded-full border border-white/20 bg-black/35 px-4 py-2 text-sm font-semibold tracking-wide text-zinc-100 shadow-sm backdrop-blur-md sm:max-w-none sm:px-5 sm:py-2.5 sm:text-base">
                Canada&apos;s Fastest Business Funding
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-white drop-shadow-md sm:text-5xl md:text-6xl md:leading-[1.05]">
                Get Funded No Waiting.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-200/90 drop-shadow sm:text-lg">
                Access flexible capital in as little as 24 hours. No red tape, no
                hassle — just straightforward funding that grows with your business.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <a
                  href="#service"
                  className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-colors hover:bg-blue-500"
                >
                  Explore Products
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.14} className="w-full">
              <dl className="mx-auto mt-14 grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-8 border-t border-dashed border-white/20 bg-black/25 py-10 backdrop-blur-[2px] sm:mt-16 sm:grid-cols-4 sm:gap-6 sm:py-12 md:rounded-t-xl md:border md:border-white/10 md:border-b-0 md:px-4 md:pt-10">
                <div>
                  <dt className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    <AnimatedStat
                      end={500}
                      prefix="$"
                      suffix="K"
                      className="text-white"
                    />
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-400">Funded</dd>
                </div>
                <div>
                  <dt className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    <AnimatedStat
                      end={1500}
                      comma
                      suffix="+"
                      className="text-white"
                    />
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-400">Businesses Served</dd>
                </div>
                <div>
                  <dt className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    <AnimatedStat end={50} suffix="+" className="text-white" />
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-400">Lender Network</dd>
                </div>
                <div>
                  <dt className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    <AnimatedStat end={24} suffix=" hrs" className="text-white" />
                  </dt>
                  <dd className="mt-1 text-sm text-zinc-400">Avg. Approval</dd>
                </div>
              </dl>
            </FadeIn>
          </div>
        </div>
      </section>

      <section
        id="service"
        className="scroll-mt-24 border-t border-dashed border-black/15 bg-white px-4 py-16 text-black sm:px-6 sm:py-20 md:py-24"
      >
        <ScrollReveal className="mx-auto max-w-6xl">
          <div className="max-w-3xl text-left">
            <p className="text-sm font-semibold tracking-wide text-blue-600">
              Service
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl md:text-5xl">
              Funding Solutions for Every Business
            </h2>
            <p className="mt-5 max-w-2xl text-zinc-600">
              From day-one startups to scaling enterprises, GTA Funding has a
              funding product that fits your journey.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
            <ServiceCard
              theme="light"
              imageSrc="/Revenue-based%20funding.jpg"
              coverPositionClassName="object-[30%_center]"
              imageAlt="Merchant cash advance funding"
              badge="Merchant Cash Advance"
              step="01"
              title="Revenue-based funding up to $500K"
              overviewTitle="Merchant Cash Advance"
              overviewBody="Get a lump sum upfront and repay as a percentage of daily sales. No fixed payments, no collateral — just flexible funding that moves with your business."
              applyHref="/merchant-cash-advance"
              bullets={[
                "Funding from $5,000 – $500,000",
                "Get funded in 24–48 hours",
                "No collateral required",
                "High approval rates",
              ]}
            />
            <ServiceCard
              theme="light"
              imageSrc="/Women%20Entrepreneur%20Loan.jpg"
              coverPositionClassName="object-[55%_40%]"
              imageAlt="Women entrepreneur business funding"
              badge="Women Entrepreneur Funding"
              step="02"
              title="Women Entrepreneur Loan Government-backed programs for female founders"
              titleClassName="text-xl font-semibold leading-snug tracking-tight text-black"
              overviewTitle="Women Entrepreneur Funding"
              overviewBody="Designed to support women-owned businesses with access to capital, mentorship, and growth opportunities through government-backed programs across Canada."
              bullets={[
                "Lower barrier to entry",
                "Government-backed programs",
                "Flexible repayment options",
                "Mentorship & advisory support",
              ]}
            />
            <ServiceCard
              theme="light"
              className="md:col-span-2 lg:col-span-1"
              imageSrc="/Launch%20your%20vision.jpg"
              coverPositionClassName="object-[70%_center]"
              imageAlt="Business grant advisory service"
              badge="Grant Advisory"
              step="03"
              title="Government grants are free money support"
              overviewTitle="Grant Advisory Service"
              overviewBody="Our grant advisory service provides tailored funding strategies for businesses seeking capital through government programs. Leveraging insights from Government of Canada funding databases, we identify high-probability opportunities and assist in crafting strong, compliant applications."
              bullets={[
                "Targeted grant opportunity mapping",
                "Government program eligibility review",
                "Application strategy and compliance support",
                "End-to-end submission guidance",
              ]}
              bulletsGrid
            />
            <ServiceCard
              theme="light"
              className="md:col-span-2 lg:col-span-1"
              imageSrc="/Launch%20your%20vision.jpg"
              coverPositionClassName="object-[70%_center]"
              imageAlt="Startup business loan"
              badge="Startup Business Loan"
              step="04"
              title="Launch your vision with flexible capital"
              overviewTitle="Startup Funding Solutions"
              overviewBody="Access capital to launch your business, even with limited operational history. We evaluate the potential of your business idea, not just your credit score."
              bullets={[
                "Flexible eligibility criteria",
                "Business plan-based assessments",
                "Mentorship & advisory access",
                "Scalable funding as you grow",
              ]}
              bulletsGrid
            />
          </div>
        </ScrollReveal>
      </section>

      <section
        id="why-choose"
        className="scroll-mt-24 border-t border-dashed border-white/10 bg-black px-4 py-16 text-zinc-100 sm:px-6 sm:py-20 md:py-24"
      >
        <ScrollReveal className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Why Choose GTA Funding
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl md:text-5xl">
              The Smart Way to
              <br />
              Fund Your Growth
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Lightning Fast Approvals",
                body: "No endless paperwork or week-long waits. Our streamlined process means your application is reviewed within hours, and funding hits your account in as little as 24 hours. Built for businesses that can't afford to wait.",
                bullets: [
                  "Decision in hours, not weeks",
                  "Funds deposited within 24hrs",
                  "Minimal documentation required",
                ],
              },
              {
                title: "Access to 50+ Lenders",
                body: "We don't work with a single bank — we shop Canada's largest lender network on your behalf. This means better rates, flexible terms, and offers tailored specifically to your business situation.",
                bullets: [
                  "Curated lender matching",
                  "Best-rate guarantee",
                  "One application, multiple offers",
                ],
              },
              {
                title: "Industry-High Approval Rate",
                body: "Low credit score? Limited history? We evaluate the potential of your business, not just a number. Our 85% approval rate speaks for itself — because we believe every business deserves a shot.",
                bullets: [
                  "Credit scores as low as 500",
                  "Revenue-based evaluation",
                  "85% approval rate",
                ],
              },
              {
                title: "Complete Transparency",
                body: "No hidden fees, no fine print, no surprises. We walk you through every detail of your funding agreement before you sign. What you see is exactly what you get — honest, straightforward funding.",
                bullets: [
                  "Zero hidden charges",
                  "Transparent term sheets",
                  "Dedicated advisor support",
                ],
              },
            ].map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {block.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {block.body}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                  {block.bullets.map((line) => (
                    <li key={line} className="flex gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-blue-400"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section
        id="apply"
        className="scroll-mt-24 border-t border-dashed border-black/15 bg-white px-4 py-16 text-black sm:px-6 sm:py-20 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12">
            <div>
              <div className="max-w-xl text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
                  Apply
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
                  Apply online.
                  <br />
                  Get funded in 24 hours.
                </h2>
              </div>

              <div className="mt-10 space-y-5">
                {[
                  {
                    step: "01",
                    title: "Submit application",
                    body: "Share basic business details in 2 minutes.",
                  },
                  {
                    step: "02",
                    title: "Advisor review",
                    body: "A funding advisor reviews your profile quickly.",
                  },
                  {
                    step: "03",
                    title: "Lender match",
                    body: "We match you with suitable offers from our network.",
                  },
                  {
                    step: "04",
                    title: "Receive funds",
                    body: "Once accepted, funds are sent to your account.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-xl border border-zinc-200/80 bg-zinc-50 px-4 py-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-700">
                      Step {item.step}
                    </p>
                    <h3 className="mt-1 text-base font-semibold tracking-tight text-zinc-950">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-zinc-600">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <ApplyForm />
            </div>
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="scroll-mt-24 border-t border-dashed border-white/10 bg-black px-4 py-16 text-zinc-100 sm:px-6 sm:py-20 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Testimonials
              </p>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-tight text-balance text-white sm:text-4xl sm:leading-[1.02] md:text-5xl">
                We go above and
                <br />
                beyond to fund
                <br />
                your dreams.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-400">
                Our dedication to excellence drives us to truly understand and
                meet the unique funding needs of every Canadian business.
              </p>
              <a
                href="#apply"
                className="mt-8 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                Apply for Funding →
              </a>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-black to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-black to-transparent" />
              <div className="grid gap-6 md:grid-cols-2">
                <Marquee
                  vertical
                  pauseOnHover
                  repeat={3}
                  className="h-[22rem] [--duration:42s] [--gap:1.5rem] md:h-[min(32rem,72vh)]"
                >
                  {testimonialItems.map((item) => (
                    <TestimonialBlock key={item.name} item={item} />
                  ))}
                </Marquee>
                <Marquee
                  vertical
                  reverse
                  pauseOnHover
                  repeat={3}
                  className="h-[22rem] [--duration:48s] [--gap:1.5rem] md:h-[min(32rem,72vh)]"
                >
                  {[...testimonialItems].reverse().map((item) => (
                    <TestimonialBlock key={`${item.name}-rev`} item={item} />
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative scroll-mt-24 border-t border-dashed border-black/10 bg-gradient-to-b from-zinc-50 via-white to-zinc-50/80 px-4 py-16 text-black sm:px-6 sm:py-20 md:py-24"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(56,189,248,0.08),transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-950 sm:text-4xl md:text-[2.35rem] md:leading-[1.12]">
                Speak with a funding advisor
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
                Whether you are comparing products or ready to apply, we will
                match you with an advisor who knows your industry — usually the
                same day.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  "No obligation consult",
                  "Same-day reply",
                  "Canada-wide",
                ].map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-zinc-200/90 bg-white/90 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Direct lines
              </p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {CONTACT_CHANNELS.map((item) => (
                  <li key={item.label}>
                    <div className="group flex gap-4 rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-[0_1px_0_rgba(14,165,233,0.08)] transition-[border-color,box-shadow] hover:border-sky-200 hover:shadow-md sm:p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 transition-colors group-hover:bg-sky-100/80">
                        <item.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-1 block text-base font-semibold text-zinc-950 underline-offset-2 hover:text-sky-700 hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-base font-semibold text-zinc-950">
                            {item.value}
                          </p>
                        )}
                        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                          {item.hint}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <ContactForm variant="embedded" className="lg:sticky lg:top-24" />
          </div>
        </div>
      </section>

      <section
        id="cta"
        className="scroll-mt-24 border-t border-dashed border-white/10 bg-black px-4 py-16 text-white sm:px-6 sm:py-20 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl sm:leading-[1.02] md:text-5xl lg:text-6xl">
              <span className="block sm:inline sm:after:content-['\00a0']">
                Apply in minutes.
              </span>
              <span className="mt-1 block sm:mt-0 sm:inline">
                Get funded in hours.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:mt-8 sm:text-lg">
              Join 1,500+ Canadian businesses who have secured funding through GTA
              Funding. No lengthy paperwork — just a quick application and a
              dedicated advisor to guide you through.
            </p>
            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mx-auto sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              <a
                href="#apply"
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
              >
                Apply Now →
              </a>
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Speak to an Advisor
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-dashed border-white/10 bg-black px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] sm:rounded-[2rem]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(56,189,248,0.22),transparent_55%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_100%,rgba(14,165,233,0.12),transparent_50%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_75%_0%,rgba(125,211,252,0.14),transparent_52%)]"
              aria-hidden
            />

            <div className="relative px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14">
              <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                <div className="max-w-md shrink-0 lg:max-w-sm">
                  <Link href="/" className="group block outline-none">
                    <Image
                      src="/logo.png"
                      alt="GTA Funding"
                      width={320}
                      height={106}
                      className="h-14 w-auto max-w-full object-contain transition-opacity group-hover:opacity-90 sm:h-16 md:h-20"
                      priority
                    />
                    <span className="sr-only">GTA Funding — home</span>
                  </Link>
                  <p className="mt-6 text-sm leading-relaxed text-zinc-500">
                    Canada&apos;s fastest path from application to capital —
                    built for owners who can&apos;t wait weeks for an answer.
                  </p>
                </div>

                <div className="grid min-w-0 flex-1 grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 md:gap-14">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      Navigation
                    </p>
                    <ul className="mt-6 space-y-3.5 text-sm text-zinc-300">
                      {(
                        [
                          ["Home", "/"],
                          ["Services", "#service"],
                          ["Why GTA Funding", "#why-choose"],
                          ["Apply", "#apply"],
                          ["Testimonials", "#testimonials"],
                          ["Contact", "#contact"],
                          ["Admin", "/admin/login"],
                        ] as const
                      ).map(([label, href]) => (
                        <li key={label}>
                          {href.startsWith("/") ? (
                            <Link
                              href={href}
                              className="transition-colors hover:text-sky-300"
                            >
                              {label}
                            </Link>
                          ) : (
                            <a
                              href={href}
                              className="transition-colors hover:text-sky-300"
                            >
                              {label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      Services
                    </p>
                    <ul className="mt-6 space-y-3.5 text-sm text-zinc-300">
                      {(
                        [
                          ["Merchant Cash Advance", "#service"],
                          ["Women Entrepreneur Funding", "#service"],
                          ["Startup Business Loan", "#service"],
                          ["Lender network", "#why-choose"],
                          ["Fast approvals", "#why-choose"],
                        ] as const
                      ).map(([label, href]) => (
                        <li key={label}>
                          <a
                            href={href}
                            className="transition-colors hover:text-sky-300"
                          >
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      Legal
                    </p>
                    <ul className="mt-6 space-y-3.5 text-sm text-zinc-300">
                      {(
                        [
                          ["Privacy Policy", "/legal/privacy-policy"],
                          ["Terms of Service", "/legal/terms-of-service"],
                          ["Cookie Policy", "/legal/cookie-policy"],
                          ["Refund Policy", "/legal/refund-policy"],
                        ] as const
                      ).map(([label, href]) => (
                        <li key={label}>
                          <Link
                            href={href}
                            className="transition-colors hover:text-sky-300"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-5 border-t border-white/[0.08] pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-zinc-600">
                    © {new Date().getFullYear()} GTA Funding. All rights reserved.
                  </p>
                  <a
                    href="https://www.gokulakrishnan.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-zinc-500 transition-colors hover:text-sky-300"
                  >
                    Developed by Gokulakrishnan
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-zinc-500">
                  <a
                    href="mailto:info@gtafunding.ca"
                    className="transition-colors hover:text-sky-300"
                  >
                    info@gtafunding.ca
                  </a>
                  <a
                    href="https://instagram.com/gtafunding"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:border-sky-500/40 hover:bg-sky-500/15 hover:text-sky-300"
                    aria-label="Instagram GTA Funding"
                  >
                    <span className="text-xs font-semibold" aria-hidden>
                      IG
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
