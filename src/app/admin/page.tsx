import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  
  redirect("/admin/dashboard");
}
