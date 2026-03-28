import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | alfamus.com",
  description:
    "Read alfamus.com's Terms and Conditions. Understand your rights and responsibilities when using our AI-powered job aggregation platform.",
};

export default function TermsPage() {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing or using alfamus.com and any of its subdomains, mobile versions, or related services (collectively, the "Platform"), you confirm that you:

• Are at least 13 years of age (or 18 in certain jurisdictions)
• Have read, understood, and agree to be bound by these Terms and Conditions
• Have the legal capacity to enter into a binding agreement

If you are accessing the Platform on behalf of a business or organization, you represent that you have authority to bind that entity to these Terms.

If you do not agree to these Terms, please discontinue use of the Platform immediately. Continued use of the Platform constitutes acceptance of these Terms and any future updates to them.`,
    },
    {
      id: "description",
      title: "2. Description of Service",
      content: `alfamus.com is an AI-powered job aggregation and career resources platform. Our services include:

• **Job Aggregation:** Automatically collecting and presenting job listings from third-party sources including company career pages, job boards, and public APIs
• **Job Search Tools:** Filters, search functionality, and AI-powered job recommendations
• **Career Tools:** Resume tips, interview preparation guides, salary benchmarks
• **AI Career Chatbot:** An AI-powered assistant that provides general career advice
• **Blog & Articles:** Educational content on career development, job market trends, and professional growth
• **Newsletter:** Optional weekly email digest of job picks and career tips

We are a technology platform and an aggregator — we are NOT a recruitment agency, staffing firm, or direct employer. We do not place candidates in jobs, conduct interviews, or make hiring decisions.`,
    },
    {
      id: "job-listings",
      title: "3. Job Listings Disclaimer",
      content: `alfamus.com aggregates job listings from various external third-party sources. We make reasonable efforts to ensure the accuracy and freshness of listings, but we cannot guarantee the following:

• **Accuracy:** Job listings may contain errors, be outdated, or no longer be available at the time you apply
• **Authenticity:** We aggregate from many sources and cannot individually verify every employer or listing
• **Completeness:** Not all jobs in the market will appear on our platform
• **Employment:** Appearing on our platform does not guarantee any employment outcome

**Your Responsibility:**
Before applying to any job listed on alfamus.com:
• Verify the legitimacy of the employer independently
• Research the company through official websites, LinkedIn, and trusted review platforms
• Never pay money to apply for a job — legitimate employers do not charge candidates
• Be cautious of listings requesting personal financial information during the application process

**Job Scam Warning:**
If you encounter a job listing that appears fraudulent or suspicious, please report it to us at abuse@alfamus.com. We take such reports seriously and will investigate and remove fraudulent listings promptly.

alfamus.com shall not be liable for any damages, losses, or outcomes arising from your reliance on job listings displayed on our Platform.`,
    },
    {
      id: "user-conduct",
      title: "4. User Responsibilities & Acceptable Use",
      content: `By using alfamus.com, you agree to use the Platform only for lawful purposes and in a manner consistent with all applicable local, national, and international laws and regulations.

**You agree NOT to:**
• Use automated bots, scrapers, or crawlers to access or extract data from the Platform without prior written consent
• Attempt to reverse engineer, hack, or compromise the security or integrity of the Platform
• Impersonate any person, company, or entity
• Post or transmit any harmful, offensive, defamatory, fraudulent, or misleading content
• Use the Platform to send spam, phishing messages, or unsolicited commercial communications
• Circumvent any security features or access controls
• Artificially click on ads, manipulate ad impressions, or engage in click fraud
• Collect or harvest personal data of other users without consent
• Use our AI chatbot for any unlawful, deceptive, or harmful purposes
• Attempt to gain unauthorized access to any part of the Platform or its infrastructure

**Violations** of these terms may result in immediate suspension of access and may be reported to relevant authorities.`,
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property",
      content: `**Our Content:**
All original content on alfamus.com — including but not limited to: text, graphics, logos, button icons, images, data compilations, software, and the overall design and arrangement — is the proprietary property of alfamus Internet Pvt. Ltd. and is protected by Indian and international copyright, trademark, and other intellectual property laws.

**Permitted Use:**
You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for your personal, non-commercial use only.

**Prohibited Use:**
You may NOT:
• Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Platform for commercial purposes
• Republish job listings or other Platform content in bulk without written permission
• Use our trademarks, brand name, or logos without prior written consent

**Third-Party Content:**
Job listings, company logos, and other third-party content displayed on the Platform are the property of their respective owners. alfamus.com does not claim ownership over third-party content.

**Feedback:**
If you submit feedback, suggestions, or ideas to us, you grant us a royalty-free, perpetual, irrevocable license to use such feedback for any purpose.`,
    },
    {
      id: "advertising",
      title: "6. Advertising on Our Platform",
      content: `alfamus.com displays advertisements served by Google AdSense and may include other third-party advertising networks.

**What this means for you:**
• Ads are served automatically based on your browsing history and interests (personalized ads) or based on page content (contextual ads)
• We do not control the specific ads shown to you
• Clicking on ads will take you to third-party websites governed by their own terms and privacy policies
• We receive revenue when you click on or view ads — this revenue funds our free platform

**Ad Policies We Uphold:**
• We do not place ads on pages with illegal content, adult content, or content that violates Google AdSense policies
• We do not artificially inflate ad views or clicks
• We do not encourage users to click on ads
• All ad traffic comes from genuine human users

**Ad Opt-Out:**
You can opt out of personalized advertising at: https://adssettings.google.com`,
    },
    {
      id: "ai-tools",
      title: "7. AI Tools & Career Chatbot",
      content: `alfamus.com offers an AI-powered career advice chatbot powered by third-party large language models.

**Important Limitations:**
• The AI chatbot provides **general career guidance only** and does not constitute professional legal, financial, or HR advice
• AI responses may be inaccurate, outdated, or inappropriate for your specific situation
• You should not rely solely on AI-generated advice for important life or career decisions
• We do not guarantee the accuracy, reliability, or completeness of any AI-generated content

**User Responsibility:**
You are solely responsible for evaluating AI-generated advice before acting on it. For professional career advice, please consult a qualified career counselor or HR professional.

**Data & Privacy:**
Conversations with the AI chatbot may be used to improve our service. Please refer to our Privacy Policy for details on how chatbot data is handled.`,
    },
    {
      id: "third-party-links",
      title: "8. Third-Party Links & Websites",
      content: `The Platform may contain links to third-party websites, including job application portals, company career pages, and external resources. These links are provided solely for your convenience.

alfamus.com does not control third-party websites and is not responsible for:
• Their content, privacy practices, or terms of service
• Any goods, services, or information they may offer
• Any damages or losses arising from your interaction with them

We strongly recommend reading the privacy policy and terms of service of any third-party website you visit. The inclusion of a third-party link on our platform does not constitute our endorsement of that website or its operators.`,
    },
    {
      id: "disclaimer",
      title: "9. Disclaimers & Limitation of Liability",
      content: `**No Warranties:**
The Platform and all content, tools, and services are provided on an "AS IS" and "AS AVAILABLE" basis, without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.

**No Guarantee of Employment:**
alfamus.com does not guarantee that using our Platform will result in job interviews, offers, or employment. Job search outcomes depend on many factors outside our control, including the applicant's qualifications, the job market, and employer decisions.

**Limitation of Liability:**
To the fullest extent permitted by applicable law, alfamus Internet Pvt. Ltd. shall not be liable for any:
• Direct, indirect, incidental, special, consequential, or punitive damages
• Loss of profits, data, or business opportunities
• Damages resulting from reliance on inaccurate job listings
• Damages arising from third-party website interactions
• Damages resulting from unauthorized access to our Platform

Our total liability to you for any claim arising from use of the Platform shall not exceed ₹1,000 (Indian Rupees One Thousand) or the equivalent in your local currency.`,
    },
    {
      id: "privacy",
      title: "10. Privacy",
      content: `Your use of alfamus.com is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy at alfamus.com/privacy to understand our practices.

By using the Platform, you consent to the collection and use of your information as described in our Privacy Policy, including our use of Google AdSense for serving advertisements.`,
    },
    {
      id: "termination",
      title: "11. Termination",
      content: `We reserve the right to suspend or terminate your access to the Platform, at our sole discretion, without notice, for conduct that we believe:

• Violates these Terms and Conditions
• Is harmful to other users, third parties, or the Platform
• Exposes us to legal liability
• Constitutes fraudulent, abusive, or illegal activity

Upon termination, all rights granted to you under these Terms will immediately cease. Provisions that by their nature should survive termination (such as disclaimers and limitations of liability) will continue to apply.`,
    },
    {
      id: "changes",
      title: "12. Changes to These Terms",
      content: `We reserve the right to update or modify these Terms and Conditions at any time. When we make changes, we will:

• Update the "Last Updated" date at the top of this page
• Post a notice on our website for material changes
• Where feasible, notify newsletter subscribers via email

Your continued use of the Platform after any changes constitutes your acceptance of the new Terms. If you do not agree to the updated Terms, please discontinue using the Platform.

We encourage you to review these Terms periodically to stay informed.`,
    },
    {
      id: "governing-law",
      title: "13. Governing Law & Disputes",
      content: `These Terms and Conditions, and any disputes arising from your use of alfamus.com, shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.

**Dispute Resolution:**
In the event of a dispute, we encourage users to first contact us at legal@alfamus.com to seek an informal resolution. We will make every reasonable effort to resolve disputes amicably.

**Jurisdiction:**
Any legal proceedings arising out of or related to these Terms or the Platform shall be subject to the exclusive jurisdiction of the courts located in Noida, Uttar Pradesh, India.`,
    },
    {
      id: "contact",
      title: "14. Contact Information",
      content: `If you have any questions about these Terms and Conditions, please contact us:

**Email:** legal@alfamus.com
**General Contact:** hello@alfamus.com
**Contact Form:** alfamus.com/contact

**Mailing Address:**
alfamus Internet Pvt. Ltd.
B-204, Tech Park, Sector 62,
Noida, Uttar Pradesh – 201301, India

We will respond to legal enquiries within 30 business days.`,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      <div className="pt-16">
        <div className="py-20" style={{ backgroundColor: "#0F1F3D" }}>
          <div className="container mx-auto px-4">
            <h1
              className="text-5xl font-bold text-white"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Terms &amp; Conditions
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
                  These Terms and Conditions govern your access to and use of alfamus.com. By using our
                  platform you agree to these terms in full. Please read them carefully before proceeding.
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
      </div>
      <SiteFooter />
    </div>
  );
}
