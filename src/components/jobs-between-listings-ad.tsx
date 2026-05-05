"use client";

import Script from "next/script";

interface JobsBetweenListingsAdProps {
  id?: string;
}

export default function JobsBetweenListingsAd({ id = "div-gpt-ad-1777984356279-0" }: JobsBetweenListingsAdProps) {
  return (
    <>
      <Script
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script id={`gpt-setup-between-${id}`} strategy="afterInteractive">
        {`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            googletag.defineSlot('/23347579022/betweenjobs', ['fluid', [300, 75], [250, 250], [300, 100], [300, 250]], '${id}').addService(googletag.pubads());
            googletag.enableServices();
          });
        `}
      </Script>
      <div className="w-full flex justify-center py-6 overflow-hidden">
        <div 
          id={id} 
          style={{ minWidth: '250px', minHeight: '75px' }}
        >
          <Script id={`gpt-display-between-${id}`} strategy="afterInteractive">
            {`
              googletag.cmd.push(function() { googletag.display('${id}'); });
            `}
          </Script>
        </div>
      </div>
    </>
  );
}
