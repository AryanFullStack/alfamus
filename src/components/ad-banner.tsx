export default function AdBanner() {
  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl border border-[#E8E4DC] bg-[#F8F6F1] overflow-hidden min-h-[120px] flex flex-col items-center justify-center">
          {/* AdSense labeling - strictly following policies */}
          <div className="absolute top-2 right-3">
            <span className="text-[9px] text-[#9CA3AF] font-medium uppercase tracking-[0.2em]">
              Sponsored
            </span>
          </div>

          <div className="text-center p-8">
            <div className="inline-flex items-center gap-2 mb-3 bg-[#E8E4DC]/30 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse" />
              <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">Ad Space</p>
            </div>
            <p className="text-sm text-[#4B5563] italic font-medium">
              Google ads will appear here automatically
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
