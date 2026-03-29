"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "../../supabase/client";

interface AdUnitProps {
  slot: string;
  className?: string;
  style?: React.CSSProperties;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: "true" | "false";
  onStatusChange?: (active: boolean) => void;
}

export default function AdUnit({
  slot,
  className = "",
  style = { display: "block" },
  format = "auto",
  responsive = "true",
  onStatusChange,
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
        
        const active = data?.is_active ?? false;
        setAdData({ is_active: active, ad_code: data?.ad_code || null });
        if (onStatusChange) onStatusChange(active);
      } catch (e) {
        setAdData({ is_active: false, ad_code: null });
        if (onStatusChange) onStatusChange(false);
      }
    }
    checkStatus();
  }, [slot, supabase, onStatusChange]);

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
