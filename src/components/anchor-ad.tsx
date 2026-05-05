"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function AnchorAd() {
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
      <Script id="gpt-anchor-setup" strategy="afterInteractive">
        {`
          window.googletag = window.googletag || { cmd: [] };
          googletag.cmd.push(function () {
            var anchorSlot = googletag.defineOutOfPageSlot(
              '/23347579022/Anchor',
              googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
            );

            if (anchorSlot) {
              anchorSlot.addService(googletag.pubads());
            }

            googletag.pubads().enableSingleRequest();
            googletag.enableServices();

            if (anchorSlot) {
              googletag.display(anchorSlot);
            }
          });
        `}
      </Script>
    </>
  );
}
