"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GoogleAd() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [pathname]);

  const isAdminOrAuth = 
    pathname?.startsWith("/admin") || 
    pathname?.startsWith("/auth") || 
    pathname?.startsWith("/sign-in") || 
    pathname?.startsWith("/sign-up") ||
    pathname?.startsWith("/dashboard");

  if (isAdminOrAuth) return null;

  return (
    <div key={pathname} className="w-full max-w-7xl mx-auto px-4 py-4 flex justify-center overflow-hidden">
      {/* diplaySquare */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "250px", width: "100%" }}
        data-ad-client="ca-pub-7011484437531877"
        data-ad-slot="3774162466"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
