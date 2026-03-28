import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/theme-provider";
import ChatbotWidget from "@/components/chatbot-widget";

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
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ChatbotWidget />
        </ThemeProvider>
        <TempoInit />
        {/* Cloudflare Turnstile Script - Anti-bot protection */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
        {/* Google AdSense Script - Asynchronous loading for better performance and compliance */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
