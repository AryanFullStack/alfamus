"use client";

import { useRouter } from "next/navigation";
import { Code2, BarChart2, Palette, TrendingUp, ShieldCheck, PenLine, DollarSign, Cpu, Globe, HeartPulse, GraduationCap, Wrench, Truck, UserPlus } from "lucide-react";

const CATEGORIES = [
  { label: "Unskilled", icon: UserPlus, color: "bg-slate-500", slug: "Unskilled" },
  { label: "Care giver", icon: HeartPulse, color: "bg-rose-500", slug: "Care giver" },
  { label: "Truck", icon: Truck, color: "bg-amber-600", slug: "Truck" },
  { label: "Healthcare", icon: HeartPulse, color: "bg-emerald-500", slug: "Healthcare" },
  { label: "Marketing", icon: TrendingUp, color: "bg-pink-500", slug: "Marketing" },
  { label: "Finance", icon: DollarSign, color: "bg-emerald-500", slug: "Finance" },
  { label: "Data Science", icon: BarChart2, color: "bg-orange-500", slug: "Data Science" },
  { label: "Engineering", icon: Wrench, color: "bg-slate-500", slug: "Engineering" },
  { label: "Tech", icon: Code2, color: "bg-blue-500", slug: "Tech" },
  { label: "Design", icon: Palette, color: "bg-purple-500", slug: "Design" },
];

export default function CategoryExplorer() {
  const router = useRouter();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-[#0D9488] uppercase tracking-widest">
            Browse by field
          </span>
          <h2
            className="text-4xl font-bold text-[#0F1F3D] mt-2"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
          >
            Explore Categories
          </h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(({ label, icon: Icon, color, slug }) => (
            <button
              key={slug}
              onClick={() => router.push(`/jobs?category=${encodeURIComponent(slug)}`)}
              className="group flex flex-col items-center gap-3 p-5 bg-[#F8F6F1] hover:bg-white rounded-2xl border border-transparent hover:border-[#E8E4DC] hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div
                className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span
                className="text-sm font-semibold text-[#0F1F3D] group-hover:text-[#0D9488] transition-colors text-center"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
