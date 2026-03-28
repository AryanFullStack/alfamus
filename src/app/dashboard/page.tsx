import DashboardNavbar from "@/components/dashboard-navbar";
import { ExternalLink, InfoIcon, ShieldAlert, UserCircle } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch the user role
  const { data: userData } = await supabase
    .from("users")
    .select("role, name, full_name")
    .eq("id", user.id)
    .single();

  const isAdmin = userData?.role === "admin";
  const displayName = userData?.full_name || userData?.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-[#F8F6F1] min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold" style={{ fontFamily: "Syne, sans-serif" }}>Dashboard</h1>
            <div className="bg-white border border-[#E8E4DC] text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" className="text-[#0D9488]" />
              <span>Welcome back! Manage your account and preferences here.</span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* User Profile Section */}
              <section className="bg-white rounded-2xl p-6 border border-[#E8E4DC] shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#0D9488]/10 text-[#0D9488] rounded-full flex items-center justify-center">
                    <UserCircle size={32} />
                  </div>
                  <div>
                    <h2 className="font-bold text-2xl text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                      {displayName}
                    </h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Verified
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#F8F6F1]">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Account Role</p>
                    <p className="text-sm font-semibold capitalize text-[#0F1F3D]">
                      {isAdmin ? "Administrator" : "Standard User"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Joined</p>
                    <p className="text-sm font-semibold text-[#0F1F3D]">
                      {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              {/* Admin Panel Link */}
              {isAdmin && (
                <div className="bg-[#0F1F3D] rounded-2xl p-6 shadow-sm text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldAlert className="text-amber-400 w-6 h-6" />
                    <h3 className="font-bold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>Admin Access</h3>
                  </div>
                  <p className="text-sm text-white/80 mb-6">
                    You have administrative privileges. Access the operations dashboard to manage jobs, blog posts, and site settings.
                  </p>
                  <Link 
                    href="/admin/dashboard" 
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0D9488] hover:bg-[#0B7A70] transition-colors rounded-xl text-sm font-bold"
                  >
                    Go to Admin Portal <ExternalLink size={16} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
