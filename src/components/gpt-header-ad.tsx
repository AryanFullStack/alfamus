"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";

export default function GPTHeaderAd() {
  const pathname = usePathname();

  // Hide Ad on admin, auth, dashboard and redirect pages
  const isExcluded = 
    pathname?.startsWith("/admin") || 
    pathname?.startsWith("/auth") || 
    pathname?.startsWith("/sign-in") || 
    pathname?.startsWith("/sign-up") ||
    pathname?.startsWith("/dashboard");

  if (isExcluded) return null;

  return (
    <>
      <Script
        id="gpt-header-init"
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script id="gpt-header-setup" strategy="afterInteractive">
        {`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            googletag.defineSlot('/23347579022/Displayads', [[300, 250], 'fluid'], 'div-gpt-ad-1775655830026-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `}
      </Script>
      <div className="flex justify-center bg-[#F8F6F1] border-b border-[#E8E4DC] transition-all duration-300">
        <div id='div-gpt-ad-1775655830026-0' style={{ minWidth: '300px', minHeight: '250px' }}>
          <Script id="gpt-header-display" strategy="afterInteractive">
            {`
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1775655830026-0'); });
            `}
          </Script>
        </div>
      </div>
    </>
  );
}
