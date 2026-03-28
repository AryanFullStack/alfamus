"use client";

import Link from "next/link";
import { MapPin, Clock, DollarSign, Building2, ArrowUpRight } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  company_logo: string | null;
  location: string;
  job_type: string;
  salary_min: number | null;
  salary_max: number | null;
  category: string;
  description?: string | null;
  featured_image?: string | null;
}

interface FeaturedJobsGridProps {
  jobs: Job[];
  title?: string;
  subtitle?: string;
}

const JOB_TYPE_COLORS: Record<string, string> = {
  "Full-time": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Remote": "bg-blue-50 text-blue-700 border-blue-200",
  "Contract": "bg-amber-50 text-amber-700 border-amber-200",
  "Part-time": "bg-purple-50 text-purple-700 border-purple-200",
};

function formatSalary(min: number | null, max: number | null): string {
  if (!min && !max) return "Competitive";
  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export default function FeaturedJobsGrid({ jobs, title = "Hand-Picked Opportunities", subtitle = "Featured Roles" }: FeaturedJobsGridProps) {
  if (jobs.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-[#0D9488] uppercase tracking-widest">
              {subtitle}
            </span>
            <h2
              className="text-4xl font-bold text-[#0F1F3D] mt-2"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
            >
              {title}
            </h2>
          </div>
          <Link
            href="/jobs"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#0D9488] hover:gap-3 transition-all"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            View all jobs <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
              <div
                key={job.id}
                className="group bg-white rounded-2xl border border-[#E8E4DC] hover:shadow-xl hover:-translate-y-1 hover:border-[#0D9488]/30 transition-all duration-300 fade-up overflow-hidden flex flex-col"
                style={{ animationDelay: `${(index % 12) * 40}ms` }}
              >
                {/* Image Cover */}
                <div className="relative h-40 w-full bg-[#F8F6F1] overflow-hidden">
                  {job.featured_image ? (
                    <img src={job.featured_image} alt={job.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0F1F3D]/5 to-[#0D9488]/10" />
                  )}
                  {/* Company Logo Badge */}
                  <div className="absolute -bottom-5 left-5 z-10">
                    {job.company_logo ? (
                      <img src={job.company_logo} alt={job.company} className="w-12 h-12 rounded-xl object-cover border-2 border-white bg-white shadow-sm" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-white border-2 border-white shadow-sm flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-[#6B7280]" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-8 flex-1 flex flex-col relative z-20 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs text-[#6B7280] font-medium">{job.company}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium font-mono ${JOB_TYPE_COLORS[job.job_type] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                      {job.job_type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#0F1F3D] mb-2 group-hover:text-[#0D9488] transition-colors leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                    {job.title}
                  </h3>
                  
                  {job.description && (
                    <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{job.description}</p>
                  )}
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-5">
                      <div className="flex items-center gap-1 text-xs text-[#6B7280] bg-[#F8F6F1] px-2 py-1 rounded-md">
                        <MapPin className="w-3 h-3" />{job.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#6B7280] font-mono bg-[#F8F6F1] px-2 py-1 rounded-md">
                        <DollarSign className="w-3 h-3" />{formatSalary(job.salary_min, job.salary_max)}
                      </div>
                    </div>
                    
                    <Link
                      href={`/jobs/${job.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-transparent border border-[#E8E4DC] text-[#0F1F3D] text-sm font-semibold rounded-xl group-hover:bg-[#0D9488] group-hover:text-white group-hover:border-[#0D9488] transition-all"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      View Details <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0F1F3D] text-[#0F1F3D] font-semibold rounded-xl hover:bg-[#0F1F3D] hover:text-white transition-all"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            View All Jobs <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
