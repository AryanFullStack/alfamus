import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { TrendingUp, Users, Globe, Zap, CheckCircle, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise With Us | alfamus",
  description:
    "Reach thousands of active job seekers, freshers, and career professionals on alfamus. Explore our advertising packages and partnership opportunities.",
};

const stats = [
  { value: "1,20,000+", label: "Monthly Active Users" },
  { value: "50,000+", label: "Job Listings Monthly" },
  { value: "4.5 min", label: "Avg. Time on Site" },
  { value: "65%", label: "Return Visitor Rate" },
];

const audiences = [
  "Fresh graduates and final-year students (18–25 years)",
  "Career switchers and professionals (25–40 years)",
  "Tech, IT, and engineering job seekers",
  "Design, marketing, and finance professionals",
  "Remote work applicants across India",
  "MBA graduates and MBA aspirants",
  "Job seekers in tier-2 and tier-3 Indian cities",
];

const packages = [
  {
    name: "Starter",
    price: "₹5,000 / month",
    usd: "~$60/mo",
    features: [
      "Banner ad placement on job listing pages",
      "500,000+ impressions guaranteed",
      "Weekly performance report",
      "Basic audience targeting",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "₹15,000 / month",
    usd: "~$180/mo",
    features: [
      "Everything in Starter",
      "Homepage sponsored section",
      "Newsletter mention (40,000+ subscribers)",
      "Advanced audience targeting (location, job category)",
      "Dedicated account manager",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    usd: "Talk to us",
    features: [
      "Everything in Growth",
      "Native sponsored job listings",
      "Blog content partnership",
      "Social media shout-outs",
      "Custom integrations & API access",
      "Priority placement & A/B testing",
    ],
    highlight: false,
  },
];

export default function AdvertisePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      <div className="pt-16">
        {/* Hero */}
        <div className="py-24 relative overflow-hidden" style={{ backgroundColor: "#0F1F3D" }}>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #0D9488 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1E40AF 0%, transparent 40%)",
            }}
          />
          <div className="container mx-auto px-4 text-center relative">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ backgroundColor: "#0D9488", color: "#fff" }}
            >
              Advertising
            </span>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Reach India's Most Active{" "}
              <span style={{ color: "#0D9488" }}>Job Seekers</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              alfamus connects you with a highly engaged, career-focused audience of students,
              freshers, and working professionals actively looking for their next opportunity.
            </p>
            <a
              href="mailto:ads@alfamus.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#0D9488", fontFamily: "Syne, sans-serif" }}
            >
              <Mail className="w-5 h-5" /> Get in Touch — ads@alfamus.com
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border-b border-[#E8E4DC]">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl font-bold mb-1" style={{ color: "#0F1F3D", fontFamily: "Fraunces, serif" }}>
                    {s.value}
                  </div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who We Reach */}
        <div className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Fraunces, serif" }}>
                Who Visits alfamus?
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Our audience consists of highly motivated individuals who visit the site with clear
                intent — to improve their careers and find new opportunities. This makes them a
                premium, high-intent audience for relevant brands.
              </p>
              <ul className="space-y-3">
                {audiences.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              {[
                { Icon: Globe, label: "Geographic Reach", val: "Pan-India + Indian Diaspora" },
                { Icon: Users, label: "Primary Age Group", val: "18–35 years (85% of visitors)" },
                { Icon: TrendingUp, label: "Traffic Source", val: "70% organic search (Google)" },
                { Icon: Zap, label: "Device Split", val: "60% mobile · 40% desktop" },
              ].map(({ Icon, label, val }) => (
                <div key={label} className="bg-white rounded-2xl border border-[#E8E4DC] p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#0F1F3D" }}>
                    <Icon className="w-5 h-5 text-[#0D9488]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{label}</div>
                    <div className="font-bold text-[#0F1F3D] text-sm">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ad Options */}
        <div className="py-20" style={{ backgroundColor: "#0F1F3D" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-4" style={{ fontFamily: "Fraunces, serif" }}>
              Advertising Packages
            </h2>
            <p className="text-center text-white/60 mb-14 max-w-xl mx-auto">
              From banner ads to full native integrations, we have a solution for every budget and objective.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-2xl p-7 ${
                    pkg.highlight
                      ? "ring-2 ring-[#0D9488]"
                      : "border border-white/10"
                  }`}
                  style={{
                    backgroundColor: pkg.highlight ? "#0D9488" + "22" : "rgba(255,255,255,0.05)",
                  }}
                >
                  {pkg.highlight && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3" style={{ backgroundColor: "#0D9488" }}>
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                    {pkg.name}
                  </h3>
                  <div className="text-2xl font-bold text-white mb-0.5" style={{ fontFamily: "Fraunces, serif" }}>
                    {pkg.price}
                  </div>
                  <div className="text-white/40 text-xs mb-6">{pkg.usd}</div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:ads@alfamus.com"
                    className="block text-center py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{
                      backgroundColor: pkg.highlight ? "#0D9488" : "rgba(255,255,255,0.15)",
                      color: "#fff",
                      fontFamily: "Syne, sans-serif",
                    }}
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ad Policy */}
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8">
            <h2 className="text-2xl font-bold text-[#0F1F3D] mb-6" style={{ fontFamily: "Fraunces, serif" }}>
              Our Advertising Standards
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              alfamus is committed to maintaining the highest standards of advertising quality.
              We comply strictly with Google AdSense Policies and only accept advertisements that meet
              our editorial standards:
            </p>
            <ul className="space-y-3">
              {[
                "No misleading, deceptive, or false advertising",
                "No adult, illegal, or harmful content",
                "No malware, phishing, or drive-by-download ads",
                "No counterfeit goods or unregulated financial services",
                "No ads that mimic website content or navigation (native deception)",
                "No gambling or illegal substances",
                "All ad placements are clearly labelled as 'Advertisement' or 'Sponsored'",
                "We do NOT engage in click fraud or invalid traffic to inflate ad revenue",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-[#F8F6F1] text-sm text-gray-500">
              All partnerships are subject to our{" "}
              <a href="/terms" className="text-[#0D9488] hover:underline">Terms & Conditions</a> and{" "}
              <a href="/privacy" className="text-[#0D9488] hover:underline">Privacy Policy</a>.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 bg-white border-t border-[#E8E4DC] text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-[#0F1F3D]" style={{ fontFamily: "Fraunces, serif" }}>
              Ready to Advertise?
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Email our advertising team and we'll put together a custom proposal within 24 business hours.
            </p>
            <a
              href="mailto:ads@alfamus.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white hover:opacity-90 transition-all"
              style={{ backgroundColor: "#0D9488", fontFamily: "Syne, sans-serif" }}
            >
              <Mail className="w-5 h-5" /> ads@alfamus.com
            </a>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
