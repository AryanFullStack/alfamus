import { createClient } from "../../supabase/server";
import SiteNavbar from "@/components/site-navbar";
import HeroSection from "@/components/hero-section";
import AiPicksStrip from "@/components/ai-picks-strip";
import FeaturedJobsGrid from "@/components/featured-jobs-grid";
import AdBanner from "@/components/ad-banner";
import BlogPreviewSection from "@/components/blog-preview-section";
import CategoryExplorer from "@/components/category-explorer";
import SiteFooter from "@/components/site-footer";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [
    { count: totalJobs },
    { data: aiPicks },
    { data: featuredJobs },
    { data: unskilledJobs },
    { data: recentJobs },
    { data: blogPosts },
  ] = await Promise.all([
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase
      .from("jobs")
      .select("id, title, company, company_logo, location, job_type, ai_summary, category, description, featured_image")
      .eq("is_ai_pick", true)
      .eq("is_active", true)
      .limit(7),
    (async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, company, company_logo, location, job_type, salary_min, salary_max, category, description, featured_image")
        .eq("is_featured", true)
        .eq("is_active", true)
        .order("priority_score", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(9);
      
      if (error && error.message.includes("priority_score")) {
        console.warn("Priority score column not found. Falling back to default sorting.");
        const fallback = await supabase
          .from("jobs")
          .select("id, title, company, company_logo, location, job_type, salary_min, salary_max, category, description, featured_image")
          .eq("is_featured", true)
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(9);
        return fallback;
      }
      return { data, error };
    })(),
    supabase
      .from("jobs")
      .select("id, title, company, company_logo, location, job_type, salary_min, salary_max, category, description, featured_image")
      .ilike("category", "%Unskilled%")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("jobs")
      .select("id, title, company, company_logo, location, job_type, salary_min, salary_max, category, description, featured_image")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, featured_image, category, read_time, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3),
  ]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      <main>
        <HeroSection totalJobs={totalJobs ?? 0} />
        <FeaturedJobsGrid jobs={Array.from(new Map((recentJobs || []).map((j: any) => [j.id, j])).values()) as any} title="Fresh Opportunities" subtitle="Recently Added Jobs" />
        <FeaturedJobsGrid jobs={Array.from(new Map((featuredJobs || []).map((j: any) => [j.id, j])).values()) as any} title="Hand-Picked Opportunities" subtitle="Featured Roles" />
        <FeaturedJobsGrid jobs={Array.from(new Map((unskilledJobs || []).map((j: any) => [j.id, j])).values()) as any} title="Unskilled & Entry-Level Roles" subtitle="Start Working Quickly" />
        <AiPicksStrip jobs={Array.from(new Map((aiPicks || []).map((j: any) => [j.id, j])).values()) as any} />
        <AdBanner />
        <BlogPreviewSection posts={blogPosts ?? []} />
        <CategoryExplorer />
      </main>
      <SiteFooter />
    </div>
  );
}
