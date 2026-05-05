"use client";

import Script from "next/script";

export default function JobsBeforeListingsAd() {
  return (
    <>
      <Script
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script id="gpt-setup-before-listings" strategy="afterInteractive">
        {`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            googletag.defineSlot('/23347579022/BeforeSearchbar', [[250, 250], [300, 100], [300, 75], [300, 250], 'fluid'], 'div-gpt-ad-1777949293556-0').addService(googletag.pubads());
            googletag.enableServices();
          });
        `}
      </Script>
      <div className="w-full flex justify-center bg-[#F8F6F1] py-4 overflow-hidden">
        <div 
          id='div-gpt-ad-1777949293556-0' 
          style={{ minWidth: '250px', minHeight: '75px' }}
        >
          <Script id="gpt-display-before-listings" strategy="afterInteractive">
            {`
              googletag.cmd.push(function() { googletag.display('div-gpt-ad-1777949293556-0'); });
            `}
          </Script>
        </div>
      </div>
    </>
  );
}
