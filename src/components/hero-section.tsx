"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, TrendingUp } from "lucide-react";

const TRENDING_TAGS = [
  "Unskilled Roles",
  "Healthcare",
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
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#0F1F3D" }}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#0D9488] opacity-10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#0D3D4D] opacity-20 blur-[100px]" />
      </div>

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto px-4 py-32 text-center">
        {/* Live counter badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-10 fade-up">
          <div className="w-2 h-2 bg-[#0D9488] rounded-full animate-pulse shadow-[0_0_10px_#0D9488]" />
          <span className="text-white/80 text-xs font-bold tracking-wider uppercase font-mono">
            {count.toLocaleString()} Opportunities Live Now
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight fade-up"
          style={{ fontFamily: "Fraunces, serif", transitionDelay: "100ms" }}
        >
          Your Future, <br />
          <span className="text-[#0D9488] italic relative">
            Redefined
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#0D9488]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
          <br />
          <span className="text-2xl md:text-4xl font-light text-white/60 mt-4 block">
            AI-Powered Career Intelligence
          </span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed fade-up" style={{ transitionDelay: "200ms" }}>
          Skip the noise. Get direct access to high-growth roles, 
          unskilled opportunities, and everything in between.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-3 flex flex-col md:flex-row gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] fade-up focus-within:ring-4 ring-[#0D9488]/20 transition-all duration-500"
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex-[1.2] flex items-center gap-3 px-5 py-3">
            <Search className="w-6 h-6 text-[#0D9488]" />
            <input
              ref={queryRef}
              type="text"
              placeholder="What role are you looking for?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-[#0F1F3D] text-lg placeholder-[#9CA3AF] bg-transparent font-medium"
            />
          </div>
          <div className="hidden md:block w-px h-10 my-auto bg-[#E5E7EB]" />
          <div className="flex-1 flex items-center gap-3 px-5 py-3">
            <MapPin className="w-6 h-6 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Location or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 outline-none text-[#0F1F3D] text-lg placeholder-[#9CA3AF] bg-transparent font-medium"
            />
          </div>
          <button
            type="submit"
            className="px-10 py-4 bg-[#0F1F3D] text-white font-bold rounded-2xl hover:bg-[#1a3a6b] transform hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Find Jobs
          </button>
        </form>

        {/* Trending tags */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-3 fade-up" style={{ transitionDelay: "400ms" }}>
          <div className="flex items-center gap-2 mr-3 text-white/30 text-xs font-bold tracking-widest uppercase">
            <TrendingUp className="w-4 h-4" />
            <span>Popular:</span>
          </div>
          {TRENDING_TAGS.slice(0, 6).map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#0D9488]/50 text-white/60 hover:text-white text-sm font-medium rounded-xl transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
