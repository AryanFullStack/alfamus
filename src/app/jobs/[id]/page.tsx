import { createClient } from "../../../../supabase/server";
import { notFound } from "next/navigation";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import { MapPin, Building2, DollarSign, Briefcase, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("jobs").select("title, company").eq("id", id).single();
  
  if (!data) return { title: "Job Not Found | alfamus.com" };
  return {
    title: `${data.title} at ${data.company} | alfamus.com`,
  };
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase.from("jobs").select("*").eq("id", id).single();

  if (!job) {
    notFound();
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "Competitive Salary";
    const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
    if (min && max) return `${fmt(min)} – ${fmt(max)}`;
    if (min) return `From ${fmt(min)}`;
    return `Up to ${fmt(max!)}`;
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/jobs" className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#0D9488] font-medium transition-colors w-fit">
              <span className="text-xl leading-none">&larr;</span> Back to Jobs
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8E4DC] overflow-hidden shadow-sm">
            {/* Header / Cover Image */}
            <div className="relative h-64 md:h-80 w-full bg-[#F8F6F1]">
              {job.featured_image ? (
                <img src={job.featured_image} alt={job.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0F1F3D]/5 to-[#0D9488]/10 flex items-center justify-center">
                  <Briefcase className="w-20 h-20 text-[#0F1F3D] opacity-10" />
                </div>
              )}
              
              {/* Overlay Gradient for Text Readability if there's an image */}
              {job.featured_image && (
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
              )}
              
              {/* Floating Company Logo */}
              <div className="absolute -bottom-10 left-8 md:left-12 z-10">
                {job.company_logo ? (
                   <img src={job.company_logo} alt={job.company} className="w-24 h-24 rounded-2xl object-cover border-4 border-white bg-white shadow-md relative z-20" />
                ) : (
                   <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center relative z-20">
                     <Building2 className="w-10 h-10 text-[#6B7280]" />
                   </div>
                )}
              </div>
            </div>

            <div className="pt-16 pb-12 px-8 md:px-12">
              <div className="flex flex-col lg:flex-row gap-8 justify-between items-start">
                
                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-xl md:text-2xl text-[#6B7280] font-medium">{job.company}</h2>
                    <span className="px-3 py-1 bg-[#0F1F3D]/5 text-[#0F1F3D] text-xs font-bold rounded-full font-mono uppercase tracking-wider">
                      {job.category}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F1F3D] mb-8 leading-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                    {job.title}
                  </h1>

                  <div className="flex flex-wrap gap-4 md:gap-8 mb-8">
                    <div className="flex items-center gap-3 text-[#0F1F3D] font-medium">
                      <div className="w-12 h-12 rounded-full bg-[#F8F6F1] flex items-center justify-center border border-[#E8E4DC]">
                        <MapPin className="w-5 h-5 text-[#0D9488]" />
                      </div>
                      {job.location}
                    </div>
                    <div className="flex items-center gap-3 text-[#0F1F3D] font-medium">
                      <div className="w-12 h-12 rounded-full bg-[#F8F6F1] flex items-center justify-center border border-[#E8E4DC]">
                        <Briefcase className="w-5 h-5 text-[#0D9488]" />
                      </div>
                      {job.job_type}
                    </div>
                    <div className="flex items-center gap-3 text-[#0F1F3D] font-medium">
                      <div className="w-12 h-12 rounded-full bg-[#F8F6F1] flex items-center justify-center border border-[#E8E4DC]">
                        <DollarSign className="w-5 h-5 text-[#0D9488]" />
                      </div>
                      {formatSalary(job.salary_min, job.salary_max)}
                    </div>
                  </div>
                </div>

                {/* Apply Box */}
                <div className="w-full lg:w-[320px] bg-[#F8F6F1] rounded-2xl p-6 border border-[#E8E4DC] flex-shrink-0 sticky top-24">
                  <p className="text-sm text-[#6B7280] mb-4 text-center font-medium">
                    Posted {formatDistanceToNow(new Date(job.created_at))} ago
                  </p>
                  <a
                    href={`/redirect?job=${job.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0F1F3D] text-white text-base font-bold rounded-xl hover:bg-[#0D9488] hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl shadow-[#0D9488]/20"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    Apply Now <ExternalLink className="w-5 h-5" />
                  </a>
                  {job.source_platform && (
                    <p className="text-xs text-center text-[#6B7280] mt-4 font-medium uppercase tracking-wider">
                      Source: {job.source_platform}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full h-px bg-[#E8E4DC] my-10" />

              {/* Description */}
              <div className="max-w-3xl">
                <h3 className="text-2xl font-bold text-[#0F1F3D] mb-6" style={{ fontFamily: "Syne, sans-serif" }}>About the role</h3>
                
                {job.ai_summary && (
                  <div className="bg-gradient-to-r from-[#0D9488]/10 to-[#0F1F3D]/5 p-6 rounded-2xl border border-[#0D9488]/20 mb-8 mt-4 relative">
                    <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-full border border-[#0D9488]/20 text-xs font-bold text-[#0D9488] shadow-sm flex items-center gap-1">
                      ✨ AI Summary
                    </div>
                    <p className="text-[#0F1F3D] leading-relaxed pt-2">
                      {job.ai_summary}
                    </p>
                  </div>
                )}

                <div className="prose prose-lg prose-[#0F1F3D] max-w-none whitespace-pre-wrap mt-6">
                  {job.description || "No description provided."}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
