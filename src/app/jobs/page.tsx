import { Suspense } from "react";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import ChatbotWidget from "@/components/chatbot-widget";
import JobsPageClient from "./jobs-client";

export const metadata = {
  title: "Browse Jobs | alfamus.com",
  description: "Find your next career opportunity from thousands of curated job listings.",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      <div className="pt-16">
        <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-[#6B7280]">Loading jobs...</div>}>
          <JobsPageClient />
        </Suspense>
      </div>
      <SiteFooter />
      <ChatbotWidget />
    </div>
  );
}
