"use client";

import Script from "next/script";

export default function GPTDisplayAd() {
  return (
    <div className="flex justify-center my-6">
      <Script id="gpt-display-setup" strategy="afterInteractive">
        {`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            googletag.defineSlot('/23347579022/Displayads', [[300, 250], 'fluid'], 'div-gpt-ad-1775574721878-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `}
      </Script>
      
      <div id='div-gpt-ad-1775574721878-0' style={{ minWidth: '300px', minHeight: '250px' }}>
        <Script id="gpt-display-ad-call" strategy="afterInteractive">
          {`
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1775574721878-0'); });
          `}
        </Script>
      </div>
    </div>
  );
}
