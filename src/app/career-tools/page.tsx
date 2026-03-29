import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Calculator, FileText, BookOpen, Target, TrendingUp, Briefcase, Clock, Star } from "lucide-react";

export const metadata = {
  title: "Career Tools | alfamus",
  description: "Free career tools for job seekers — resume checker, salary calculator, interview prep guides, and more.",
};

const TOOLS = [
  {
    icon: "📄",
    title: "Resume Checklist",
    description: "Is your resume ATS-ready? Run through our 25-point checklist used by top recruiters at FAANG companies.",
    tag: "Free",
    tagColor: "bg-emerald-100 text-emerald-700",
    cta: "Start Checklist",
    href: "#resume-checklist",
    featured: true,
  },
  {
    icon: "💰",
    title: "Salary Calculator",
    description: "Know your worth. Compare salaries by role, location, and experience level using real market data.",
    tag: "Free",
    tagColor: "bg-emerald-100 text-emerald-700",
    cta: "Calculate Salary",
    href: "#salary-calculator",
    featured: true,
  },
  {
    icon: "🎯",
    title: "Interview Prep Guide",
    description: "100+ behavioral and technical interview questions with STAR-method answer frameworks.",
    tag: "Guide",
    tagColor: "bg-blue-100 text-blue-700",
    cta: "View Guide",
    href: "/blog",
    featured: false,
  },
  {
    icon: "🤝",
    title: "Offer Negotiation Script",
    description: "Word-for-word scripts and email templates to negotiate a higher offer without burning bridges.",
    tag: "Guide",
    tagColor: "bg-blue-100 text-blue-700",
    cta: "Get Script",
    href: "/blog",
    featured: false,
  },
  {
    icon: "📊",
    title: "Job Tracker Template",
    description: "Track your applications, follow-ups, and outcomes with our free Google Sheets template.",
    tag: "Template",
    tagColor: "bg-violet-100 text-violet-700",
    cta: "Get Template",
    href: "#",
    featured: false,
  },
  {
    icon: "🧠",
    title: "AI Career Coach",
    description: "Chat with our AI career advisor for personalized job search advice, resume tips, and interview practice.",
    tag: "AI Powered",
    tagColor: "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700",
    cta: "Chat Now",
    href: "#chatbot",
    featured: true,
  },
];

const RESUME_CHECKLIST = [
  { category: "Format & Design", items: ["1 page for <10 years experience", "Clean, ATS-friendly font (Calibri, Arial, Garamond)", "Consistent spacing and alignment", "No tables, columns, or graphics", "Saved as PDF"] },
  { category: "Contact Section", items: ["Professional email (firstname.lastname@)", "LinkedIn URL included", "Phone number with country code", "City & State (not full address)", "GitHub/Portfolio for tech roles"] },
  { category: "Experience Section", items: ["3-5 bullet points per role", "Start each bullet with an action verb", "Quantified achievements (%, $, #)", "Most recent job first", "Job title matches industry standards"] },
  { category: "Skills & Keywords", items: ["Include keywords from job description", "List hard skills prominently", "Remove outdated or irrelevant skills", "Match required tech stack exactly"] },
];

const SALARY_DATA: Record<string, Record<string, { min: number; max: number; median: number }>> = {
  "Software Engineer": {
    "0-2 years": { min: 75000, max: 120000, median: 95000 },
    "2-5 years": { min: 100000, max: 160000, median: 130000 },
    "5-10 years": { min: 140000, max: 220000, median: 175000 },
    "10+ years": { min: 180000, max: 350000, median: 250000 },
  },
  "Product Designer": {
    "0-2 years": { min: 65000, max: 95000, median: 78000 },
    "2-5 years": { min: 85000, max: 130000, median: 105000 },
    "5-10 years": { min: 120000, max: 180000, median: 148000 },
    "10+ years": { min: 150000, max: 280000, median: 200000 },
  },
  "Data Scientist": {
    "0-2 years": { min: 80000, max: 120000, median: 98000 },
    "2-5 years": { min: 110000, max: 165000, median: 138000 },
    "5-10 years": { min: 150000, max: 230000, median: 185000 },
    "10+ years": { min: 190000, max: 380000, median: 260000 },
  },
  "Marketing Manager": {
    "0-2 years": { min: 50000, max: 75000, median: 62000 },
    "2-5 years": { min: 70000, max: 100000, median: 85000 },
    "5-10 years": { min: 90000, max: 140000, median: 115000 },
    "10+ years": { min: 120000, max: 200000, median: 155000 },
  },
};

