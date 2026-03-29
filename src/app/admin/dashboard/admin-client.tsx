"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import {
  Briefcase, FileText, BarChart2, Settings, LogOut, Plus, CheckCircle2, XCircle,
  Users, Eye, Edit, Trash2, Save, X, Bot, Megaphone, Search, ExternalLink,
  Globe, RefreshCw, Monitor, TrendingUp, Image as ImageIcon, Lock, Shield, RotateCcw
} from "lucide-react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { uploadImage } from "../../actions/cloudinary";

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
  featured_image: string | null;
  created_at: string;
}

interface AdUnit {
  id: string;
  name: string;
  slot: string;
  ad_code: string | null;
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
  deleted_at: string | null;
  created_at: string;
}

interface Props {
  user: User;
  stats: Stats;
  recentJobs: Job[];
  recentPosts: Post[];
  initialAdUnits: AdUnit[];
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: BarChart2 },
  { id: "jobs", label: "Jobs Manager", icon: Briefcase },
  { id: "blog", label: "Blog Editor", icon: FileText },
  { id: "ads", label: "Ads Manager", icon: Megaphone },
  { id: "chatbot", label: "Chatbot Settings", icon: Bot },
  { id: "seo", label: "SEO Settings", icon: Globe },
  { id: "security", label: "Security", icon: Shield },
  { id: "settings", label: "Site Settings", icon: Settings },
];

const JOB_TYPES = ["Full-time", "Remote", "Contract", "Part-time", "Internship"];
const CATEGORIES = ["Tech", "Design", "Marketing", "Finance", "Data Science", "Engineering", "HR", "Sales", "Operations"];

const EMPTY_JOB: Partial<Job> = {
  title: "", company: "", company_logo: "", location: "", job_type: "Full-time",
  salary_min: null, salary_max: null, category: "Tech", description: "",
  apply_url: "", source_platform: "", is_featured: false, is_ai_pick: false,
  ai_summary: "", is_active: true, featured_image: "",
};

const EMPTY_POST: Partial<Post> = {
  title: "", slug: "", excerpt: "", content: "", featured_image: "", category: "Career",
  author: "alfamus", read_time: 5, meta_title: "", meta_description: "", is_published: false,
};

