"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, MapPin, Filter, X, Building2, ArrowUpRight, DollarSign, Clock } from "lucide-react";
import { createClient } from "../../../supabase/client";

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
  description: string | null;
  source_platform: string | null;
}

const JOB_TYPES = ["All Types", "Full-time", "Remote", "Contract", "Part-time"];
const CATEGORIES = ["All Categories", "Tech", "Design", "Marketing", "Finance", "Data Science", "Engineering"];
const SALARY_RANGES = [
  { label: "Any", min: 0, max: 0 },
  { label: "$0 – $60k", min: 0, max: 60000 },
  { label: "$60k – $100k", min: 60000, max: 100000 },
  { label: "$100k – $150k", min: 100000, max: 150000 },
  { label: "$150k+", min: 150000, max: 0 },
];

const JOB_TYPE_COLORS: Record<string, string> = {
  "Full-time": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Remote": "bg-blue-50 text-blue-700 border-blue-200",
  "Contract": "bg-amber-50 text-amber-700 border-amber-200",
  "Part-time": "bg-purple-50 text-purple-700 border-purple-200",
};

function formatSalary(min: number | null, max: number | null): string {
  if (!min && !max) return "Competitive";
  const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export default function JobsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All Categories");
  const [selectedSalary, setSelectedSalary] = useState(0);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const pageRef = useRef(0);

  const fetchJobs = useCallback(async (reset = false) => {
    if (reset) {
      setLoading(true);
      pageRef.current = 0;
    } else {
      setLoadingMore(true);
    }

    const from = pageRef.current * 12;
    const to = from + 11;

    let q = supabase
      .from("jobs")
      .select("id, title, company, company_logo, location, job_type, salary_min, salary_max, category, description, source_platform")
      .eq("is_active", true)
      .range(from, to);

    if (query) {
      q = q.or(`title.ilike.%${query}%,company.ilike.%${query}%,category.ilike.%${query}%`);
    }
    if (location) {
      q = q.ilike("location", `%${location}%`);
    }
    if (selectedType !== "All Types") {
      q = q.eq("job_type", selectedType);
    }
    if (selectedCategory !== "All Categories") {
      q = q.ilike("category", `%${selectedCategory}%`);
    }
    const salaryRange = SALARY_RANGES[selectedSalary];
    if (salaryRange.min > 0) {
      q = q.gte("salary_min", salaryRange.min);
    }
    if (salaryRange.max > 0) {
      q = q.lte("salary_max", salaryRange.max);
    }

    const { data, error } = await q;

    if (!error && data) {
      if (reset) {
        setJobs(data);
      } else {
        setJobs((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === 12);
      pageRef.current += 1;
    }

    setLoading(false);
    setLoadingMore(false);
  }, [query, location, selectedType, selectedCategory, selectedSalary]);

  // Debounced search
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchJobs(true), 300);
    return () => clearTimeout(debounceRef.current);
  }, [fetchJobs]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          fetchJobs(false);
        }
      },
      { threshold: 0.1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, fetchJobs]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      {/* Header bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#E8E4DC] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3">
            {/* Search */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#F8F6F1] rounded-xl border border-[#E8E4DC] focus-within:border-[#0D9488] focus-within:ring-2 focus-within:ring-[#0D9488]/20 transition-all">
              <Search className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title, skills, or company..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-[#0F1F3D] placeholder-[#6B7280]"
              />
              {query && (
                <button onClick={() => setQuery("")}>
                  <X className="w-4 h-4 text-[#6B7280] hover:text-[#0F1F3D]" />
                </button>
              )}
            </div>
            {/* Location */}
            <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-[#F8F6F1] rounded-xl border border-[#E8E4DC] focus-within:border-[#0D9488] transition-all min-w-[180px]">
              <MapPin className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
              <input
                type="text"
                placeholder="Location or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-[#0F1F3D] placeholder-[#6B7280]"
              />
            </div>
            {/* Filter toggle */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all ${
                filterOpen
                  ? "bg-[#0F1F3D] text-white border-[#0F1F3D]"
                  : "bg-[#F8F6F1] text-[#0F1F3D] border-[#E8E4DC] hover:border-[#0D9488]"
              }`}
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filter bar */}
          {filterOpen && (
            <div className="mt-3 flex flex-wrap gap-3">
              {/* Job Type */}
              <div className="flex gap-2 flex-wrap">
                {JOB_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                      selectedType === type
                        ? "bg-[#0F1F3D] text-white border-[#0F1F3D]"
                        : "bg-white text-[#6B7280] border-[#E8E4DC] hover:border-[#0D9488] hover:text-[#0D9488]"
                    }`}
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="w-px bg-[#E8E4DC] hidden md:block" />
              {/* Category */}
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                      selectedCategory === cat
                        ? "bg-[#0D9488] text-white border-[#0D9488]"
                        : "bg-white text-[#6B7280] border-[#E8E4DC] hover:border-[#0D9488] hover:text-[#0D9488]"
                    }`}
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-10">
        {/* Result count */}
        {!loading && (
          <p className="text-sm text-[#6B7280] mb-6" style={{ fontFamily: "Syne, sans-serif" }}>
            Showing <strong className="text-[#0F1F3D]">{jobs.length}</strong> results
            {query && ` for "${query}"`}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#E8E4DC] animate-pulse">
                <div className="flex gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl shimmer" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 shimmer rounded w-1/2" />
                    <div className="h-3 shimmer rounded w-1/3" />
                  </div>
                </div>
                <div className="h-5 shimmer rounded mb-3" />
                <div className="h-3 shimmer rounded w-2/3 mb-6" />
                <div className="h-10 shimmer rounded-xl" />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
              No jobs found
            </h3>
            <p className="text-[#6B7280]">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <div
                key={job.id}
                className="group bg-white rounded-2xl border border-[#E8E4DC] p-6 hover:shadow-xl hover:-translate-y-1 hover:border-[#0D9488]/30 transition-all duration-300 fade-up"
                style={{ animationDelay: `${(index % 12) * 40}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {job.company_logo ? (
                      <img src={job.company_logo} alt={job.company} className="w-12 h-12 rounded-xl object-cover border border-[#E8E4DC]" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#F8F6F1] border border-[#E8E4DC] flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-[#6B7280]" />
                      </div>
                    )}
                    <div>
                      <div className="text-xs text-[#6B7280] font-medium">{job.company}</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium font-mono ${JOB_TYPE_COLORS[job.job_type] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                        {job.job_type}
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#0F1F3D] mb-3 group-hover:text-[#0D9488] transition-colors leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                  {job.title}
                </h3>
                {job.description && (
                  <p className="text-xs text-[#6B7280] mb-3 line-clamp-2">{job.description}</p>
                )}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                    <MapPin className="w-3 h-3" />{job.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#6B7280] font-mono">
                    <DollarSign className="w-3 h-3" />{formatSalary(job.salary_min, job.salary_max)}
                  </div>
                </div>
                <a
                  href={`/redirect?job=${job.id}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0F1F3D] text-white text-sm font-semibold rounded-xl hover:bg-[#0D9488] group-hover:bg-[#0D9488] transition-all"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Apply Now <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Infinite scroll observer */}
        <div ref={observerRef} className="h-8 mt-6" />

        {loadingMore && (
          <div className="flex justify-center py-4">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 bg-[#0D9488] rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}

        {!hasMore && jobs.length > 0 && (
          <p className="text-center text-sm text-[#6B7280] py-4">
            You've seen all available listings
          </p>
        )}
      </div>
    </div>
  );
}
