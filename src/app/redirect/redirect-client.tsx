"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../../../supabase/client";
import { Briefcase, ExternalLink, Shield } from "lucide-react";
import Link from "next/link";

export default function RedirectClient() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job");
  const supabase = createClient();

  const [job, setJob] = useState<{
    title: string;
    company: string;
    apply_url: string;
    source_platform: string | null;
  } | null>(null);
  const [countdown, setCountdown] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;
    supabase
      .from("jobs")
      .select("title, company, apply_url, source_platform")
      .eq("id", jobId)
      .single()
      .then(({ data }) => {
        setJob(data);
        setLoading(false);
      });
  }, [jobId]);

  useEffect(() => {
    if (!job) return;
    if (countdown <= 0) {
      window.location.href = job.apply_url;
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, job]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F8F6F1" }}>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-3 h-3 bg-[#0D9488] rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F8F6F1" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>Job not found</h1>
          <Link href="/jobs" className="text-[#0D9488] hover:underline">Back to Jobs</Link>
        </div>
      </div>
    );
  }

  const circumference = 2 * Math.PI * 40;
  const progress = ((5 - countdown) / 5) * circumference;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: "#F8F6F1" }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-lg bg-[#0F1F3D] flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-[#0D9488]" />
        </div>
        <span className="text-xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
          alfamus<span className="text-[#0D9488]">.com</span>
        </span>
      </Link>

      <div className="bg-white rounded-3xl border border-[#E8E4DC] p-10 max-w-md w-full text-center shadow-xl">
        {/* Countdown circle */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="#E8E4DC"
              strokeWidth="6"
            />
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="#0D9488"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
              {countdown}
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
          You're being redirected
        </h1>
        <p className="text-[#6B7280] mb-6 leading-relaxed">
          Taking you to apply for{" "}
          <strong className="text-[#0F1F3D]">{job.title}</strong>{" "}
          at <strong className="text-[#0F1F3D]">{job.company}</strong>
          {job.source_platform && (
            <> via <span className="text-[#0D9488]">{job.source_platform}</span></>
          )}
        </p>

        {/* Ad slot */}
        <div className="bg-[#F8F6F1] rounded-xl border border-[#E8E4DC] p-4 mb-6 relative">
          <span className="absolute top-1.5 right-2 text-xs text-[#6B7280] font-mono">Sponsored</span>
          <div className="h-14 flex items-center justify-center text-xs text-[#6B7280]">
            Advertisement
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-[#6B7280] mb-6">
          <Shield className="w-3.5 h-3.5 text-[#0D9488]" />
          We don't store your data when you apply
        </div>

        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0B7A70] transition-all"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Apply Now <ExternalLink className="w-4 h-4" />
        </a>

        <Link href="/jobs" className="block mt-4 text-sm text-[#6B7280] hover:text-[#0F1F3D] transition-colors">
          ← Back to Jobs
        </Link>
      </div>
    </div>
  );
}
