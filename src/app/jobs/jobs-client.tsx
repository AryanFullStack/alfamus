"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, MapPin, Filter, X, Building2, ArrowUpRight, DollarSign, Clock } from "lucide-react";
import { createClient } from "../../../supabase/client";
import Image from "next/image";
import JobsHeaderAd from "@/components/jobs-header-ad";
import JobsBeforeListingsAd from "@/components/jobs-before-listings-ad";

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
  featured_image: string | null;
}

const JOB_TYPES = ["All Types", "Full-time", "Remote", "Contract", "Part-time"];
const CATEGORIES = ["All Categories", "Unskilled", "Care giver", "Truck", "Healthcare", "Tech", "Design", "Marketing", "Finance", "Data Science", "Engineering"];
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
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
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
      .select("id, title, company, company_logo, location, job_type, salary_min, salary_max, category, description, source_platform, featured_image")
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

    // Try to order by priority_score first, fallback if column doesn't exist
    let { data, error } = await q
      .order("priority_score", { ascending: true })
      .order("created_at", { ascending: false });

    if (error && error.message.includes("priority_score")) {
      console.warn("Priority score column not found. Please run the SQL migration. Falling back to default sorting.");
      const fallbackResult = await supabase
        .from("jobs")
        .select("id, title, company, company_logo, location, job_type, salary_min, salary_max, category, description, source_platform, featured_image")
        .eq("is_active", true)
        .range(from, to)
        .order("created_at", { ascending: false });
      
      data = fallbackResult.data;
      error = fallbackResult.error;
    }

    if (!error && data) {
      if (reset) {
        // Deduplicate data by ID just in case the server returns duplicates
        const uniqueData = Array.from(new Map(data.map((j) => [j.id, j])).values());
        setJobs(uniqueData);
      } else {
        setJobs((prev) => {
          const allJobs = [...prev, ...data];
          const uniqueJobs = Array.from(new Map(allJobs.map((j) => [j.id, j])).values());
          return uniqueJobs;
        });
      }
      setHasMore(data.length === 12);
      pageRef.current += 1;
    }

    setLoading(false);
    setLoadingMore(false);
  }, [query, location, selectedType, selectedCategory, selectedSalary]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchJobs(true), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
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
      <JobsHeaderAd />
      {/* Header bar */}
      <div className="bg-white border-b border-[#E8E4DC] shadow-sm">
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

      <JobsBeforeListingsAd />

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
              <div key={job.id} className="contents">
                <div
                  className="group bg-white rounded-2xl border border-[#E8E4DC] hover:shadow-xl hover:-translate-y-1 hover:border-[#0D9488]/30 transition-all duration-300 fade-up overflow-hidden flex flex-col"
                  style={{ animationDelay: `${(index % 12) * 40}ms` }}
                >
                  {/* Image Cover */}
                  <div className="relative h-40 w-full bg-[#F8F6F1] overflow-hidden">
                    {job.featured_image ? (
                      <Image 
                        src={job.featured_image} 
                        alt={job.title} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading={index < 3 ? "eager" : "lazy"}
                        priority={index < 3}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0F1F3D]/5 to-[#0D9488]/10" />
                    )}
                    {/* Company Logo Badge */}
                    <div className="absolute -bottom-5 left-5 z-10">
                      {job.company_logo ? (
                        <div className="relative w-12 h-12 rounded-xl border-2 border-white bg-white shadow-sm overflow-hidden">
                          <Image 
                            src={job.company_logo} 
                            alt={job.company} 
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
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
                        <div className="flex items-center gap-1 text-xs text-[#6B7280] font-mono bg-[#F8F6F1] px-2 py-1 rounded-md">
                          <Clock className="w-3 h-3" /> 5 hours ago
                        </div>
                      </div>

                      
                      <a
                        href={`/jobs/${job.id}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-transparent text-[#0F1F3D] border border-[#E8E4DC] text-sm font-semibold rounded-xl group-hover:bg-[#0D9488] group-hover:text-white group-hover:border-[#0D9488] transition-all"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        View Details <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
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
