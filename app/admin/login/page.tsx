"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LayoutDashboard, Lock, Shield, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, password }),
      });
      if (!res.ok) {
        setError(
          "Invalid login ID or password. Check ADMIN_LOGIN_ID and ADMIN_PASSWORD in .env.local."
        );
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputShell =
    "w-full rounded-xl border border-white/[0.08] bg-zinc-950/60 py-3.5 pl-11 pr-4 text-sm text-white shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] outline-none transition-[border-color,box-shadow] placeholder:text-zinc-600 focus:border-sky-500/45 focus:ring-2 focus:ring-sky-500/15";

  return (
    <div className="relative min-h-screen min-h-dvh overflow-x-hidden bg-zinc-950 text-zinc-100">
      {/* Background layers */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_120%,rgba(14,165,233,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_0%,rgba(56,189,248,0.1),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen min-h-dvh flex-col lg:flex-row">
        {/* Brand column */}
        <aside className="flex flex-col justify-between border-b border-white/10 px-4 py-8 min-[400px]:px-6 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:w-[46%] lg:max-w-xl lg:border-b-0 lg:border-r lg:py-14 xl:px-14">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg text-white transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo.png"
                alt="GTA Funding"
                width={170}
                height={56}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            <div className="mt-8 sm:mt-12 md:mt-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300/95 min-[400px]:px-3 min-[400px]:text-[11px] min-[400px]:tracking-[0.18em]">
                <Shield className="h-3 w-3 shrink-0 min-[400px]:h-3.5 min-[400px]:w-3.5" aria-hidden />
                Staff only
              </span>
              <h1 className="mt-4 text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-white min-[400px]:mt-6 min-[400px]:text-3xl sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
                Admin dashboard
              </h1>
              <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-zinc-400 min-[400px]:mt-4 min-[400px]:text-base sm:text-lg">
                Sign in to review contact form submissions and follow up with
                leads from your public site.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-zinc-500 sm:gap-3 sm:text-sm lg:mt-10">
            <LayoutDashboard className="h-3.5 w-3.5 shrink-0 text-zinc-600 sm:h-4 sm:w-4" />
            <span className="inline lg:hidden">Inbox · contact leads</span>
            <span className="hidden lg:inline">
              Inbox · Analytics-ready layout
            </span>
          </div>
        </aside>

        {/* Form column */}
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] min-[400px]:px-5 sm:px-8 sm:py-12 sm:pb-[max(2.5rem,env(safe-area-inset-bottom))] lg:py-12">
          <div className="w-full max-w-[420px]">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-zinc-900/70 shadow-[0_32px_64px_-28px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl sm:rounded-3xl">
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"
                aria-hidden
              />
              <div className="relative px-5 py-7 min-[400px]:px-6 min-[400px]:py-8 sm:px-8 sm:py-10">
                <h2 className="text-base font-semibold tracking-tight text-white min-[400px]:text-lg sm:text-xl">
                  Sign in
                </h2>
                <p className="mt-1 text-pretty text-xs text-zinc-500 min-[400px]:mt-1.5 min-[400px]:text-sm">
                  Use your admin login ID and password
                </p>

                <form className="mt-6 space-y-4 min-[400px]:mt-8 min-[400px]:space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="admin-login-id"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
                    >
                      Login ID
                    </label>
                    <div className="relative">
                      <User
                        className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500"
                        aria-hidden
                      />
                      <input
                        id="admin-login-id"
                        type="text"
                        name="loginId"
                        autoComplete="username"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        className={inputShell}
                        placeholder="e.g. admin"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="admin-password"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500"
                        aria-hidden
                      />
                      <input
                        id="admin-password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputShell}
                        placeholder="Enter password"
                        required
                      />
                    </div>
                  </div>

                  {error ? (
                    <div
                      className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                      role="alert"
                    >
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-sky-600 py-3.5 text-sm font-semibold text-white shadow-[0_0_28px_-6px_rgba(2,132,199,0.55)] transition-[background-color,box-shadow] hover:bg-sky-500 hover:shadow-[0_0_32px_-6px_rgba(14,165,233,0.5)] disabled:opacity-55 sm:min-h-11"
                  >
                    {loading ? (
                      "Signing in…"
                    ) : (
                      <>
                        Continue to dashboard
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-5 text-pretty text-center text-[11px] leading-relaxed text-zinc-600 min-[400px]:mt-6 min-[400px]:text-xs">
                  Sessions are secured with an HTTP-only cookie. Never share
                  credentials.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
