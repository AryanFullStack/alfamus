"use client";

import { useState } from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github, Instagram, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";
import { createClient } from "../../supabase/client";
import CloudflareTurnstile from "./cloudflare-turnstile";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });
    setLoading(false);
    if (dbError && dbError.code !== "23505") {
      setError("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <footer style={{ backgroundColor: "#0F1F3D" }}>
      <div className="container mx-auto px-4 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0D9488] flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
              >
                alfamus<span className="text-[#0D9488]">.com</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              AI-powered job aggregator helping freshers and career switchers find their dream jobs faster.
            </p>

            {/* Newsletter */}
            <div>
              <h4
                className="text-white text-sm font-semibold mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Get weekly job picks
              </h4>
              {submitted ? (
                <p className="text-[#0D9488] text-sm">✓ You're subscribed! Check your inbox.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm outline-none focus:border-[#0D9488] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#0B7A70] transition-all disabled:opacity-50"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3
              className="text-white font-semibold mb-4 text-sm uppercase tracking-widest"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Platform
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Browse Jobs", href: "/jobs" },
                { label: "Blog", href: "/blog" },
                { label: "Career Tools", href: "/career-tools" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-white font-semibold mb-4 text-sm uppercase tracking-widest"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Categories
            </h3>
            <ul className="space-y-3">
              {["Tech Jobs", "Design Jobs", "Marketing", "Finance", "Remote"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/jobs?category=${encodeURIComponent(item)}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-white font-semibold mb-4 text-sm uppercase tracking-widest"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Cookie Policy", href: "/cookies" },
                { label: "Advertise With Us", href: "/advertise" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-white/40 text-sm">
              © {currentYear} alfamus.com. All rights reserved.
            </p>
            <CloudflareTurnstile 
              theme="dark" 
              size="flexible" 
              className="opacity-60 hover:opacity-100 transition-opacity" 
            />
          </div>
          <div className="flex items-center gap-4">
            {[
              { Icon: Twitter, href: "#", label: "Twitter" },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
              { Icon: Github, href: "#", label: "GitHub" },
              { Icon: Instagram, href: "#", label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#0D9488] hover:text-white transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
