"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Sun, Moon, Menu, X, Briefcase } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function SiteNavbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const forceSolid = !isHomePage;
  const isSolid = scrolled || forceSolid;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isSolid
            ? "bg-[#0F1F3D]/95 backdrop-blur-xl border-b border-white/10 shadow-lg py-2"
            : "bg-[#0F1F3D]/30 backdrop-blur-[2px] py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isSolid ? "bg-white/10" : "bg-white/20 backdrop-blur-md"
            }`}>
              <Briefcase className="w-5 h-5 text-[#0D9488]" />
            </div>
            <span
              className="text-2xl font-bold transition-colors duration-300 text-white"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
            >
              alfamus
              <span className="text-[#0D9488]">.com</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Jobs", href: "/jobs" },
              { label: "Blog", href: "/blog" },
              { label: "Career Tools", href: "/career-tools" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  isSolid
                    ? "text-white/80 hover:text-[#0D9488] hover:bg-white/5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/jobs"
              className={`p-2 rounded-lg transition-all duration-300 ${
                isSolid
                  ? "text-white/80 hover:bg-white/5"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isSolid
                    ? "text-white/80 hover:bg-white/5"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}


            <button
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                isSolid
                  ? "text-white/80 hover:bg-white/5"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0F1F3D] pt-16">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-2 overflow-y-auto max-h-screen">
            {[
              { label: "Jobs", href: "/jobs" },
              { label: "Blog", href: "/blog" },
              { label: "Career Tools", href: "/career-tools" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-lg font-semibold text-white/90 hover:text-[#0D9488] hover:bg-white/5 rounded-xl transition-all"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
