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
}

interface FeaturedJobsGridProps {
  jobs: Job[];
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

export default function FeaturedJobsGrid({ jobs }: FeaturedJobsGridProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-[#0D9488] uppercase tracking-widest">
              Featured Roles
            </span>
            <h2
              className="text-4xl font-bold text-[#0F1F3D] mt-2"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
            >
              Hand-Picked Opportunities
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
              className="group bg-white rounded-2xl border border-[#E8E4DC] p-6 hover:shadow-xl hover:-translate-y-1 hover:border-[#0D9488]/30 transition-all duration-300"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {job.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E8E4DC]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#F8F6F1] border border-[#E8E4DC] flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-[#6B7280]" />
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-[#6B7280] font-medium">{job.company}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium font-mono ${JOB_TYPE_COLORS[job.job_type] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                      {job.job_type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold text-[#0F1F3D] mb-3 group-hover:text-[#0D9488] transition-colors leading-tight"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {job.title}
              </h3>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 mb-5">
                <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#6B7280] font-mono">
                  <DollarSign className="w-3.5 h-3.5" />
                  {formatSalary(job.salary_min, job.salary_max)}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/redirect?job=${job.id}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F1F3D] text-white text-sm font-semibold rounded-xl hover:bg-[#0D9488] transition-all group-hover:bg-[#0D9488]"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Apply Now <ArrowUpRight className="w-4 h-4" />
              </Link>
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
