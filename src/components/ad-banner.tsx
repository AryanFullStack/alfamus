"use client";
import { useState } from "react";
import AdUnit from "./ad-unit";

export default function AdBanner() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className={`py-8 bg-white transition-all duration-500 ${isVisible ? "block" : "hidden h-0 p-0"}`}>
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl border border-[#E8E4DC] bg-[#F8F6F1] overflow-hidden min-h-[120px] flex flex-col items-center justify-center">
          {/* AdSense labeling - strictly following policies */}
          <div className="absolute top-2 right-3">
            <span className="text-[9px] text-[#9CA3AF] font-medium uppercase tracking-[0.2em]">
              Sponsored
            </span>
          </div>

          <div className="w-full max-w-4xl mx-auto py-4">
            <AdUnit 
              slot="page_bottom" 
              onStatusChange={(active) => setIsVisible(active)} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
