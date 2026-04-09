import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | alfamus.com",
  description:
    "Learn about how alfamus.com uses cookies, including essential, analytics, and Google AdSense advertising cookies. Manage your cookie preferences here.",
};

export default function CookiesPage() {
  const cookieTable = [
    {
      name: "_ga",
      provider: "Google Analytics",
      purpose: "Registers a unique ID for website visitors to generate statistics about how they use the website.",
      type: "Analytics",
      duration: "2 years",
    },
    {
      name: "_gid",
      provider: "Google Analytics",
      purpose: "Registers a unique ID for a session to generate statistics about how the visitor uses the website.",
      type: "Analytics",
      duration: "24 hours",
    },
    {
      name: "_gat",
      provider: "Google Analytics",
      purpose: "Used by Google Analytics to throttle request rate.",
      type: "Analytics",
      duration: "1 minute",
    },
    {
      name: "IDE",
      provider: "Google Doubleclick",
      purpose: "Used by Google DoubleClick to register and report the website user's actions after viewing a Google ad.",
      type: "Advertising",
      duration: "1 year",
    },
    {
      name: "test_cookie",
      provider: "Doubleclick.net",
      purpose: "Used to check if the user's browser supports cookies.",
      type: "Advertising",
      duration: "1 day",
    },
    {
      name: "cf_clearance",
      provider: "Cloudflare",
      purpose: "Used by Cloudflare to bypass security checks and allow legitimate users to access the website.",
      type: "Security",
      duration: "Session",
    },
    {
      name: "__cf_bm",
      provider: "Cloudflare",
      purpose: "Cloudflare bot management cookie to identify and mitigate automated bot traffic.",
      type: "Security",
      duration: "30 minutes",
    },
    {
      name: "theme",
      provider: "alfamus.com",
      purpose: "Stores user's preference for dark or light mode display.",
      type: "Functional",
      duration: "1 year",
    },
    {
      name: "sb-*",
      provider: "Supabase",
      purpose: "Authentication session token for logged-in users (admin only).",
      type: "Essential",
      duration: "Session",
    },
  ];

  const typeColors: Record<string, string> = {
    Analytics: "#3B82F6",
    Advertising: "#F59E0B",
    Security: "#10B981",
    Functional: "#8B5CF6",
    Essential: "#EF4444",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <div className="py-20" style={{ backgroundColor: "#0F1F3D" }}>
          <div className="container mx-auto px-4">
            <h1
              className="text-5xl font-bold text-white"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Cookie Policy
            </h1>
            <p className="text-white/60 mt-3 text-lg">
              Last Updated: March 28, 2025
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 space-y-8 text-gray-600 text-sm leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-[#0F1F3D] mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, improve user experience, and provide information to website owners.
              </p>
              <p className="mt-3">
                Cookies do not contain executable programs, viruses, or spyware, and they cannot access other files on your computer. Most web browsers allow you to control cookies through browser settings.
              </p>
            </section>

            <hr className="border-[#E8E4DC]" />

            <section>
              <h2 className="text-xl font-bold text-[#0F1F3D] mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                How We Use Cookies
              </h2>
              <p>alfamus.com uses cookies for the following purposes:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  {
                    type: "Essential",
                    color: "#EF4444",
                    desc: "Required for the website to function. Cannot be disabled. Includes authentication and security cookies.",
                  },
                  {
                    type: "Functional",
                    color: "#8B5CF6",
                    desc: "Remember your preferences such as dark/light mode theme to enhance your experience.",
                  },
                  {
                    type: "Analytics",
                    color: "#3B82F6",
                    desc: "Help us understand how visitors use our website so we can improve it. Data is aggregated and anonymized.",
                  },
                  {
                    type: "Advertising",
                    color: "#F59E0B",
                    desc: "Used by Google AdSense to serve personalized ads based on your interests and browsing history.",
                  },
                  {
                    type: "Security",
                    color: "#10B981",
                    desc: "Used by Cloudflare to protect our website from bots, DDoS attacks, and other security threats.",
                  },
                ].map((item) => (
                  <div key={item.type} className="rounded-xl border border-[#E8E4DC] p-4">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-white text-xs font-semibold mb-2"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.type}
                    </span>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-[#E8E4DC]" />

            <section>
              <h2 className="text-xl font-bold text-[#0F1F3D] mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                Google AdSense & Advertising Cookies
              </h2>
              <p>
                We use Google AdSense to serve advertisements. Google AdSense places advertising cookies — including the <strong className="text-[#0F1F3D]">DoubleClick cookie (IDE)</strong> — on your device to:
              </p>
              <ul className="mt-3 space-y-1.5 list-disc list-inside">
                <li>Show ads relevant to your interests (personalized advertising)</li>
                <li>Limit the number of times you see an ad</li>
                <li>Measure the effectiveness of advertising campaigns</li>
                <li>Prevent the same ads from appearing repeatedly</li>
              </ul>
              <div className="mt-4 rounded-xl p-4 border border-[#F59E0B]/30" style={{ backgroundColor: "#FEF3C7" }}>
                <p className="text-sm text-yellow-800">
                  <strong>Your Choice:</strong> You can opt out of personalized advertising by Google at any time by visiting{" "}
                  <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-900">
                    adssettings.google.com
                  </a>. You can also opt out via the{" "}
                  <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-900">
                    Digital Advertising Alliance
                  </a>.
                </p>
              </div>
            </section>

            <hr className="border-[#E8E4DC]" />

            <section>
              <h2 className="text-xl font-bold text-[#0F1F3D] mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
                Cookies We Use
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F8F6F1]">
                      <th className="text-left p-3 border border-[#E8E4DC] font-bold text-[#0F1F3D]">Cookie Name</th>
                      <th className="text-left p-3 border border-[#E8E4DC] font-bold text-[#0F1F3D]">Provider</th>
                      <th className="text-left p-3 border border-[#E8E4DC] font-bold text-[#0F1F3D]">Purpose</th>
                      <th className="text-left p-3 border border-[#E8E4DC] font-bold text-[#0F1F3D]">Type</th>
                      <th className="text-left p-3 border border-[#E8E4DC] font-bold text-[#0F1F3D]">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTable.map((cookie, i) => (
                      <tr key={cookie.name} className={i % 2 === 0 ? "bg-white" : "bg-[#F8F6F1]/50"}>
                        <td className="p-3 border border-[#E8E4DC] font-mono font-semibold text-[#0F1F3D]">
                          {cookie.name}
                        </td>
                        <td className="p-3 border border-[#E8E4DC] text-gray-600">{cookie.provider}</td>
                        <td className="p-3 border border-[#E8E4DC] text-gray-600">{cookie.purpose}</td>
                        <td className="p-3 border border-[#E8E4DC]">
                          <span
                            className="px-2 py-0.5 rounded-full text-white text-xs font-semibold"
                            style={{ backgroundColor: typeColors[cookie.type] || "#6B7280" }}
                          >
                            {cookie.type}
                          </span>
                        </td>
                        <td className="p-3 border border-[#E8E4DC] text-gray-600 whitespace-nowrap">{cookie.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-[#E8E4DC]" />

            <section>
              <h2 className="text-xl font-bold text-[#0F1F3D] mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                Managing Your Cookie Preferences
              </h2>
              <p>
                You can control and manage cookies in several ways. Please note that removing or blocking cookies may impact your user experience:
              </p>

              <div className="mt-4 space-y-3">
                {[
                  { browser: "Google Chrome", path: "Settings → Privacy and Security → Cookies and other site data" },
                  { browser: "Mozilla Firefox", path: "Options → Privacy & Security → Cookies and Site Data" },
                  { browser: "Apple Safari", path: "Preferences → Privacy → Manage Website Data" },
                  { browser: "Microsoft Edge", path: "Settings → Cookies and Site Permissions → Cookies" },
                  { browser: "Opera", path: "Settings → Advanced → Privacy & Security → Content Settings → Cookies" },
                ].map((item) => (
                  <div key={item.browser} className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F6F1]">
                    <span className="font-semibold text-[#0F1F3D] flex-shrink-0 w-32">{item.browser}:</span>
                    <span className="text-gray-600">{item.path}</span>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-[#E8E4DC]" />

            <section>
              <h2 className="text-xl font-bold text-[#0F1F3D] mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                Contact Us
              </h2>
              <p>
                If you have questions about our use of cookies, please contact us at:
              </p>
              <p className="mt-2">
                <strong className="text-[#0F1F3D]">Email:</strong>{" "}
                <a href="mailto:privacy@alfamus.com" className="text-[#0D9488] hover:underline">privacy@alfamus.com</a>
                <br />
                <strong className="text-[#0F1F3D]">Contact Form:</strong>{" "}
                <a href="/contact" className="text-[#0D9488] hover:underline">alfamus.com/contact</a>
              </p>
            </section>
          </div>
        </div>
      <SiteFooter />
    </div>
  );
}
