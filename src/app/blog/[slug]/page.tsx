import { createClient } from "../../../../supabase/server";
import SiteFooter from "@/components/site-footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .is("deleted_at", null)
    .single();

  if (!post) notFound();

  // Related posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, featured_image, category, read_time")
    .eq("is_published", true)
    .is("deleted_at", null)
    .eq("category", post.category)
    .neq("id", post.id)
    .limit(3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      {/* Hero image */}
        <div className="relative h-72 md:h-96 overflow-hidden bg-[#0F1F3D]">
          {post.featured_image && (
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover opacity-60"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F3D] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
            <span className="inline-block px-3 py-1 bg-[#0D9488] text-white text-xs font-semibold rounded-full mb-3">
              {post.category}
            </span>
            <h1
              className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              {post.title}
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#0D9488] mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-8 pb-8 border-b border-[#E8E4DC]">
                <span>By {post.author}</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.read_time} min read
                </div>
                {post.published_at && (
                  <>
                    <span>·</span>
                    <span>{new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </>
                )}
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-[#6B7280] leading-relaxed mb-8 font-medium border-l-4 border-[#0D9488] pl-5">
                  {post.excerpt}
                </p>
              )}

              {/* Content */}
              {post.content ? (
                <div
                  className="prose prose-lg max-w-none text-[#0F1F3D] prose-headings:text-[#0F1F3D] prose-a:text-[#0D9488]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="text-[#6B7280] text-center py-12">
                  <p>Full article content coming soon.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Ad unit */}
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-4 relative">
                <span className="absolute top-2 right-3 text-xs text-[#6B7280] font-mono">Sponsored</span>
                <div className="h-32 bg-[#F8F6F1] rounded-xl flex items-center justify-center text-xs text-[#6B7280]">
                  Advertisement
                </div>
              </div>

              {/* Find Jobs CTA */}
              <div className="bg-[#0F1F3D] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                  Ready to Job Hunt?
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Browse thousands of curated opportunities tailored for you.
                </p>
                <Link
                  href="/jobs"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0D9488] text-white text-sm font-semibold rounded-xl hover:bg-[#0B7A70] transition-all"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Browse Jobs <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#E8E4DC]">
              <h2 className="text-2xl font-bold text-[#0F1F3D] mb-8" style={{ fontFamily: "Syne, sans-serif" }}>
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-36 overflow-hidden bg-[#F8F6F1]">
                      {related.featured_image ? (
                        <Image 
                          src={related.featured_image} 
                          alt={related.title} 
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0F1F3D] to-[#0D9488]" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-[#0F1F3D] group-hover:text-[#0D9488] transition-colors line-clamp-2" style={{ fontFamily: "Fraunces, serif" }}>
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-2">
                        <Clock className="w-3 h-3" /> {related.read_time} min
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      <SiteFooter />
    </div>
  );
}
