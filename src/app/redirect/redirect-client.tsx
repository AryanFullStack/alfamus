"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../../../supabase/client";
import { Briefcase, ExternalLink, Shield } from "lucide-react";
import Link from "next/link";
import CloudflareTurnstile from "@/components/cloudflare-turnstile";
import AdUnit from "@/components/ad-unit";

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
  const [countdown, setCountdown] = useState(8);
  const [loading, setLoading] = useState(true);
  const [canContinue, setCanContinue] = useState(false);
  const [verified, setVerified] = useState(false);

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
      setCanContinue(true);
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
  const progress = ((8 - countdown) / 8) * circumference;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: "#F8F6F1" }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-[#0F1F3D] flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-[#0D9488]" />
        </div>
        <span className="text-xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
          alfamus<span className="text-[#0D9488]">.com</span>
        </span>
      </Link>

      <div className="bg-white rounded-3xl border border-[#E8E4DC] p-8 max-w-md w-full text-center shadow-xl">
        {/* Real AdSense Ad Unit for Redirect Page */}
        <div className="bg-[#F8F6F1] rounded-xl border border-[#E8E4DC] p-4 mb-8 relative min-h-[120px] flex flex-col items-center justify-center">
          <span className="absolute top-1.5 right-2 text-[10px] text-[#9CA3AF] font-mono uppercase tracking-tighter">Advertisement</span>
          <AdUnit slot="1931348788" />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
            Ready to apply?
          </h1>
          <p className="text-[#6B7280] leading-relaxed text-sm">
            You are applying for <strong className="text-[#0F1F3D] font-bold">{job.title}</strong> at <strong className="text-[#0F1F3D] font-bold">{job.company}</strong>
          </p>
        </div>

        {/* Help ensure it's a real user */}
        <div className="mb-6 flex flex-col items-center">
          <CloudflareTurnstile 
            onVerify={() => setVerified(true)} 
            className="mb-2" 
            theme="light"
          />
          {!verified && (
            <p className="text-[10px] text-[#9CA3AF]">Complete the verification to continue</p>
          )}
        </div>

        {/* Action area */}
        <div className="space-y-4">
          {!canContinue || !verified ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E8E4DC" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none" stroke="#0D9488" strokeWidth="8"
                    strokeLinecap="round" strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#0F1F3D]">
                  {countdown}
                </div>
              </div>
              <p className="text-xs text-[#6B7280]">
                {!verified ? "Please verify you're human..." : "Link is almost ready..."}
              </p>
              <button disabled className="w-full py-4 bg-[#E8E4DC] text-[#9CA3AF] font-bold rounded-2xl cursor-not-allowed transition-all">
                {!verified ? "Waiting for verification..." : "Loading Application..."}
              </button>
            </div>
          ) : (
            <a
              href={job.apply_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#0D9488] text-white font-bold rounded-2xl hover:bg-[#0B7A70] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-teal-900/10 animate-in fade-in zoom-in duration-300"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Continue to Application <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-[#F1F0EC] flex items-center justify-center gap-2 text-[10px] text-[#9CA3AF]">
          <Shield className="w-3 h-3 text-[#0D9488]" />
          <span>Your privacy is protected. We do not track your applications.</span>
        </div>

        <Link href="/jobs" className="block mt-6 text-sm text-[#6B7280] hover:text-[#0F1F3D] transition-colors">
          ← Back to Joob Board
        </Link>
      </div>
    </div>
  );
}
