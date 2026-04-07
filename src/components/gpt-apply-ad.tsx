"use client";

import Script from "next/script";

export default function GPTApplyAd() {
  return (
    <div className="flex justify-center mb-6">
      <Script id="gpt-apply-setup" strategy="afterInteractive">
        {`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            googletag.defineSlot('/23347579022/Displayads', [[300, 250], 'fluid'], 'div-gpt-ad-1775574752880-0').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `}
      </Script>
      
      <div id='div-gpt-ad-1775574752880-0' style={{ minWidth: '300px', minHeight: '250px' }}>
        <Script id="gpt-apply-ad-call" strategy="afterInteractive">
          {`
            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1775574752880-0'); });
          `}
        </Script>
      </div>
    </div>
  );
}
