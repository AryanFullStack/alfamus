import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { Users, Target, Zap, Globe, Heart, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | alfamus.com — AI-Powered Job Aggregator",
  description:
    "Learn about alfamus.com — our mission, values, and the team behind India's fastest-growing AI-powered job aggregator helping freshers and career switchers find their dream jobs.",
};

const stats = [
  { value: "50,000+", label: "Jobs Listed" },
  { value: "1,20,000+", label: "Job Seekers Helped" },
  { value: "500+", label: "Companies Partnered" },
  { value: "4.8★", label: "User Rating" },
];

const values = [
  {
    Icon: Target,
    title: "Our Mission",
    desc: "To democratize access to career opportunities by connecting talented individuals with the right jobs through the power of AI — regardless of their background, college tier, or work experience.",
  },
  {
    Icon: Zap,
    title: "AI-First Approach",
    desc: "We leverage cutting-edge artificial intelligence to curate, rank, and recommend job listings tailored to each user's skills, location, and career stage — saving hours of manual searching.",
  },
  {
    Icon: Heart,
    title: "Fresher Friendly",
    desc: "alfamus.com was built with freshers and career switchers in mind. We understand the unique challenges of entering the job market and provide resources, tools, and listings tailored to you.",
  },
  {
    Icon: Globe,
    title: "Nationwide Reach",
    desc: "From metros to tier-2 and tier-3 cities, we aggregate opportunities from across India and the globe — including remote, hybrid, and on-site roles — so no opportunity is out of reach.",
  },
  {
    Icon: Users,
    title: "Community Driven",
    desc: "We are built by job seekers, for job seekers. Every feature, filter, and resource on alfamus.com has been shaped by real user feedback and genuine career challenges.",
  },
  {
    Icon: Award,
    title: "Quality Over Quantity",
    desc: "We don't just dump thousands of listings on you. Our AI filters, deduplicates, and scores job postings so you always see the most relevant, verified, and fresh opportunities first.",
  },
];

const team = [
  {
    name: "Priya Sharma",
    role: "Head of Product",
    bio: "Former product manager at a leading Indian startup ecosystem. Priya drives the user experience and product roadmap at alfamus.com with a deep focus on accessibility and simplicity.",
    initials: "PS",
  },
  {
    name: "Rahul Gupta",
    role: "Lead AI Engineer",
    bio: "Machine learning engineer with expertise in NLP and recommendation systems. Rahul architects the AI that powers job matching, smart filters, and career guidance at alfamus.com.",
    initials: "RG",
  },
  {
    name: "Sneha Verma",
    role: "Content & SEO Lead",
    bio: "Career advisor and content strategist. Sneha ensures that every blog post, career guide, and job description on alfamus.com is accurate, helpful, and optimized for discoverability.",
    initials: "SV",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      <div className="pt-16">
        {/* Hero */}
        <div
          className="py-24 relative overflow-hidden"
          style={{ backgroundColor: "#0F1F3D" }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #0D9488 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1E40AF 0%, transparent 40%)",
            }}
          />
          <div className="container mx-auto px-4 text-center relative">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ backgroundColor: "#0D9488", color: "#fff" }}>
              Our Story
            </span>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Empowering Every Career,{" "}
              <span style={{ color: "#0D9488" }}>One Job at a Time</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
              alfamus.com was born out of a simple frustration — job searching
              in India is broken. We built the platform we always wished existed.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border-b border-[#E8E4DC]">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-4xl font-bold mb-1"
                    style={{ color: "#0F1F3D", fontFamily: "Fraunces, serif" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who We Are */}
        <div className="container mx-auto px-4 py-20 max-w-4xl">
          <h2
            className="text-3xl font-bold text-center mb-6"
            style={{ fontFamily: "Fraunces, serif", color: "#0F1F3D" }}
          >
            Who We Are
          </h2>
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 text-gray-700 leading-relaxed space-y-4">
            <p>
              <strong>alfamus.com</strong> is an AI-powered job aggregation platform
              dedicated to making job search easier, faster, and smarter — especially
              for freshers, recent graduates, career switchers, and those re-entering
              the workforce.
            </p>
            <p>
              We were founded in 2024 with a single purpose: to remove the noise from
              the job search process. Traditional job boards overwhelm users with
              outdated listings, duplicates, and irrelevant results. We believe you
              deserve better.
            </p>
            <p>
              Our platform aggregates job listings from hundreds of sources — company
              career pages, job boards, LinkedIn, and more — and uses artificial
              intelligence to deduplicate, rank, and present only the most relevant
              opportunities. You set your skills, experience level, and preferences.
              We handle the rest.
            </p>
            <p>
              Beyond job listings, we provide career tools like resume tips, interview
              preparation guides, salary benchmarks, and an AI-powered career chatbot
              that gives personalized advice — completely free for every user.
            </p>
            <p>
              We are headquartered in India and serve job seekers across the country
              and the Indian diaspora worldwide. We are not a staffing agency or a
              recruitment firm — we are a technology platform that believes access to
              career opportunities should be open, transparent, and free.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="py-20" style={{ backgroundColor: "#0F1F3D" }}>
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl font-bold text-center text-white mb-4"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              What Drives Us
            </h2>
            <p className="text-center text-white/60 mb-14 max-w-xl mx-auto">
              Six core principles guide every decision we make at alfamus.com.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 border border-white/10"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#0D9488" }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3
                    className="text-white font-bold text-lg mb-2"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="container mx-auto px-4 py-20">
          <h2
            className="text-3xl font-bold text-center mb-4"
            style={{ fontFamily: "Fraunces, serif", color: "#0F1F3D" }}
          >
            Meet the Team
          </h2>
          <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
            A small but passionate team dedicated to transforming how India searches for jobs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-[#E8E4DC] p-6 flex gap-5"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                  style={{ backgroundColor: "#0F1F3D", fontFamily: "Fraunces, serif" }}
                >
                  {member.initials}
                </div>
                <div>
                  <h3
                    className="font-bold text-[#0F1F3D] text-lg"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-[#0D9488] text-sm font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 bg-white border-t border-[#E8E4DC]">
          <div className="container mx-auto px-4 text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "Fraunces, serif", color: "#0F1F3D" }}
            >
              Have Questions or Feedback?
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We'd love to hear from you. Whether you're a job seeker, an employer,
              or just curious — reach out to us any time.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#0D9488", fontFamily: "Syne, sans-serif" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
