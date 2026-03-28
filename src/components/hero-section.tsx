"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, TrendingUp } from "lucide-react";

const TRENDING_TAGS = [
  "React Developer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "DevOps Engineer",
  "Marketing Manager",
  "Full Stack",
  "Machine Learning",
  "Remote Jobs",
  "Finance Analyst",
  "Content Writer",
  "Cybersecurity",
];

interface HeroSectionProps {
  totalJobs: number;
}

export default function HeroSection({ totalJobs }: HeroSectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [count, setCount] = useState(0);
  const queryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Animate counter
    const target = totalJobs;
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [totalJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/jobs?q=${encodeURIComponent(tag)}`);
  };

  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#0F1F3D" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1F3D] via-[#0F1F3D] to-[#0D3D4D] opacity-90" />

      <div className="relative container mx-auto px-4 py-24 text-center">
        {/* Live counter badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D9488]/20 border border-[#0D9488]/40 rounded-full mb-8">
          <div className="w-2 h-2 bg-[#0D9488] rounded-full animate-pulse" />
          <span className="text-[#0D9488] text-sm font-semibold font-mono">
            {count.toLocaleString()} active listings
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "Fraunces, serif", fontWeight: 700 }}
        >
          Find Your{" "}
          <span className="text-[#0D9488] italic">Dream Job</span>
          <br />
          <span className="text-3xl md:text-5xl font-normal">
            Curated daily by AI
          </span>
        </h1>

        <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover thousands of jobs from top companies worldwide. 
          AI-powered recommendations tailored to freshers and career switchers.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-3xl mx-auto bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-2xl pulse-glow"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <Search className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
            <input
              ref={queryRef}
              type="text"
              placeholder="Job title, skills, or company..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-[#0F1F3D] placeholder-[#6B7280] bg-transparent"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            />
          </div>
          <div className="hidden md:block w-px bg-[#E8E4DC]" />
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <MapPin className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
            <input
              type="text"
              placeholder="City, state, or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 outline-none text-[#0F1F3D] placeholder-[#6B7280] bg-transparent"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0B7A70] transition-all whitespace-nowrap"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Search Jobs
          </button>
        </form>

        {/* Trending tags */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <div className="flex items-center gap-2 mr-2 text-white/50 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Trending:</span>
          </div>
          {TRENDING_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1.5 bg-white/10 hover:bg-[#0D9488]/30 border border-white/20 hover:border-[#0D9488]/50 text-white/80 hover:text-white text-sm rounded-full transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
