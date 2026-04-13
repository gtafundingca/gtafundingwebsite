import type { Metadata } from "next";

import { AdminBackChrome } from "@/components/admin-back-chrome";

export const metadata: Metadata = {
  title: "Admin | GTA Funding",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminBackChrome />
      {children}
    </>
  );
}
