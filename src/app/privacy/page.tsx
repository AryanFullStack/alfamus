import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | alfamus.com",
  description:
    "Read alfamus.com's full Privacy Policy. Learn how we collect, use, and protect your personal data, including our use of Google AdSense and cookies.",
};

export default function PrivacyPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: `Welcome to alfamus.com ("we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website alfamus.com and use our services.

We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this policy or our practices with regard to your personal information, please contact us at privacy@alfamus.com.

This Privacy Policy applies to all information collected through our website, related services, sales, marketing, or events. Please read it carefully. If you disagree with the terms of this Privacy Policy, please discontinue use of our site.`,
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      content: `We collect information in the following ways:

**Information You Provide Directly:**
• Email address (when you subscribe to our newsletter)
• Name and contact details (when you use our contact form)
• Account credentials (when you create an account, if applicable)
• Any other information you choose to share with us

**Information Collected Automatically:**
When you visit alfamus.com, we may automatically collect:
• Device information (browser type, operating system, device type)
• Log data (IP address, pages visited, time spent, referring URL)
• Cookie identifiers and similar tracking technologies
• Clickstream data and interactions with our site

**Information from Third Parties:**
We may receive information about you from third-party services such as:
• Google Analytics (website usage statistics)
• Google AdSense (advertising performance data)
• Supabase (our database provider for newsletter subscriptions)`,
    },
    {
      id: "use-of-information",
      title: "3. How We Use Your Information",
      content: `We use the information we collect to:

• **Provide our Services:** Deliver job listings, career tools, and blog content tailored to your interests
• **Send Newsletters:** If you subscribe, send you weekly job picks and career tips (you can unsubscribe any time)
• **Improve Our Platform:** Analyse usage patterns to optimize user experience and site performance
• **Customer Support:** Respond to your enquiries, bug reports, and feedback
• **Security:** Monitor for and prevent fraudulent, harmful, or illegal activity
• **Legal Compliance:** Comply with applicable laws, regulations, and legal processes
• **Advertising:** Serve relevant advertisements through Google AdSense, which uses cookies and browsing history to show personalized ads

We do NOT use your data to:
• Sell your personal information to third parties
• Send unsolicited commercial messages unrelated to our services
• Build invasive personal profiles for data brokers`,
    },
    {
      id: "google-adsense",
      title: "4. Google AdSense & Third-Party Advertising",
      content: `alfamus.com uses Google AdSense to display advertisements. Google AdSense is operated by Google LLC ("Google").

**How Google AdSense Works:**
Google uses cookies and similar technologies (such as the 'DoubleClick' cookie) to serve ads based on your prior visits to alfamus.com or other websites on the internet. These interests-based (personalized) ads are delivered through Google's advertising network.

**What Data Google Collects:**
Google may collect your:
• IP address
• Cookie identifiers
• Browser and device information
• Pages visited and links clicked

**Your Choices:**
• You can opt out of personalized advertising by visiting: https://www.google.com/settings/ads
• You can opt out via the Network Advertising Initiative opt-out page at: http://www.networkadvertising.org/managing/opt_out.asp
• You can manage cookie preferences through your browser settings

**Google's Privacy Policy:**
For full details of how Google uses your data, please visit: https://policies.google.com/privacy

We comply with all Google AdSense program policies. We do NOT click on our own ads, use traffic bots, encourage invalid clicks, or manipulate ad impressions in any way. All ad traffic on alfamus.com consists of genuine human visitors.`,
    },
    {
      id: "cookies",
      title: "5. Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to track activity on our website and hold certain information.

**Types of Cookies We Use:**

**Essential Cookies:** Required for the website to function. These cannot be disabled.
• Authentication cookies (if you're signed in)
• Security cookies (Cloudflare Turnstile for bot protection)

**Analytics Cookies:** Help us understand how visitors interact with our website.
• Google Analytics (_ga, _gid, _gat)

**Advertising Cookies:** Used by Google AdSense to serve relevant advertisements.
• DoubleClick cookies
• Google AdSense cookies

**Functionality Cookies:** Remember your preferences.
• Theme preferences (dark/light mode)

**How to Control Cookies:**
You can control cookies through your browser settings:
• Chrome: Settings → Privacy and Security → Cookies
• Firefox: Options → Privacy & Security → Cookies and Site Data
• Safari: Preferences → Privacy
• Edge: Settings → Cookies and Site Permissions

Please note: Disabling certain cookies may affect the functionality of our website and services.`,
    },
    {
      id: "data-sharing",
      title: "6. Sharing Your Information",
      content: `We do NOT sell, trade, or rent your personal information to any third parties.

We may share your information only in the following limited circumstances:

**Service Providers:**
We work with trusted third-party companies who assist us in operating our website:
• Supabase (database and newsletter subscription storage) — GDPR compliant
• Cloudflare (CDN, security, bot protection) — GDPR compliant
• Google (Analytics and AdSense) — see Section 4 above
• Vercel / Cloudflare Workers (website hosting)

All service providers are contractually obligated to handle your data only as directed by us and in accordance with applicable privacy laws.

**Legal Requirements:**
We may disclose your information if required by law, a court order, or government authority, or if we believe disclosure is necessary to:
• Comply with a legal obligation
• Protect or defend our rights and property
• Prevent or investigate fraud or illegal activity

**Business Transfers:**
In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred. We will notify you via a prominent notice on our website.`,
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      content: `We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.

• **Newsletter subscriber emails:** Retained until you unsubscribe. After unsubscribing, we delete your email within 30 days.
• **Contact form submissions:** Retained for up to 2 years for support history and legal purposes.
• **Analytics data:** Aggregated and anonymized data may be retained indefinitely. Raw logs are typically retained for 90 days.
• **Log data:** IP addresses and server logs retained for up to 90 days for security and fraud prevention.`,
    },
    {
      id: "your-rights",
      title: "8. Your Rights",
      content: `Depending on your location, you may have the following rights regarding your personal data:

**For All Users:**
• **Access:** Request a copy of the personal data we hold about you
• **Correction:** Request that we correct inaccurate data
• **Deletion:** Request that we delete your personal data ("right to be forgotten")
• **Unsubscribe:** Opt out of our newsletter at any time via the unsubscribe link in any email
• **Opt out of personalized ads:** See Section 4 above

**For EU/EEA Residents (GDPR):**
In addition to the above, you have the right to:
• Data portability (receive your data in a machine-readable format)
• Object to processing of your data
• Restrict processing of your data
• Lodge a complaint with your local data protection authority

**For California Residents (CCPA):**
You have the right to know what personal data we collect, the right to delete your data, and the right to opt out of the "sale" of personal information (we do NOT sell personal data).

To exercise any of these rights, please contact us at: privacy@alfamus.com. We will respond within 30 days.`,
    },
    {
      id: "children",
      title: "9. Children's Privacy",
      content: `alfamus.com is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children under 13.

If you are a parent or guardian and believe your child under 13 has submitted personal information to us, please contact us immediately at privacy@alfamus.com and we will take steps to delete such information.

Users between 13 and 18 should use our site only with the involvement and consent of a parent or guardian.`,
    },
    {
      id: "security",
      title: "10. Data Security",
      content: `We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

Our security measures include:
• HTTPS encryption for all data in transit (SSL/TLS)
• Row-level security in our Supabase database
• Cloudflare bot protection and DDoS mitigation
• Access controls limiting who can access your data
• Regular security reviews and updates

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. Please also take care to protect your own data — never share sensitive personal information in contact forms or messages.`,
    },
    {
      id: "international",
      title: "11. International Data Transfers",
      content: `alfamus.com is based in India and our servers may be located in India, the United States, or the European Union, depending on our hosting providers.

If you are located outside India and choose to provide information to us, please note that your data may be transferred to and processed in India and other countries where our servers may be located.

We ensure that any international transfer of data is done in compliance with applicable data protection laws, including through use of standard contractual clauses (SCCs) where required under GDPR.`,
    },
    {
      id: "updates",
      title: "12. Updates to This Policy",
      content: `We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date at the top of this page, and the updated version will be effective as soon as it is accessible.

If we make material changes to this Privacy Policy, we may notify you either by:
• Posting a prominently visible notice on our website
• Sending an email to newsletter subscribers

We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.`,
    },
    {
      id: "contact",
      title: "13. Contact Us",
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out to us:

**Email:** privacy@alfamus.com
**General Contact:** hello@alfamus.com
**Contact Form:** alfamus.com/contact

**Mailing Address:**
alfamus Internet Pvt. Ltd.
B-204, Tech Park, Sector 62,
Noida, Uttar Pradesh – 201301, India

We are committed to resolving any complaints or concerns about our privacy practices promptly and transparently.`,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <div className="py-20" style={{ backgroundColor: "#0F1F3D" }}>
          <div className="container mx-auto px-4">
            <h1
              className="text-5xl font-bold text-white"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Privacy Policy
            </h1>
            <p className="text-white/60 mt-3 text-lg">
              Last Updated: March 28, 2025 &nbsp;|&nbsp; Effective Date: March 28, 2025
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5 sticky top-24">
                <h2
                  className="text-sm font-bold text-[#0F1F3D] uppercase tracking-widest mb-4"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Contents
                </h2>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-xs text-gray-500 hover:text-[#0D9488] transition-colors py-1"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8">
                <p className="text-gray-600 leading-relaxed mb-8 border-b border-[#E8E4DC] pb-8">
                  At alfamus.com, we take your privacy seriously. This document describes in plain
                  language exactly how we handle your data, including our use of Google AdSense
                  advertising. We aim to be fully transparent — no hidden practices, no data selling.
                </p>

                <div className="space-y-10">
                  {sections.map((s) => (
                    <section key={s.id} id={s.id}>
                      <h2
                        className="text-xl font-bold text-[#0F1F3D] mb-4"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        {s.title}
                      </h2>
                      <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                        {s.content.split("**").map((part, i) =>
                          i % 2 === 1 ? (
                            <strong key={i} className="text-[#0F1F3D]">
                              {part}
                            </strong>
                          ) : (
                            part
                          )
                        )}
                      </div>
                      <hr className="border-[#E8E4DC] mt-8" />
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      <SiteFooter />
    </div>
  );
}
