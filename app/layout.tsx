import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { HashScroll } from "@/components/hash-scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gtafunding.ca"
  ),
  icons: {
    icon: [{ url: "/logo.png" }],
    apple: [{ url: "/logo.png" }],
    shortcut: [{ url: "/logo.png" }],
  },
  title: {
    default: "GTA Funding — Fast Business Funding in Canada",
    template: "%s | GTA Funding",
  },
  description:
    "Get funded fast with flexible capital for Canadian businesses. Merchant cash advance, startup funding, and women entrepreneur programs — advisors and approvals in hours.",
  applicationName: "GTA Funding",
  keywords: [
    "business funding Canada",
    "merchant cash advance",
    "small business loan",
    "GTA",
    "Toronto funding",
  ],
  authors: [{ name: "GTA Funding" }],
  creator: "GTA Funding",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "GTA Funding",
    title: "GTA Funding — Fast Business Funding in Canada",
    description:
      "Flexible capital in as little as 24 hours. No red tape — straightforward funding that grows with your business.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GTA Funding — Fast Business Funding in Canada",
    description:
      "Flexible capital for Canadian businesses. Apply in minutes, get funded in hours.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <HashScroll />
        {children}
      </body>
    </html>
  );
}
