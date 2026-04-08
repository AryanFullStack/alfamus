"use client";
import Script from "next/script";

interface GPTFeedAdProps {
  index: number;
}

export default function GPTFeedAd({ index }: GPTFeedAdProps) {
  const adId = `div-gpt-ad-1775574870023-${index}`;

  return (
    <div className="flex justify-center my-8 w-full">
      <Script id={`gpt-feed-setup-${index}`} strategy="afterInteractive">
        {`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            googletag.defineSlot('/23347579022/Displayads', [[300, 250], 'fluid'], '${adId}').addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `}
      </Script>
      <div id={adId} style={{ minWidth: '300px', minHeight: '250px' }} className="bg-white p-4 rounded-2xl border border-[#E8E4DC] shadow-sm">
        <Script id={`gpt-feed-display-${index}`} strategy="afterInteractive">
          {`
            googletag.cmd.push(function() { googletag.display('${adId}'); });
          `}
        </Script>
      </div>
    </div>
  );
}
