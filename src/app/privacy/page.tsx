import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

export const metadata = {
  title: "Privacy Policy | alfamus.com",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      <div className="pt-16">
        <div className="bg-[#0F1F3D] py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "Fraunces, serif" }}>Privacy Policy</h1>
            <p className="text-white/60 mt-2">Last updated: January 2025</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 prose prose-lg max-w-none">
            <h2>1. Information We Collect</h2>
            <p>alfamus.com collects information you provide directly to us, such as when you subscribe to our newsletter, create an account, or interact with our AI chatbot. This may include your email address and name.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, send you newsletters and career tips (if subscribed), personalize your experience, and display relevant job listings.</p>

            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or serving you, provided those parties agree to keep this information confidential.</p>

            <h2>4. Advertising</h2>
            <p>We use Google AdSense to serve advertisements on our platform. Google's use of advertising cookies enables them to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>

            <h2>5. Cookies</h2>
            <p>We use cookies to improve your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookies through your browser settings.</p>

            <h2>6. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

            <h2>7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at privacy@alfamus.com.</p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
