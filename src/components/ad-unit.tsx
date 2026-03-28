"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "../../supabase/client";

interface AdUnitProps {
  slot: string;
  className?: string;
  style?: React.CSSProperties;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: "true" | "false";
}

export default function AdUnit({
  slot,
  className = "",
  style = { display: "block" },
  format = "auto",
  responsive = "true",
}: AdUnitProps) {
  const adInited = useRef(false);
  const [adData, setAdData] = useState<{ is_active: boolean, ad_code: string | null } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function checkStatus() {
      try {
        const { data } = await supabase
          .from("ad_units")
          .select("is_active, ad_code")
          .eq("slot", slot)
          .maybeSingle();
        
        setAdData(data || { is_active: true, ad_code: null });
      } catch (e) {
        setAdData({ is_active: true, ad_code: null });
      }
    }
    checkStatus();
  }, [slot, supabase]);

  useEffect(() => {
    // Only initialize once per mount and if active (only for default AdSense)
    if (typeof window !== "undefined" && !adInited.current && adData?.is_active === true && !adData.ad_code) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adInited.current = true;
      } catch (err) {
        console.error("AdSense push failed:", err);
      }
    }
  }, [adData]);

  if (adData?.is_active === false) return null;
  if (adData === null) return <div className="h-[90px] w-full animate-pulse bg-slate-100 rounded-xl" />;

  // If custom code is provided and it's not just a placeholder, render it safely
  if (adData.ad_code && adData.ad_code.trim().length > 20) {
    return (
      <div 
        className={`ad-container ${className}`} 
        dangerouslySetInnerHTML={{ __html: adData.ad_code }} 
      />
    );
  }

  return (
    <div className={`ad-container ${className}`} key={slot}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-7011484437531877"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
