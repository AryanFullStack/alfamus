import { createClient } from "../../supabase/server";
import SiteNavbar from "@/components/site-navbar";
import HeroSection from "@/components/hero-section";
import AiPicksStrip from "@/components/ai-picks-strip";
import FeaturedJobsGrid from "@/components/featured-jobs-grid";
import AdBanner from "@/components/ad-banner";
import BlogPreviewSection from "@/components/blog-preview-section";
import CategoryExplorer from "@/components/category-explorer";
import SiteFooter from "@/components/site-footer";
import ChatbotWidget from "@/components/chatbot-widget";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [
    { count: totalJobs },
    { data: aiPicks },
    { data: featuredJobs },
    { data: blogPosts },
  ] = await Promise.all([
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase
      .from("jobs")
      .select("id, title, company, company_logo, location, job_type, ai_summary, category")
      .eq("is_ai_pick", true)
      .eq("is_active", true)
      .limit(7),
    supabase
      .from("jobs")
      .select("id, title, company, company_logo, location, job_type, salary_min, salary_max, category")
      .eq("is_featured", true)
      .eq("is_active", true)
      .limit(9),
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
        <AiPicksStrip jobs={aiPicks ?? []} />
        <FeaturedJobsGrid jobs={featuredJobs ?? []} />
        <AdBanner />
        <BlogPreviewSection posts={blogPosts ?? []} />
        <CategoryExplorer />
      </main>
      <SiteFooter />
      <ChatbotWidget />
    </div>
  );
}
