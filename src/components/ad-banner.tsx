export default function AdBanner() {
  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl border border-[#E8E4DC] bg-[#F8F6F1] overflow-hidden min-h-[120px] flex flex-col items-center justify-center">
          {/* AdSense labeling - strictly following policies */}
          <div className="absolute top-2 right-3">
            <span className="text-[10px] text-[#9CA3AF] font-mono uppercase tracking-widest">
              Advertisement
            </span>
          </div>

          <div className="text-center p-6">
            <p className="text-xs font-semibold text-[#6B7280] mb-2">Sponsored content from our partners</p>
            <div className="text-[10px] text-[#9CA3AF] italic">
              Google AdSense space — Designed for premium visibility
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
