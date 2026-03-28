import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "alfamus.com — Find Your Dream Job | AI-Powered Job Aggregator",
  description:
    "Discover thousands of curated job listings powered by AI. Tailored for freshers and career switchers. Browse tech, design, marketing, finance jobs and more.",
  keywords: "jobs, job search, career, freshers, remote work, tech jobs, AI jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <TempoInit />
      </body>
    </html>
  );
}
