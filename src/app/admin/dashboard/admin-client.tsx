"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import {
  Briefcase, FileText, BarChart2, Settings, LogOut, Plus, CheckCircle2, XCircle,
  Users, Eye, Edit, Trash2, Save, X, Bot, Megaphone, Search, ExternalLink,
  Globe, RefreshCw, Monitor, TrendingUp
} from "lucide-react";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";

interface Stats {
  totalJobs: number;
  totalPosts: number;
  totalSubscribers: number;
}

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
  apply_url: string;
  source_platform: string | null;
  is_featured: boolean;
  is_ai_pick: boolean;
  ai_summary: string | null;
  is_active: boolean;
  created_at: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category: string;
  author: string;
  read_time: number;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

interface Props {
  user: User;
  stats: Stats;
  recentJobs: Job[];
  recentPosts: Post[];
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: BarChart2 },
  { id: "jobs", label: "Jobs Manager", icon: Briefcase },
  { id: "blog", label: "Blog Editor", icon: FileText },
  { id: "ads", label: "Ads Manager", icon: Megaphone },
  { id: "chatbot", label: "Chatbot Settings", icon: Bot },
  { id: "seo", label: "SEO Settings", icon: Globe },
  { id: "settings", label: "Site Settings", icon: Settings },
];

const JOB_TYPES = ["Full-time", "Remote", "Contract", "Part-time", "Internship"];
const CATEGORIES = ["Tech", "Design", "Marketing", "Finance", "Data Science", "Engineering", "HR", "Sales", "Operations"];

const EMPTY_JOB: Partial<Job> = {
  title: "", company: "", company_logo: "", location: "", job_type: "Full-time",
  salary_min: null, salary_max: null, category: "Tech", description: "",
  apply_url: "", source_platform: "", is_featured: false, is_ai_pick: false,
  ai_summary: "", is_active: true,
};

const EMPTY_POST: Partial<Post> = {
  title: "", slug: "", excerpt: "", content: "", featured_image: "", category: "Career",
  author: "alfamus", read_time: 5, meta_title: "", meta_description: "", is_published: false,
};

