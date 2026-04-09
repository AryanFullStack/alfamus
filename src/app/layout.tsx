import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/theme-provider";
import ChatbotWidget from "@/components/chatbot-widget";
import HeaderAdWrapper from "@/components/header-ad-wrapper";
import GPTHeaderAd from "@/components/gpt-header-ad";
import SiteNavbar from "@/components/site-navbar";


export const metadata: Metadata = {
  title: "alfamus — Find Your Dream Job | AI-Powered Job Aggregator",
  description:
    "Discover thousands of curated job listings powered by AI. Tailored for freshers and career switchers. Browse tech, design, marketing, finance jobs and more.",
  keywords: "jobs, job search, career, freshers, remote work, tech jobs, AI jobs",
};

import { createClient } from "@/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: GA_ID_DATA } = await supabase
    .from("seo_settings")
    .select("value")
    .eq("key", "google_analytics_id")
    .single();
  const GA_ID = GA_ID_DATA?.value || "G-HCXK6J4CG1";

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* AdSense Top Header Ad Unit - Conditional display */}
          {/* Top Header GPT Ad */}
          <GPTHeaderAd />
          
          {/* Navigation Header */}
          <SiteNavbar />

          {/* AdSense Top Header Ad Unit - Conditional display */}
          <HeaderAdWrapper />

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
        {/* Google AdSense Script - Auto ads on every page */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7011484437531877"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics Script */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