export default function CareerToolsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      <div className="pt-16">
        {/* Hero */}
        <div className="bg-[#0F1F3D] py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest" style={{ fontFamily: "Syne, sans-serif" }}>Career Tools</span>
            <h1 className="text-5xl font-bold text-white mt-4 mb-4" style={{ fontFamily: "Fraunces, serif" }}>
              Level Up Your<br />
              <span className="text-[#0D9488]">Job Search</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Free tools, guides, and resources to help you land your dream job faster than ever.
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-[#0F1F3D] mb-8" style={{ fontFamily: "Syne, sans-serif" }}>All Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {TOOLS.map((tool) => (
              <div key={tool.title} className={`bg-white rounded-2xl border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${tool.featured ? "border-[#0D9488]/30" : "border-[#E8E4DC]"}`}>
                {tool.featured && (
                  <div className="flex items-center gap-1 text-xs text-[#0D9488] font-semibold mb-3">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </div>
                )}
                <div className="text-4xl mb-4">{tool.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-lg font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>{tool.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tool.tagColor}`}>{tool.tag}</span>
                </div>
                <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">{tool.description}</p>
                <a
                  href={tool.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F1F3D] text-white text-sm font-semibold rounded-xl hover:bg-[#0D9488] transition-all"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {tool.cta} <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* Resume Checklist */}
          <div id="resume-checklist" className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#0F1F3D] rounded-2xl flex items-center justify-center text-2xl">📄</div>
              <div>
                <h2 className="text-2xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>ATS Resume Checklist</h2>
                <p className="text-[#6B7280] text-sm">25-point checklist to make your resume recruiter-ready</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESUME_CHECKLIST.map(({ category, items }) => (
                <div key={category} className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                  <h3 className="text-base font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>{category}</h3>
                  <ul className="space-y-2.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded border-2 border-[#E8E4DC] flex-shrink-0 mt-0.5 flex items-center justify-center hover:border-[#0D9488] hover:bg-[#0D9488] cursor-pointer transition-all group">
                          <CheckCircle2 className="w-3 h-3 text-transparent group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-sm text-[#6B7280]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Calculator */}
          <div id="salary-calculator" className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#0F1F3D] rounded-2xl flex items-center justify-center text-2xl">💰</div>
              <div>
                <h2 className="text-2xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>Salary Calculator</h2>
                <p className="text-[#6B7280] text-sm">Market salary ranges by role and experience level</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F8F6F1] border-b border-[#E8E4DC]">
                      <th className="px-6 py-4 text-left text-sm font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>Role</th>
                      {["0-2 years", "2-5 years", "5-10 years", "10+ years"].map((exp) => (
                        <th key={exp} className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]" style={{ fontFamily: "Syne, sans-serif" }}>{exp}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(SALARY_DATA).map(([role, data]) => (
                      <tr key={role} className="border-b border-[#F8F6F1] hover:bg-[#F8F6F1] transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>{role}</td>
                        {["0-2 years", "2-5 years", "5-10 years", "10+ years"].map((exp) => {
                          const d = data[exp];
                          return (
                            <td key={exp} className="px-6 py-4">
                              <div className="text-sm font-semibold text-[#0D9488] font-mono">
                                ${(d.median / 1000).toFixed(0)}k
                              </div>
                              <div className="text-xs text-[#6B7280] font-mono">
                                ${(d.min / 1000).toFixed(0)}k – ${(d.max / 1000).toFixed(0)}k
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-[#F8F6F1] border-t border-[#E8E4DC]">
                <p className="text-xs text-[#6B7280]">
                  * Salary ranges are based on US market data. Figures shown are approximate and vary by location, company size, and industry. Data sourced from Glassdoor, Levels.fyi, and LinkedIn Salary Insights.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-[#0F1F3D] to-[#0D3D4D] rounded-3xl p-10 text-center text-white">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "Fraunces, serif" }}>Ready to Find Your Next Role?</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Browse thousands of curated job listings across tech, design, marketing, finance, and more.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/jobs"
                className="px-8 py-3.5 bg-[#0D9488] text-white font-bold rounded-xl hover:bg-[#0B7A70] transition-all text-sm"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Browse All Jobs
              </Link>
              <Link
                href="/blog"
                className="px-8 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-sm"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Read Career Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