export default function AdminDashboardClient({ user, stats: initialStats, recentJobs: initialJobs, recentPosts: initialPosts }: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();
  const supabase = createClient();

  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [jobForm, setJobForm] = useState<Partial<Job>>(EMPTY_JOB);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobSearch, setJobSearch] = useState("");
  const [jobsLoading, setJobsLoading] = useState(false);

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [postForm, setPostForm] = useState<Partial<Post>>(EMPTY_POST);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);

  const [stats, setStats] = useState(initialStats);
  const [seoSaving, setSeoSaving] = useState(false);
  const [seoSettings, setSeoSettings] = useState<Record<string, string>>({
    site_title: "alfamus.com — Find Your Dream Job",
    meta_description: "AI-powered job aggregator for freshers and career switchers.",
    og_image: "",
    google_analytics_id: "",
    google_search_console: "",
  });

  const [chatbotProfiles, setChatbotProfiles] = useState([
    { id: "career-coach", name: "Career Coach", prompt: "", model: "gpt-4o-mini", active: true },
    { id: "tech-expert", name: "Tech Expert", prompt: "", model: "gpt-4o-mini", active: true },
    { id: "fresher-guide", name: "Fresher Guide", prompt: "", model: "gpt-4o-mini", active: true },
  ]);

  const [adUnits, setAdUnits] = useState([
    { id: "header", name: "Header Banner", slot: "header", code: "", active: true },
    { id: "inline", name: "Inline (Jobs/Blog)", slot: "inline", code: "", active: true },
    { id: "sidebar", name: "Sidebar", slot: "sidebar", code: "", active: true },
    { id: "redirect", name: "Redirect Page", slot: "redirect", code: "", active: true },
  ]);

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  const loadJobs = async () => {
    setJobsLoading(true);
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false }).limit(50);
    if (data) setJobs(data);
    setJobsLoading(false);
  };

  const saveJob = async () => {
    if (!jobForm.title || !jobForm.company || !jobForm.apply_url || !jobForm.location) {
      showToast("Please fill required fields (Title, Company, Location, Apply URL)", "error");
      return;
    }
    const payload = { ...jobForm };
    delete (payload as any).id;
    delete (payload as any).created_at;
    delete (payload as any).updated_at;

    if (editingJobId) {
      const { error } = await supabase.from("jobs").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", editingJobId);
      if (error) { showToast("Error updating job", "error"); return; }
      showToast("Job updated successfully!");
    } else {
      const { error } = await supabase.from("jobs").insert(payload);
      if (error) { showToast("Error creating job", "error"); return; }
      showToast("Job created successfully!");
      setStats((s) => ({ ...s, totalJobs: s.totalJobs + 1 }));
    }
    setShowJobForm(false);
    setJobForm(EMPTY_JOB);
    setEditingJobId(null);
    loadJobs();
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Delete this job listing?")) return;
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) { showToast("Error deleting job", "error"); return; }
    showToast("Job deleted");
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setStats((s) => ({ ...s, totalJobs: Math.max(0, s.totalJobs - 1) }));
  };

  const toggleJobActive = async (id: string, current: boolean) => {
    await supabase.from("jobs").update({ is_active: !current }).eq("id", id);
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, is_active: !current } : j));
  };

  const editJob = (job: Job) => {
    setJobForm(job);
    setEditingJobId(job.id);
    setShowJobForm(true);
  };

  const loadPosts = async () => {
    setPostsLoading(true);
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).limit(50);
    if (data) setPosts(data);
    setPostsLoading(false);
  };

  const savePost = async () => {
    if (!postForm.title || !postForm.slug) {
      showToast("Please fill required fields (Title, Slug)", "error");
      return;
    }
    const payload = { ...postForm };
    delete (payload as any).id;
    delete (payload as any).created_at;
    delete (payload as any).updated_at;
    if (payload.is_published && !payload.published_at) {
      payload.published_at = new Date().toISOString();
    }

    if (editingPostId) {
      const { error } = await supabase.from("blog_posts").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", editingPostId);
      if (error) { showToast("Error updating post: " + error.message, "error"); return; }
      showToast("Post updated successfully!");
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) { showToast("Error creating post: " + error.message, "error"); return; }
      showToast("Post created successfully!");
      setStats((s) => ({ ...s, totalPosts: s.totalPosts + 1 }));
    }
    setShowPostForm(false);
    setPostForm(EMPTY_POST);
    setEditingPostId(null);
    loadPosts();
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) { showToast("Error deleting post", "error"); return; }
    showToast("Post deleted");
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setStats((s) => ({ ...s, totalPosts: Math.max(0, s.totalPosts - 1) }));
  };

  const editPost = (post: Post) => {
    setPostForm(post);
    setEditingPostId(post.id);
    setShowPostForm(true);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

  const filteredJobs = jobs.filter((j) =>
    !jobSearch || j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.company.toLowerCase().includes(jobSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F8F6F1" }}>
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-xl transition-all ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-[#0F1F3D] flex flex-col min-h-screen fixed left-0 top-0 bottom-0 z-40">
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0D9488] flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
              alfamus <span className="text-[#0D9488]">admin</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setShowJobForm(false); setShowPostForm(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all text-left ${
                activeTab === id ? "bg-[#0D9488] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#0D9488] flex items-center justify-center text-white text-sm font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div>
              <div className="text-white text-xs font-semibold truncate max-w-[130px]">{user.email}</div>
              <div className="text-white/40 text-xs">Admin</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8 min-h-screen">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <h1 className="text-3xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>Dashboard</h1>
            <p className="text-[#6B7280] mb-8">Welcome back, {user.email?.split("@")[0]}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { label: "Total Jobs", value: stats.totalJobs, icon: Briefcase, color: "bg-blue-500", tab: "jobs" },
                { label: "Blog Posts", value: stats.totalPosts, icon: FileText, color: "bg-emerald-500", tab: "blog" },
                { label: "Subscribers", value: stats.totalSubscribers, icon: Users, color: "bg-violet-500", tab: "settings" },
              ].map(({ label, value, icon: Icon, color, tab }) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(tab)}
                  className="bg-white rounded-2xl p-6 border border-[#E8E4DC] text-left hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-[#6B7280] font-medium" style={{ fontFamily: "Syne, sans-serif" }}>{label}</span>
                    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>{value.toLocaleString()}</div>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>Recent Jobs</h2>
                  <button onClick={() => setActiveTab("jobs")} className="text-sm text-[#0D9488] hover:underline">View all →</button>
                </div>
                <div className="space-y-2">
                  {jobs.slice(0, 6).map((job) => (
                    <div key={job.id} className="flex items-center justify-between py-2 border-b border-[#F8F6F1] last:border-0">
                      <div>
                        <div className="text-sm font-semibold text-[#0F1F3D]">{job.title}</div>
                        <div className="text-xs text-[#6B7280]">{job.company} · {job.category}</div>
                      </div>
                      {job.is_active ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                          <XCircle className="w-3 h-3" /> Inactive
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>Recent Posts</h2>
                  <button onClick={() => setActiveTab("blog")} className="text-sm text-[#0D9488] hover:underline">View all →</button>
                </div>
                <div className="space-y-2">
                  {posts.slice(0, 6).map((post) => (
                    <div key={post.id} className="flex items-center justify-between py-2 border-b border-[#F8F6F1] last:border-0">
                      <div className="min-w-0 flex-1 mr-3">
                        <div className="text-sm font-semibold text-[#0F1F3D] truncate">{post.title}</div>
                        <div className="text-xs text-[#6B7280]">{post.category} · {post.read_time} min</div>
                      </div>
                      {post.is_published ? (
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex-shrink-0">Published</span>
                      ) : (
                        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full flex-shrink-0">Draft</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#0F1F3D] to-[#0D3D4D] rounded-2xl p-6 text-white">
              <h2 className="text-base font-bold mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Quick Actions</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Add Job", icon: Briefcase, action: () => { setActiveTab("jobs"); setShowJobForm(true); setJobForm(EMPTY_JOB); setEditingJobId(null); } },
                  { label: "Write Post", icon: FileText, action: () => { setActiveTab("blog"); setShowPostForm(true); setPostForm(EMPTY_POST); setEditingPostId(null); } },
                  { label: "View Site", icon: Monitor, action: () => window.open("/", "_blank") },
                  { label: "Browse Jobs", icon: ExternalLink, action: () => window.open("/jobs", "_blank") },
                ].map(({ label, icon: Icon, action }) => (
                  <button key={label} onClick={action} className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-all" style={{ fontFamily: "Syne, sans-serif" }}>
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* JOBS MANAGER */}
        {activeTab === "jobs" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>Jobs Manager</h1>
                <p className="text-[#6B7280] text-sm mt-1">{jobs.length} listings</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={loadJobs} className="p-2.5 bg-white border border-[#E8E4DC] rounded-xl text-[#6B7280] hover:text-[#0D9488] transition-all">
                  <RefreshCw className={`w-4 h-4 ${jobsLoading ? "animate-spin" : ""}`} />
                </button>
                <button
                  onClick={() => { setShowJobForm(true); setJobForm(EMPTY_JOB); setEditingJobId(null); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0B7A70] transition-all text-sm"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  <Plus className="w-4 h-4" /> Add Job
                </button>
              </div>
            </div>

            {showJobForm && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                    {editingJobId ? "Edit Job" : "Add New Job"}
                  </h2>
                  <button onClick={() => { setShowJobForm(false); setJobForm(EMPTY_JOB); setEditingJobId(null); }}>
                    <X className="w-5 h-5 text-[#6B7280] hover:text-[#0F1F3D]" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Job Title *", key: "title", placeholder: "e.g. Senior Frontend Engineer" },
                    { label: "Company *", key: "company", placeholder: "e.g. Stripe" },
                    { label: "Location *", key: "location", placeholder: "e.g. San Francisco, CA or Remote" },
                    { label: "Apply URL *", key: "apply_url", placeholder: "https://company.com/careers/job-id" },
                    { label: "Company Logo URL", key: "company_logo", placeholder: "https://..." },
                    { label: "Source Platform", key: "source_platform", placeholder: "e.g. LinkedIn, Indeed" },
                    { label: "Salary Min", key: "salary_min", placeholder: "e.g. 80000", type: "number" },
                    { label: "Salary Max", key: "salary_max", placeholder: "e.g. 120000", type: "number" },
                  ].map(({ label, key, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>{label}</label>
                      <input
                        type={type || "text"}
                        value={(jobForm as any)[key] || ""}
                        onChange={(e) => setJobForm((prev) => ({ ...prev, [key]: type === "number" ? (e.target.value ? Number(e.target.value) : null) : e.target.value }))}
                        placeholder={placeholder}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Job Type</label>
                    <select value={jobForm.job_type || "Full-time"} onChange={(e) => setJobForm((prev) => ({ ...prev, job_type: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors">
                      {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Category</label>
                    <select value={jobForm.category || "Tech"} onChange={(e) => setJobForm((prev) => ({ ...prev, category: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors">
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Description</label>
                    <textarea value={jobForm.description || ""} onChange={(e) => setJobForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="Brief job description..." rows={3} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>AI Summary (for Daily Picks)</label>
                    <textarea value={jobForm.ai_summary || ""} onChange={(e) => setJobForm((prev) => ({ ...prev, ai_summary: e.target.value }))} placeholder="AI-generated summary for the Daily Picks carousel..." rows={2} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors resize-none" />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { label: "Active", key: "is_active" },
                      { label: "Featured", key: "is_featured" },
                      { label: "AI Pick", key: "is_ai_pick" },
                    ].map(({ label, key }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={(jobForm as any)[key] || false} onChange={(e) => setJobForm((prev) => ({ ...prev, [key]: e.target.checked }))} className="w-4 h-4 rounded accent-[#0D9488]" />
                        <span className="text-sm text-[#0F1F3D] font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => { setShowJobForm(false); setJobForm(EMPTY_JOB); setEditingJobId(null); }} className="px-4 py-2.5 border border-[#E8E4DC] rounded-xl text-sm text-[#6B7280] hover:bg-[#F8F6F1] transition-all">Cancel</button>
                  <button onClick={saveJob} className="flex items-center gap-2 px-6 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl text-sm hover:bg-[#0B7A70] transition-all" style={{ fontFamily: "Syne, sans-serif" }}>
                    <Save className="w-4 h-4" /> {editingJobId ? "Update Job" : "Create Job"}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-[#E8E4DC] mb-4 focus-within:border-[#0D9488] transition-all">
              <Search className="w-4 h-4 text-[#6B7280]" />
              <input type="text" placeholder="Search jobs..." value={jobSearch} onChange={(e) => setJobSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm text-[#0F1F3D] placeholder-[#6B7280]" />
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8E4DC] bg-[#F8F6F1]">
                    {["Job Title", "Company", "Type", "Category", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: "Syne, sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="border-b border-[#F8F6F1] hover:bg-[#F8F6F1] transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-[#0F1F3D] max-w-[200px] truncate">{job.title}</td>
                      <td className="px-4 py-3 text-sm text-[#6B7280]">{job.company}</td>
                      <td className="px-4 py-3 text-xs text-[#6B7280]">{job.job_type}</td>
                      <td className="px-4 py-3 text-xs text-[#6B7280]">{job.category}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleJobActive(job.id, job.is_active)}>
                          {job.is_active ? <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Active</span> : <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">Inactive</span>}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <button onClick={() => editJob(job)} className="p-1.5 text-[#6B7280] hover:text-[#0D9488] hover:bg-[#F8F6F1] rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                          <Link href={`/redirect?job=${job.id}`} target="_blank" className="p-1.5 text-[#6B7280] hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Eye className="w-4 h-4" /></Link>
                          <button onClick={() => deleteJob(job.id)} className="p-1.5 text-[#6B7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredJobs.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-[#6B7280] text-sm">{jobSearch ? "No jobs match your search" : "No jobs yet. Add your first listing!"}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BLOG EDITOR */}
        {activeTab === "blog" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>Blog Editor</h1>
                <p className="text-[#6B7280] text-sm mt-1">{posts.length} posts</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={loadPosts} className="p-2.5 bg-white border border-[#E8E4DC] rounded-xl text-[#6B7280] hover:text-[#0D9488] transition-all">
                  <RefreshCw className={`w-4 h-4 ${postsLoading ? "animate-spin" : ""}`} />
                </button>
                <button
                  onClick={() => { setShowPostForm(true); setPostForm(EMPTY_POST); setEditingPostId(null); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0B7A70] transition-all text-sm"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  <Plus className="w-4 h-4" /> New Post
                </button>
              </div>
            </div>

            {showPostForm && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>{editingPostId ? "Edit Post" : "New Blog Post"}</h2>
                  <button onClick={() => { setShowPostForm(false); setPostForm(EMPTY_POST); setEditingPostId(null); }}>
                    <X className="w-5 h-5 text-[#6B7280] hover:text-[#0F1F3D]" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Title *</label>
                    <input type="text" value={postForm.title || ""} onChange={(e) => setPostForm((prev) => ({ ...prev, title: e.target.value, slug: prev.slug || generateSlug(e.target.value), meta_title: prev.meta_title || e.target.value }))} placeholder="e.g. 10 Resume Tips That Actually Get You Hired" className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Slug *</label>
                    <input type="text" value={postForm.slug || ""} onChange={(e) => setPostForm((prev) => ({ ...prev, slug: e.target.value }))} placeholder="e.g. 10-resume-tips-2024" className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Category</label>
                    <select value={postForm.category || "Career"} onChange={(e) => setPostForm((prev) => ({ ...prev, category: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors">
                      {["Career", "Tech", "Design", "Remote Work", "Interview", "Salary", "Fresher Tips"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Author</label>
                    <input type="text" value={postForm.author || "alfamus"} onChange={(e) => setPostForm((prev) => ({ ...prev, author: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Read Time (min)</label>
                    <input type="number" value={postForm.read_time || 5} onChange={(e) => setPostForm((prev) => ({ ...prev, read_time: Number(e.target.value) }))} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Featured Image URL</label>
                    <input type="text" value={postForm.featured_image || ""} onChange={(e) => setPostForm((prev) => ({ ...prev, featured_image: e.target.value }))} placeholder="https://images.unsplash.com/..." className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Excerpt</label>
                    <textarea value={postForm.excerpt || ""} onChange={(e) => setPostForm((prev) => ({ ...prev, excerpt: e.target.value, meta_description: prev.meta_description || e.target.value }))} placeholder="Brief post summary..." rows={2} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Content (HTML)</label>
                    <textarea value={postForm.content || ""} onChange={(e) => setPostForm((prev) => ({ ...prev, content: e.target.value }))} placeholder="<p>Your article content here...</p>" rows={10} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors resize-none font-mono" />
                  </div>
                  <div className="md:col-span-2 border-t border-[#E8E4DC] pt-4">
                    <p className="text-sm font-bold text-[#0F1F3D] mb-3" style={{ fontFamily: "Syne, sans-serif" }}>SEO Fields</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#6B7280] mb-1">Meta Title</label>
                        <input type="text" value={postForm.meta_title || ""} onChange={(e) => setPostForm((prev) => ({ ...prev, meta_title: e.target.value }))} placeholder="SEO page title..." className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#6B7280] mb-1">Meta Description</label>
                        <input type="text" value={postForm.meta_description || ""} onChange={(e) => setPostForm((prev) => ({ ...prev, meta_description: e.target.value }))} placeholder="SEO meta description..." className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={postForm.is_published || false} onChange={(e) => setPostForm((prev) => ({ ...prev, is_published: e.target.checked }))} id="is_published" className="w-4 h-4 rounded accent-[#0D9488]" />
                    <label htmlFor="is_published" className="text-sm font-medium text-[#0F1F3D] cursor-pointer">Publish immediately</label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => { setShowPostForm(false); setPostForm(EMPTY_POST); setEditingPostId(null); }} className="px-4 py-2.5 border border-[#E8E4DC] rounded-xl text-sm text-[#6B7280] hover:bg-[#F8F6F1] transition-all">Cancel</button>
                  <button onClick={savePost} className="flex items-center gap-2 px-6 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl text-sm hover:bg-[#0B7A70] transition-all" style={{ fontFamily: "Syne, sans-serif" }}>
                    <Save className="w-4 h-4" /> {editingPostId ? "Update Post" : "Create Post"}
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8E4DC] bg-[#F8F6F1]">
                    {["Title", "Category", "Author", "Read Time", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: "Syne, sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-[#F8F6F1] hover:bg-[#F8F6F1] transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-[#0F1F3D] max-w-xs truncate">{post.title}</td>
                      <td className="px-4 py-3 text-xs text-[#6B7280]">{post.category}</td>
                      <td className="px-4 py-3 text-xs text-[#6B7280]">{post.author}</td>
                      <td className="px-4 py-3 text-xs text-[#6B7280] font-mono">{post.read_time}m</td>
                      <td className="px-4 py-3">{post.is_published ? <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Published</span> : <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Draft</span>}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <button onClick={() => editPost(post)} className="p-1.5 text-[#6B7280] hover:text-[#0D9488] hover:bg-[#F8F6F1] rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                          {post.is_published && <Link href={`/blog/${post.slug}`} target="_blank" className="p-1.5 text-[#6B7280] hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Eye className="w-4 h-4" /></Link>}
                          <button onClick={() => deletePost(post.id)} className="p-1.5 text-[#6B7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {posts.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-[#6B7280] text-sm">No posts yet. Write your first article!</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ADS MANAGER */}
        {activeTab === "ads" && (
          <div>
            <h1 className="text-3xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>Ads Manager</h1>
            <p className="text-[#6B7280] mb-6">Manage AdSense and sponsored content placements</p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Google AdSense Integration</p>
                <p className="text-xs text-amber-700 mt-0.5">Paste your AdSense ad unit codes below. Make sure your site is approved by AdSense before injecting live codes.</p>
              </div>
            </div>
            <div className="space-y-4">
              {adUnits.map((unit) => (
                <div key={unit.id} className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#0F1F3D] rounded-xl flex items-center justify-center">
                        <Megaphone className="w-4 h-4 text-[#0D9488]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#0F1F3D] text-sm" style={{ fontFamily: "Syne, sans-serif" }}>{unit.name}</div>
                        <div className="text-xs text-[#6B7280] font-mono">slot: {unit.slot}</div>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={unit.active} onChange={(e) => setAdUnits((prev) => prev.map((u) => u.id === unit.id ? { ...u, active: e.target.checked } : u))} className="w-4 h-4 accent-[#0D9488]" />
                      <span className="text-sm text-[#6B7280]">Active</span>
                    </label>
                  </div>
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1">Ad Code</label>
                  <textarea
                    value={unit.code}
                    onChange={(e) => setAdUnits((prev) => prev.map((u) => u.id === unit.id ? { ...u, code: e.target.value } : u))}
                    placeholder={`<!-- Google AdSense ${unit.name} -->\n<ins class="adsbygoogle" ...></ins>`}
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-xs text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors resize-none font-mono"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => showToast("Ad units saved successfully!")} className="flex items-center gap-2 px-6 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl text-sm hover:bg-[#0B7A70] transition-all" style={{ fontFamily: "Syne, sans-serif" }}>
                <Save className="w-4 h-4" /> Save Ad Settings
              </button>
            </div>
          </div>
        )}

        {/* CHATBOT SETTINGS */}
        {activeTab === "chatbot" && (
          <div>
            <h1 className="text-3xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>Chatbot Settings</h1>
            <p className="text-[#6B7280] mb-6">Configure AI assistant profiles and system prompts</p>
            <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-2xl p-6 text-white mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Bot className="w-6 h-6" />
                <span className="font-bold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>alfamus AI — Powered by OpenAI</span>
              </div>
              <p className="text-white/80 text-sm">Add your OPENAI_API_KEY to Supabase edge function secrets to enable live AI responses. Without it, smart fallback responses are used.</p>
            </div>
            <div className="space-y-4">
              {chatbotProfiles.map((profile, idx) => (
                <div key={profile.id} className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${idx === 0 ? "bg-gradient-to-br from-emerald-500 to-teal-600" : idx === 1 ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-violet-500 to-purple-600"}`}>
                        {idx === 0 ? "🎯" : idx === 1 ? "💻" : "🌱"}
                      </div>
                      <div>
                        <input type="text" value={profile.name} onChange={(e) => setChatbotProfiles((prev) => prev.map((p, i) => i === idx ? { ...p, name: e.target.value } : p))} className="font-bold text-[#0F1F3D] text-sm bg-transparent outline-none border-b border-transparent focus:border-[#0D9488] transition-colors" style={{ fontFamily: "Syne, sans-serif" }} />
                        <div className="text-xs text-[#6B7280] font-mono">{profile.id}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <label className="text-xs text-[#6B7280] block mb-1">Model</label>
                        <select value={profile.model} onChange={(e) => setChatbotProfiles((prev) => prev.map((p, i) => i === idx ? { ...p, model: e.target.value } : p))} className="text-xs px-2 py-1.5 rounded-lg border border-[#E8E4DC] bg-[#F8F6F1] outline-none">
                          {["gpt-4o-mini", "gpt-4o", "gpt-3.5-turbo"].map((m) => <option key={m}>{m}</option>)}
                        </select>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={profile.active} onChange={(e) => setChatbotProfiles((prev) => prev.map((p, i) => i === idx ? { ...p, active: e.target.checked } : p))} className="w-4 h-4 accent-[#6366F1]" />
                        <span className="text-sm text-[#6B7280]">Active</span>
                      </label>
                    </div>
                  </div>
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1">System Prompt</label>
                  <textarea value={profile.prompt} onChange={(e) => setChatbotProfiles((prev) => prev.map((p, i) => i === idx ? { ...p, prompt: e.target.value } : p))} placeholder="Enter the system prompt for this assistant..." rows={4} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#6366F1] transition-colors resize-none" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => showToast("Chatbot settings saved!")} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all" style={{ fontFamily: "Syne, sans-serif" }}>
                <Save className="w-4 h-4" /> Save Settings
              </button>
            </div>
          </div>
        )}

        {/* SEO SETTINGS */}
        {activeTab === "seo" && (
          <div>
            <h1 className="text-3xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>SEO Settings</h1>
            <p className="text-[#6B7280] mb-8">Global meta defaults, analytics, and search optimization</p>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <h2 className="text-base font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Global Meta Defaults</h2>
                <div className="space-y-4">
                  {[
                    { label: "Site Title", key: "site_title", placeholder: "alfamus.com — Find Your Dream Job" },
                    { label: "Meta Description", key: "meta_description", placeholder: "AI-powered job aggregator...", type: "textarea" },
                    { label: "OG Image URL", key: "og_image", placeholder: "https://alfamus.com/og-image.png" },
                  ].map(({ label, key, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>{label}</label>
                      {type === "textarea" ? (
                        <textarea value={seoSettings[key]} onChange={(e) => setSeoSettings((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} rows={2} className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors resize-none" />
                      ) : (
                        <input type="text" value={seoSettings[key]} onChange={(e) => setSeoSettings((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <h2 className="text-base font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Analytics & Search Console</h2>
                <div className="space-y-4">
                  {[
                    { label: "Google Analytics Measurement ID", key: "google_analytics_id", placeholder: "G-XXXXXXXXXX" },
                    { label: "Google Search Console Verification", key: "google_search_console", placeholder: "meta tag verification code" },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>{label}</label>
                      <input type="text" value={seoSettings[key]} onChange={(e) => setSeoSettings((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors font-mono" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <h2 className="text-base font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Robots.txt</h2>
                <textarea defaultValue={`User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://alfamus.com/sitemap.xml`} rows={6} className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors resize-none font-mono" />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => { setSeoSaving(true); setTimeout(() => { setSeoSaving(false); showToast("SEO settings saved!"); }, 800); }}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl text-sm hover:bg-[#0B7A70] transition-all"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  <Save className="w-4 h-4" /> {seoSaving ? "Saving..." : "Save SEO Settings"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SITE SETTINGS */}
        {activeTab === "settings" && (
          <div>
            <h1 className="text-3xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>Site Settings</h1>
            <p className="text-[#6B7280] mb-8">General site configuration and account management</p>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <h2 className="text-base font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Site Configuration</h2>
                <div className="space-y-4">
                  {[
                    { label: "Site Name", placeholder: "alfamus.com", defaultVal: "alfamus.com" },
                    { label: "Site URL", placeholder: "https://alfamus.com", defaultVal: "https://alfamus.com" },
                    { label: "Contact Email", placeholder: "hello@alfamus.com", defaultVal: "" },
                    { label: "Twitter / X Handle", placeholder: "@alfamus", defaultVal: "" },
                  ].map(({ label, placeholder, defaultVal }) => (
                    <div key={label}>
                      <label className="block text-sm font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>{label}</label>
                      <input type="text" defaultValue={defaultVal} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors" />
                    </div>
                  ))}
                  <button onClick={() => showToast("Settings saved!")} className="px-6 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl text-sm hover:bg-[#0B7A70] transition-all" style={{ fontFamily: "Syne, sans-serif" }}>Save Changes</button>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <h2 className="text-base font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Newsletter Subscribers</h2>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-[#F8F6F1] rounded-xl px-5 py-4">
                    <div className="text-3xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>{stats.totalSubscribers.toLocaleString()}</div>
                    <div className="text-sm text-[#6B7280] mt-1">Total subscribers</div>
                  </div>
                  <button className="px-4 py-2.5 border border-[#E8E4DC] rounded-xl text-sm text-[#6B7280] hover:bg-[#F8F6F1] transition-all flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Export CSV
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <h2 className="text-base font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Account</h2>
                <div className="flex items-center gap-4 p-4 bg-[#F8F6F1] rounded-xl mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0D9488] flex items-center justify-center text-white font-bold text-lg">{user.email?.[0].toUpperCase()}</div>
                  <div>
                    <div className="font-semibold text-[#0F1F3D]">{user.email}</div>
                    <div className="text-xs text-[#6B7280]">Administrator</div>
                  </div>
                </div>
                <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2.5 border border-red-200 text-red-500 rounded-xl text-sm hover:bg-red-50 transition-all">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0D9488] flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
              alfamus <span className="text-[#0D9488]">admin</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all text-left ${
                activeTab === id
                  ? "bg-[#0D9488] text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* User + sign out */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#0D9488] flex items-center justify-center text-white text-sm font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div>
              <div className="text-white text-xs font-semibold truncate max-w-[130px]">
                {user.email}
              </div>
              <div className="text-white/40 text-xs">Admin</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8">
        {activeTab === "overview" && (
          <div>
            <h1 className="text-3xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
              Dashboard
            </h1>
            <p className="text-[#6B7280] mb-8">Welcome back, {user.email?.split("@")[0]}</p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { label: "Total Jobs", value: stats.totalJobs, icon: Briefcase, color: "bg-blue-500" },
                { label: "Blog Posts", value: stats.totalPosts, icon: FileText, color: "bg-emerald-500" },
                { label: "Subscribers", value: stats.totalSubscribers, icon: Users, color: "bg-violet-500" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl p-6 border border-[#E8E4DC]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-[#6B7280] font-medium" style={{ fontFamily: "Syne, sans-serif" }}>{label}</span>
                    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                    {value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Jobs */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                  Recent Jobs
                </h2>
                <button
                  onClick={() => setActiveTab("jobs")}
                  className="text-sm text-[#0D9488] hover:underline"
                >
                  View all →
                </button>
              </div>
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between py-3 border-b border-[#F8F6F1] last:border-0">
                    <div>
                      <div className="text-sm font-semibold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                        {job.title}
                      </div>
                      <div className="text-xs text-[#6B7280]">{job.company} · {job.category}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {job.is_active ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                          <XCircle className="w-3 h-3" /> Inactive
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                  Recent Blog Posts
                </h2>
                <button onClick={() => setActiveTab("blog")} className="text-sm text-[#0D9488] hover:underline">
                  View all →
                </button>
              </div>
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between py-3 border-b border-[#F8F6F1] last:border-0">
                    <div>
                      <div className="text-sm font-semibold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                        {post.title}
                      </div>
                      <div className="text-xs text-[#6B7280]">{post.category}</div>
                    </div>
                    {post.is_published ? (
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Published</span>
                    ) : (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Draft</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                Jobs Manager
              </h1>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0B7A70] transition-all text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
                <Plus className="w-4 h-4" /> Add Job
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8E4DC] bg-[#F8F6F1]">
                    {["Job Title", "Company", "Category", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: "Syne, sans-serif" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentJobs.map((job) => (
                    <tr key={job.id} className="border-b border-[#F8F6F1] hover:bg-[#F8F6F1] transition-colors">
                      <td className="px-5 py-4 text-sm font-semibold text-[#0F1F3D]">{job.title}</td>
                      <td className="px-5 py-4 text-sm text-[#6B7280]">{job.company}</td>
                      <td className="px-5 py-4 text-sm text-[#6B7280]">{job.category}</td>
                      <td className="px-5 py-4">
                        {job.is_active ? (
                          <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Active</span>
                        ) : (
                          <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">Inactive</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button className="p-1.5 text-[#6B7280] hover:text-[#0D9488] hover:bg-[#F8F6F1] rounded-lg transition-all">
                            <Edit className="w-4 h-4" />
                          </button>
                          <Link href={`/jobs`} className="p-1.5 text-[#6B7280] hover:text-[#0D9488] hover:bg-[#F8F6F1] rounded-lg transition-all">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "blog" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                Blog Editor
              </h1>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0B7A70] transition-all text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
                <Plus className="w-4 h-4" /> New Post
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8E4DC] bg-[#F8F6F1]">
                    {["Title", "Category", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: "Syne, sans-serif" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((post) => (
                    <tr key={post.id} className="border-b border-[#F8F6F1] hover:bg-[#F8F6F1] transition-colors">
                      <td className="px-5 py-4 text-sm font-semibold text-[#0F1F3D] max-w-xs truncate">{post.title}</td>
                      <td className="px-5 py-4 text-sm text-[#6B7280]">{post.category}</td>
                      <td className="px-5 py-4">
                        {post.is_published ? (
                          <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Published</span>
                        ) : (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Draft</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button className="p-1.5 text-[#6B7280] hover:text-[#0D9488] hover:bg-[#F8F6F1] rounded-lg transition-all">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h1 className="text-3xl font-bold text-[#0F1F3D] mb-8" style={{ fontFamily: "Syne, sans-serif" }}>
              Settings
            </h1>
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 mb-6">
              <h2 className="text-lg font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>SEO Defaults</h2>
              <div className="space-y-4">
                {[
                  { label: "Site Title", placeholder: "alfamus.com — Find Your Dream Job" },
                  { label: "Meta Description", placeholder: "AI-powered job aggregator for freshers and career switchers..." },
                  { label: "OG Image URL", placeholder: "https://alfamus.com/og-image.png" },
                ].map(({ label, placeholder }) => (
                  <div key={label}>
                    <label className="block text-sm font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors"
                    />
                  </div>
                ))}
                <button className="px-6 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl text-sm hover:bg-[#0B7A70] transition-all" style={{ fontFamily: "Syne, sans-serif" }}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
