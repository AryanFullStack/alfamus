"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function InterstitialAd() {
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
      <Script id="gpt-interstitial-setup" strategy="afterInteractive">
        {`
          window.googletag = window.googletag || { cmd: [] };
          googletag.cmd.push(function () {
            var interstitialSlot = googletag.defineOutOfPageSlot(
              '/23347579022/Interstitial',
              googletag.enums.OutOfPageFormat.INTERSTITIAL
            );

            if (interstitialSlot) {
              interstitialSlot.addService(googletag.pubads());
            }

            // Standard GPT initialization
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();

            if (interstitialSlot) {
              googletag.display(interstitialSlot);
            }
          });
        `}
      </Script>
    </>
  );
}
