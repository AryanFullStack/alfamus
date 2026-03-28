"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Building2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  company_logo: string | null;
  location: string;
  job_type: string;
  ai_summary: string | null;
  category: string;
}

interface AiPicksStripProps {
  jobs: Job[];
}

export default function AiPicksStrip({ jobs }: AiPicksStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16" style={{ backgroundColor: "#F8F6F1" }}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold text-[#0F1F3D]"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
              >
                AI Top Picks Today
              </h2>
              <p className="text-sm text-[#6B7280]">Curated by AI · Refreshed every 60s</p>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#E8E4DC] bg-white flex items-center justify-center hover:border-[#0D9488] hover:text-[#0D9488] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#E8E4DC] bg-white flex items-center justify-center hover:border-[#0D9488] hover:text-[#0D9488] transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable strip */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/redirect?job=${job.id}`}
              className="flex-none w-[280px] bg-white rounded-2xl p-5 border border-[#E8E4DC] hover:border-[#0D9488] hover:shadow-lg transition-all group"
            >
              {/* AI badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 border border-[#6366F1]/20 rounded-full mb-4">
                <Sparkles className="w-3 h-3 text-[#6366F1]" />
                <span className="text-xs font-semibold text-[#6366F1]">AI Pick</span>
              </div>

              {/* Company + logo */}
              <div className="flex items-center gap-3 mb-3">
                {job.company_logo ? (
                  <img
                    src={job.company_logo}
                    alt={job.company}
                    className="w-10 h-10 rounded-lg object-cover border border-[#E8E4DC]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-[#F8F6F1] border border-[#E8E4DC] flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#6B7280]" />
                  </div>
                )}
                <div>
                  <div className="text-xs text-[#6B7280] font-medium">{job.company}</div>
                  <div className="text-sm font-bold text-[#0F1F3D] group-hover:text-[#0D9488] transition-colors" style={{ fontFamily: "Syne, sans-serif" }}>
                    {job.title}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-[#6B7280] mb-3">
                <MapPin className="w-3 h-3" />
                {job.location}
              </div>

              {/* AI summary */}
              {job.ai_summary && (
                <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3">
                  {job.ai_summary}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
