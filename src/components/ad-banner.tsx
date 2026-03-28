export default function AdBanner() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl border border-[#E8E4DC] bg-[#F8F6F1] overflow-hidden">
          {/* Sponsored label */}
          <div className="absolute top-2 right-3">
            <span className="text-xs text-[#6B7280] font-mono uppercase tracking-widest">
              Sponsored
            </span>
          </div>
          {/* Ad slot placeholder */}
          <div className="h-24 flex items-center justify-center">
            <div className="text-center text-[#6B7280]">
              <p className="text-sm font-medium">Advertisement</p>
              <p className="text-xs opacity-60">Google AdSense slot will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