export default function AdminDashboardClient({ user, stats: initialStats, recentJobs: initialJobs, recentPosts: initialPosts, initialAdUnits }: Props) {
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
  const [showTrash, setShowTrash] = useState(false);
  const [securityLoading, setSecurityLoading] = useState(false);
  const [securityForm, setSecurityForm] = useState({ password: "", confirmPassword: "" });
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

  const [adUnits, setAdUnits] = useState<AdUnit[]>(initialAdUnits);
  const [adsLoading, setAdsLoading] = useState(false);
  const [showAdForm, setShowAdForm] = useState(false);
  const [adForm, setAdForm] = useState<Partial<AdUnit>>({ name: "", slot: "", ad_code: "", is_active: true });

  useEffect(() => {
    loadAdUnits();
    loadSeoSettings();
  }, []);

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  const handleCloudinaryUpload = async (file: File) => {
    try {
      showToast("Uploading...", "success");
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadImage(formData) as string;
      if (url) {
        showToast("Upload successful!");
        return url;
      }
      return null;
    } catch (e) {
      showToast("Upload failed", "error");
      return null;
    }
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
    if (!confirm("Move this blog post to Trash?")) return;
    const { error } = await supabase.from("blog_posts").update({ deleted_at: new Date().toISOString() }).eq("id", id);
    if (error) { showToast("Error moving post to trash", "error"); return; }
    showToast("Post moved to trash");
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, deleted_at: new Date().toISOString() } : p));
  };

  const restorePost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").update({ deleted_at: null }).eq("id", id);
    if (error) { showToast("Error restoring post", "error"); return; }
    showToast("Post restored");
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, deleted_at: null } : p));
  };

  const permanentDeletePost = async (id: string) => {
    if (!confirm("Permanently delete this post? This action cannot be undone.")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) { showToast("Error deleting post", "error"); return; }
    showToast("Post permanently deleted");
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setStats((s) => ({ ...s, totalPosts: Math.max(0, s.totalPosts - 1) }));
  };

  const updatePassword = async () => {
    if (!securityForm.password || securityForm.password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setSecurityLoading(true);
    const { error } = await supabase.auth.updateUser({ password: securityForm.password });
    setSecurityLoading(false);

    if (error) {
      showToast(error.message, "error");
    } else {
      showToast("Password updated successfully!");
      setSecurityForm({ password: "", confirmPassword: "" });
    }
  };

  const editPost = (post: Post) => {
    setPostForm(post);
    setEditingPostId(post.id);
    setShowPostForm(true);
  };

  const loadAdUnits = async () => {
    setAdsLoading(true);
    const { data } = await supabase.from("ad_units").select("*").order("created_at", { ascending: true });
    if (data) setAdUnits(data);
    setAdsLoading(false);
  };

  const saveAdUnit = async (unit: Partial<AdUnit>) => {
    if (!unit.name || !unit.slot) {
      showToast("Name and Slot are required", "error");
      return;
    }
    const payload = { 
      name: unit.name, 
      slot: unit.slot, 
      ad_code: unit.ad_code, 
      is_active: unit.is_active 
    };

    if (unit.id) {
      const { error } = await supabase.from("ad_units").update(payload).eq("id", unit.id);
      if (error) { showToast("Error updating ad unit", "error"); return; }
      showToast("Ad unit updated");
    } else {
      const { error } = await supabase.from("ad_units").insert(payload);
      if (error) { showToast("Error creating ad unit", "error"); return; }
      showToast("Ad unit created");
      setShowAdForm(false);
      setAdForm({ name: "", slot: "", ad_code: "", is_active: true });
    }
    loadAdUnits();
  };

  const deleteAdUnit = async (id: string) => {
    if (!confirm("Delete this ad unit?")) return;
    const { error } = await supabase.from("ad_units").delete().eq("id", id);
    if (error) { showToast("Error deleting ad unit", "error"); return; }
    showToast("Ad unit deleted");
    setAdUnits((prev) => prev.filter((u) => u.id !== id));
  };

  const toggleAdActive = async (id: string, current: boolean) => {
    const { error } = await supabase.from("ad_units").update({ is_active: !current }).eq("id", id);
    if (error) { showToast("Error toggling status", "error"); return; }
    setAdUnits((prev) => prev.map((u) => u.id === id ? { ...u, is_active: !current } : u));
  };

  const loadSeoSettings = async () => {
    const { data } = await supabase.from("seo_settings").select("*");
    if (data) {
      const settings = { ...seoSettings };
      data.forEach((item) => {
        if (item.key in settings) {
          settings[item.key] = item.value || "";
        }
      });
      setSeoSettings(settings);
    }
  };

  const saveSeoSettings = async () => {
    setSeoSaving(true);
    try {
      const updates = Object.entries(seoSettings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));
      const { error } = await supabase.from("seo_settings").upsert(updates, { onConflict: "key" });
      if (error) throw error;
      showToast("SEO settings saved!");
    } catch (e) {
      showToast("Error saving SEO settings", "error");
    } finally {
      setSeoSaving(false);
    }
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
                      {key === "company_logo" ? (
                        <div className="flex items-center gap-3">
                          {jobForm.company_logo && (
                            <img src={jobForm.company_logo} alt="Logo" className="w-10 h-10 object-cover rounded-lg border border-[#E8E4DC]" />
                          )}
                          <div className="flex-1 relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await handleCloudinaryUpload(file);
                                  if (url) setJobForm((prev) => ({ ...prev, company_logo: url }));
                                }
                              }}
                              className="w-full text-xs text-[#6B7280] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#F8F6F1] file:text-[#0F1F3D] hover:file:bg-[#E8E4DC] cursor-pointer"
                            />
                            {jobForm.company_logo && (
                              <button onClick={() => setJobForm((p) => ({ ...p, company_logo: "" }))} className="absolute right-2 top-2 text-[#6B7280] hover:text-red-500">
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <input
                          type={type || "text"}
                          value={(jobForm as any)[key] || ""}
                          onChange={(e) => setJobForm((prev) => ({ ...prev, [key]: type === "number" ? (e.target.value ? Number(e.target.value) : null) : e.target.value }))}
                          placeholder={placeholder}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
                        />
                      )}
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
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Featured Image</label>
                    <div className="flex items-center gap-4">
                      {jobForm.featured_image && (
                        <div className="relative">
                          <img src={jobForm.featured_image} alt="Featured" className="w-24 h-24 object-cover rounded-xl border border-[#E8E4DC]" />
                          <button onClick={() => setJobForm((p) => ({ ...p, featured_image: "" }))} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-red-500 hover:bg-gray-100">
                             <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <div className={`flex items-center justify-center border-2 border-dashed border-[#E8E4DC] rounded-xl p-4 transition-colors hover:border-[#0D9488] ${!jobForm.featured_image ? "w-full" : "w-1/2"}`}>
                        <label className="flex flex-col items-center gap-2 cursor-pointer w-full text-center">
                          <ImageIcon className="w-6 h-6 text-[#6B7280]" />
                          <span className="text-xs font-medium text-[#6B7280]">Click to upload featured image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleCloudinaryUpload(file);
                                if (url) setJobForm((prev) => ({ ...prev, featured_image: url }));
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
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
                <h1 className="text-3xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>{showTrash ? "Blog Trash" : "Blog Editor"}</h1>
                <p className="text-[#6B7280] text-sm mt-1">{showTrash ? posts.filter((p) => p.deleted_at).length : posts.filter((p) => !p.deleted_at).length} posts {showTrash ? "in trash" : ""}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowTrash(!showTrash)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${showTrash ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-white border border-[#E8E4DC] text-[#6B7280] hover:text-amber-600"}`}
                >
                  <Trash2 className="w-4 h-4" /> {showTrash ? "View Active" : "View Trash"}
                </button>
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
                    <label className="block text-xs font-semibold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>Featured Image</label>
                    <div className="flex items-center gap-4">
                      {postForm.featured_image && (
                        <div className="relative">
                          <img src={postForm.featured_image} alt="Blog Cover" className="w-32 h-20 object-cover rounded-xl border border-[#E8E4DC]" />
                          <button onClick={() => setPostForm((p) => ({ ...p, featured_image: "" }))} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md text-red-500 hover:bg-gray-100">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <div className={`flex items-center justify-center border-2 border-dashed border-[#E8E4DC] rounded-xl p-4 transition-colors hover:border-[#0D9488] ${!postForm.featured_image ? "w-full" : "w-1/2"}`}>
                        <label className="flex flex-col items-center gap-2 cursor-pointer w-full text-center">
                          <ImageIcon className="w-6 h-6 text-[#6B7280]" />
                          <span className="text-xs font-medium text-[#6B7280]">Click to upload blog cover image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = await handleCloudinaryUpload(file);
                                if (url) setPostForm((prev) => ({ ...prev, featured_image: url }));
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
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
                  {posts.filter((p) => showTrash ? !!p.deleted_at : !p.deleted_at).map((post) => (
                    <tr key={post.id} className="border-b border-[#F8F6F1] hover:bg-[#F8F6F1] transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-[#0F1F3D] max-w-xs truncate">{post.title}</td>
                      <td className="px-4 py-3 text-xs text-[#6B7280]">{post.category}</td>
                      <td className="px-4 py-3 text-xs text-[#6B7280]">{post.author}</td>
                      <td className="px-4 py-3 text-xs text-[#6B7280] font-mono">{post.read_time}m</td>
                      <td className="px-4 py-3">{post.is_published ? <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Published</span> : <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Draft</span>}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          {showTrash ? (
                            <>
                              <button onClick={() => restorePost(post.id)} title="Restore" className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><RotateCcw className="w-4 h-4" /></button>
                              <button onClick={() => permanentDeletePost(post.id)} title="Delete Permanently" className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => editPost(post)} className="p-1.5 text-[#6B7280] hover:text-[#0D9488] hover:bg-[#F8F6F1] rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                              {post.is_published && <Link href={`/blog/${post.slug}`} target="_blank" className="p-1.5 text-[#6B7280] hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Eye className="w-4 h-4" /></Link>}
                              <button onClick={() => deletePost(post.id)} className="p-1.5 text-[#6B7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                            </>
                          )}
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
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>Ads Manager</h1>
                <p className="text-[#6B7280] text-sm mt-1">Manage AdSense and sponsored content placements</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={loadAdUnits} className="p-2.5 bg-white border border-[#E8E4DC] rounded-xl text-[#6B7280] hover:text-[#0D9488] transition-all">
                  <RefreshCw className={`w-4 h-4 ${adsLoading ? "animate-spin" : ""}`} />
                </button>
                <button
                  onClick={() => setShowAdForm(!showAdForm)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0B7A70] transition-all text-sm shadow-lg shadow-[#0D9488]/20"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  <Plus className="w-4 h-4" /> {showAdForm ? "Cancel" : "Add Unit"}
                </button>
              </div>
            </div>

            {showAdForm && (
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 mb-8 shadow-sm">
                <h2 className="font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>New Ad Placement</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] mb-1">Display Name</label>
                    <input type="text" value={adForm.name} onChange={(e) => setAdForm({...adForm, name: e.target.value})} placeholder="e.g. Homepage Sidebar" className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm bg-[#F8F6F1] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] mb-1">Slot Identifier</label>
                    <input type="text" value={adForm.slot} onChange={(e) => setAdForm({...adForm, slot: e.target.value})} placeholder="e.g. sidebar-top" className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-sm bg-[#F8F6F1] outline-none font-mono" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#6B7280] mb-1">AdSense / HTML Code</label>
                  <textarea value={adForm.ad_code || ""} onChange={(e) => setAdForm({...adForm, ad_code: e.target.value})} placeholder="Paste <ins> code here..." rows={4} className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-xs bg-[#F8F6F1] outline-none font-mono resize-none" />
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => saveAdUnit(adForm)} className="px-6 py-2 bg-[#0D9488] text-white rounded-xl text-sm font-bold">Create Placement</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {adUnits.length === 0 && !adsLoading && (
                  <div className="bg-white rounded-2xl border border-dashed border-[#E8E4DC] p-12 text-center text-[#6B7280]">
                    <Megaphone className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p>No ad units found. Create one to get started.</p>
                  </div>
                )}
                {adUnits.map((unit) => (
                  <div key={unit.id} className="bg-white rounded-2xl border border-[#E8E4DC] p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${unit.is_active ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                          <Megaphone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-[#0F1F3D] text-sm" style={{ fontFamily: "Syne, sans-serif" }}>{unit.name}</div>
                          <div className="text-xs text-[#6B7280] font-mono">{unit.slot}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={unit.is_active} onChange={() => toggleAdActive(unit.id, unit.is_active)} className="w-4 h-4 accent-[#0D9488]" />
                          <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Active</span>
                        </label>
                        <button onClick={() => deleteAdUnit(unit.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={unit.ad_code || ""}
                      onChange={(e) => setAdUnits(prev => prev.map(u => u.id === unit.id ? {...u, ad_code: e.target.value} : u))}
                      placeholder="Ad code placeholder..."
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E8E4DC] text-xs text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] transition-colors resize-none font-mono mb-3"
                    />
                    <div className="flex justify-end">
                      <button onClick={() => saveAdUnit(unit)} className="text-xs font-bold text-[#0D9488] hover:underline flex items-center gap-1">
                        <Save className="w-3 h-3" /> Update Unit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="bg-[#0F1F3D] rounded-2xl p-6 text-white border border-white/10 shadow-xl overflow-hidden relative">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0D9488]/20 rounded-full blur-3xl" />
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ fontFamily: "Syne, sans-serif" }}>
                    <TrendingUp className="w-5 h-5 text-[#0D9488]" /> Ads News & Tips
                  </h2>
                  <div className="space-y-4 relative z-10">
                    {[
                      { title: "Optimize for Core Web Vitals", desc: "AdSense rewards fast sites. Ensure your ads don't cause layout shifts (CLS).", tag: "Tip" },
                      { title: "MCM Policy Update", desc: "Google is tightening Multi-Customer Management rules. Check your status.", tag: "Policy" },
                      { title: "Smart Bidding 2024", desc: "Leverage AI-driven bidding to increase your RPM by up to 15%.", tag: "News" },
                    ].map((news, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group cursor-default">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D9488]">{news.tag}</span>
                          <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-[#0D9488] transition-colors" />
                        </div>
                        <h3 className="text-sm font-bold mb-1 group-hover:text-[#0D9488] transition-colors">{news.title}</h3>
                        <p className="text-xs text-white/50 leading-relaxed">{news.desc}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 text-xs font-bold border border-white/10 rounded-lg hover:bg-white/5 transition-all">View All News</button>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Policy Check</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" /> ads.txt configured correctly
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" /> Google crawler allowed
                    </div>
                  </div>
                </div>
              </div>
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
                      {key === "og_image" ? (
                        <div className="flex items-center gap-3">
                          {seoSettings.og_image && (
                            <img src={seoSettings.og_image} alt="OG" className="w-16 h-10 object-cover rounded border border-[#E8E4DC]" />
                          )}
                          <div className="flex-1 relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = await handleCloudinaryUpload(file);
                                  if (url) setSeoSettings((p) => ({ ...p, og_image: url }));
                                }
                              }}
                              className="w-full text-xs text-[#6B7280] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#F8F6F1] file:text-[#0F1F3D] hover:file:bg-[#E8E4DC] cursor-pointer"
                            />
                            {seoSettings.og_image && (
                              <button onClick={() => setSeoSettings((p) => ({ ...p, og_image: "" }))} className="absolute right-2 top-2 text-[#6B7280] hover:text-red-500">
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : type === "textarea" ? (
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
                  onClick={saveSeoSettings}
                  disabled={seoSaving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl text-sm hover:bg-[#0B7A70] transition-all disabled:opacity-50"
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

        {/* SECURITY SETTINGS */}
        {activeTab === "security" && (
          <div>
            <h1 className="text-3xl font-bold text-[#0F1F3D] mb-2" style={{ fontFamily: "Syne, sans-serif" }}>Security</h1>
            <p className="text-[#6B7280] mb-8">Update your administrative password and manage account security</p>

            <div className="max-w-xl">
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>Update Password</h2>
                    <p className="text-xs text-[#6B7280]">Change your password to keep your account secure</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0F1F3D] uppercase tracking-wider mb-2" style={{ fontFamily: "Syne, sans-serif" }}>New Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={securityForm.password}
                        onChange={(e) => setSecurityForm((p) => ({ ...p, password: e.target.value }))}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E4DC] bg-[#F8F6F1] focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all outline-none text-sm"
                      />
                      <Lock className="absolute right-4 top-3.5 w-4 h-4 text-[#C1BDB3]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F1F3D] uppercase tracking-wider mb-2" style={{ fontFamily: "Syne, sans-serif" }}>Confirm Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        value={securityForm.confirmPassword}
                        onChange={(e) => setSecurityForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8E4DC] bg-[#F8F6F1] focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all outline-none text-sm"
                      />
                      <Lock className="absolute right-4 top-3.5 w-4 h-4 text-[#C1BDB3]" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={updatePassword}
                      disabled={securityLoading}
                      className="w-full py-3.5 bg-[#0D9488] text-white font-bold rounded-xl shadow-lg shadow-[#0D9488]/20 hover:bg-[#0B7A70] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {securityLoading ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Update Security Password
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-[#0F1F3D] rounded-2xl p-6 text-white border border-white/10">
                <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "Syne, sans-serif" }}>Security Recommendations</h3>
                <ul className="space-y-3">
                  {[
                    "Use at least 12 characters with a mix of letters, numbers, and symbols.",
                    "Avoid using personal information like your name or email.",
                    "Never share your password with anyone else.",
                    "Change your password every 90 days for maximum safety.",
                  ].map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-white/70">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}