import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

export const metadata = {
  title: "Terms of Service | alfamus.com",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      <div className="pt-16">
        <div className="bg-[#0F1F3D] py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "Fraunces, serif" }}>Terms of Service</h1>
            <p className="text-white/60 mt-2">Last updated: January 2025</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 prose prose-lg max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using alfamus.com, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>

            <h2>2. Service Description</h2>
            <p>alfamus.com is a job aggregation and career resources platform. We aggregate job listings from various sources and provide career tools, blog content, and AI-powered career assistance.</p>

            <h2>3. Job Listings Disclaimer</h2>
            <p>alfamus.com aggregates job listings from external sources. We do not guarantee the accuracy, completeness, or availability of any job listing. We are not responsible for any errors or omissions in job listings, nor for any losses or damages arising from the use of such information.</p>

            <h2>4. User Responsibilities</h2>
            <p>You agree to use alfamus.com only for lawful purposes. You must not use our service to transmit any harmful, offensive, or otherwise objectionable content. You are responsible for verifying the legitimacy of any job listing before applying.</p>

            <h2>5. Intellectual Property</h2>
            <p>The content on alfamus.com, including text, graphics, logos, and software, is the property of alfamus.com and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>

            <h2>6. Limitation of Liability</h2>
            <p>alfamus.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of (or inability to access or use) our service.</p>

            <h2>7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify users of significant changes via email or a prominent notice on our website.</p>

            <h2>8. Contact</h2>
            <p>For questions about these Terms of Service, please contact legal@alfamus.com.</p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
