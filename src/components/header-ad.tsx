"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function HeaderAd() {
  const pathname = usePathname();

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
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script id="gpt-setup" strategy="afterInteractive">
        {`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            googletag.defineSlot('/23347579022/DisplayAds_HearterTOp', [[300, 75], [250, 250], [300, 100], [300, 250], 'fluid'], 'div-gpt-ad-1777947424819-0').addService(googletag.pubads());
            googletag.enableServices();
          });
        `}
      </Script>
      <div className="w-full flex justify-center bg-background border-b overflow-hidden py-2">
        <div 
          id='div-gpt-ad-1777947424819-0' 
          style={{ minWidth: '250px', minHeight: '75px' }}
        >
          <Script id="gpt-display" strategy="afterInteractive">
            {`
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1777947424819-0'); });
            `}
          </Script>
        </div>
      </div>
    </>
  );
}
