"use client";

import { usePathname } from "next/navigation";
import AdUnit from "./ad-unit";

export default function HeaderAdWrapper() {
  const pathname = usePathname();
  
  // Hide Ad on admin and auth pages
  const isAdminOrAuth = 
    pathname?.startsWith("/admin") || 
    pathname?.startsWith("/auth") || 
    pathname?.startsWith("/sign-in") || 
    pathname?.startsWith("/sign-up") ||
    pathname?.startsWith("/dashboard");

  if (isAdminOrAuth) return null;

  return (
    <div className="bg-[#F8F6F1] border-b border-[#E8E4DC] py-2">
      <div className="container mx-auto px-4">
        <AdUnit slot="9015835145" />
      </div>
    </div>
  );
}
