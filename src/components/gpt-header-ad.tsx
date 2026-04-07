"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function GPTHeaderAd() {
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
    <>
      <Script
        id="gpt-init"
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script id="gpt-setup" strategy="afterInteractive">
        {`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            googletag.defineSlot('/23347579022/Topheaderads', [[250, 250], [336, 280], [300, 250], 'fluid'], 'div-gpt-ad-1775572649638-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `}
      </Script>
      <div className="flex justify-center bg-[#F8F6F1] border-b border-[#E8E4DC] py-4 transition-all duration-300">
        <div id='div-gpt-ad-1775572649638-0' style={{ minWidth: '250px', minHeight: '250px' }}>
          <Script id="gpt-display" strategy="afterInteractive">
            {`
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1775572649638-0'); });
            `}
          </Script>
        </div>
      </div>
    </>
  );
}
