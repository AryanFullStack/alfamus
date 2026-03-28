import { createClient } from "../../../supabase/server";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Career Blog | alfamus.com",
  description: "Career tips, interview guides, and job search strategies for job seekers.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, featured_image, category, read_time, published_at, author")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const categories = [...new Set(posts?.map((p) => p.category) ?? [])];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-[#0F1F3D] py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest">Career Insights</span>
            <h1
              className="text-5xl font-bold text-white mt-4 mb-4"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              The alfamus Blog
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Expert career advice, interview guides, and job market insights for modern job seekers.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Category filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <span className="px-4 py-2 bg-[#0F1F3D] text-white text-sm font-semibold rounded-full" style={{ fontFamily: "Syne, sans-serif" }}>
                All
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 bg-white text-[#6B7280] text-sm font-medium rounded-full border border-[#E8E4DC] hover:border-[#0D9488] hover:text-[#0D9488] cursor-pointer transition-all"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Posts grid */}
          {!posts || posts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                No posts yet
              </h3>
              <p className="text-[#6B7280] mt-2">Check back soon for career insights!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden bg-[#F8F6F1]">
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0F1F3D] to-[#0D9488]" />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#0F1F3D] rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2
                      className="text-lg font-bold text-[#0F1F3D] mb-3 group-hover:text-[#0D9488] transition-colors leading-snug line-clamp-2"
                      style={{ fontFamily: "Fraunces, serif" }}
                    >
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-[#6B7280] line-clamp-2 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                        <Clock className="w-3.5 h-3.5" />
                        {post.read_time} min read
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#0D9488] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
