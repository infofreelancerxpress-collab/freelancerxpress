import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { Toaster } from "@/components/ui/sonner";
import { TawkToWidget } from "@/components/TawkToWidget";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreelancerXpress - Digital Marketing Agency",
  description:
    "Transform your digital presence with FreelancerXpress. Expert web design, social media marketing, email campaigns, and creative solutions for your business.",
  keywords: [
    "digital marketing",
    "web design",
    "social media marketing",
    "email marketing",
    "graphic design",
    "logo design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster />
        </ThemeProvider>

        {/* Tawk.to Live Chat */}
        <TawkToWidget />
      </body>
    </html>
  );
}
