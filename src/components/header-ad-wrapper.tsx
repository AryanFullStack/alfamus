"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdUnit from "./ad-unit";

export default function HeaderAdWrapper() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  
  // Hide Ad on admin and auth pages
  const isAdminOrAuth = 
    pathname?.startsWith("/admin") || 
    pathname?.startsWith("/auth") || 
    pathname?.startsWith("/sign-in") || 
    pathname?.startsWith("/sign-up") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/redirect");


  if (isAdminOrAuth) return null;

  return (
    <div className={`bg-[#F8F6F1] border-b border-[#E8E4DC] py-2 transition-all duration-300 ${isVisible ? "opacity-100 block" : "opacity-0 h-0 p-0 overflow-hidden border-0"}`}>
      <div className="container mx-auto px-4">
        <AdUnit slot="header_top" onStatusChange={(active) => setIsVisible(active)} />
      </div>
    </div>
  );
}
