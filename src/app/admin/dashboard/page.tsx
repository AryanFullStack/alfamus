import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./admin-client";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Verify admin role
  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (userData?.role !== "admin") {
    redirect("/dashboard");
  }

  // Fetch stats
  const [
    { count: totalJobs },
    { count: totalPosts },
    { count: totalSubscribers },
  ] = await Promise.all([
    supabase.from("jobs").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
  ]);

  const { data: recentJobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: recentPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <AdminDashboardClient
      user={user}
      stats={{ totalJobs: totalJobs ?? 0, totalPosts: totalPosts ?? 0, totalSubscribers: totalSubscribers ?? 0 }}
      recentJobs={recentJobs ?? []}
      recentPosts={recentPosts ?? []}
    />
  );
}
