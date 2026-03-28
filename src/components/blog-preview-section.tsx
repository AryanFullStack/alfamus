import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  category: string;
  read_time: number | null;
  published_at: string | null;
}

interface BlogPreviewSectionProps {
  posts: BlogPost[];
}

export default function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  return (
    <section className="py-20" style={{ backgroundColor: "#F8F6F1" }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-[#0D9488] uppercase tracking-widest">
              Career Insights
            </span>
            <h2
              className="text-4xl font-bold text-[#0F1F3D] mt-2"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
            >
              Latest from the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#0D9488] hover:gap-3 transition-all"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            All articles <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Featured image */}
              <div className="relative h-48 overflow-hidden bg-[#F8F6F1]">
                {post.featured_image ? (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0F1F3D] to-[#0D9488]" />
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#0F1F3D] rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-lg font-bold text-[#0F1F3D] mb-3 group-hover:text-[#0D9488] transition-colors leading-snug line-clamp-2"
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.read_time} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
