export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <p className="text-sm font-semibold tracking-tight">GTA Funding</p>

          <div className="flex items-center gap-5 text-sm">
            <a href="#" className="transition-opacity hover:opacity-60">
              Home
            </a>
            <a href="#about" className="transition-opacity hover:opacity-60">
              About us
            </a>
            <a href="#service" className="transition-opacity hover:opacity-60">
              Service
            </a>
            <a
              href="#business-loans"
              className="transition-opacity hover:opacity-60"
            >
              Business Loans
            </a>
            <a href="#contact" className="transition-opacity hover:opacity-60">
              Contact
            </a>
          </div>
        </nav>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pt-20 pb-24">
        <div className="rounded-3xl border border-black/10 bg-[#f5f5f7] px-8 py-14 text-center md:px-14">
          <p className="text-sm font-semibold tracking-wide text-black/60">
            🇨🇦 Canada's Fastest Business Funding
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            Get Funded. No Waiting.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-black/70">
            Access flexible capital in as little as 24 hours. No red tape, no
            hassle - just straightforward funding that grows with your business.
          </p>
        </div>
      </section>
    </main>
  );
}
