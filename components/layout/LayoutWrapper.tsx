"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}
      <main className={isDashboard ? "" : "min-h-screen"}>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}
