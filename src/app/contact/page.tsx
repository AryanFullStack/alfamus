"use client";

import { useState } from "react";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

const contactReasons = [
  "General Enquiry",
  "Report a Bug / Technical Issue",
  "Advertise With Us",
  "Job Listing Partnership",
  "Press / Media",
  "Privacy / GDPR Request",
  "Career Advice",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    reason: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    // Simulate form submission (replace with actual API endpoint)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <SiteNavbar />
      <div className="pt-16">
        {/* Hero */}
        <div className="py-20 relative overflow-hidden" style={{ backgroundColor: "#0F1F3D" }}>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 60%, #0D9488 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1E40AF 0%, transparent 40%)",
            }}
          />
          <div className="container mx-auto px-4 text-center relative">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ backgroundColor: "#0D9488", color: "#fff" }}
            >
              Get In Touch
            </span>
            <h1
              className="text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Contact Us
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              We're a real team of humans who genuinely care. Drop us a message and we'll get
              back to you within 24–48 working hours.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar info */}
            <div className="space-y-6">
              {/* Card: Email */}
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#0F1F3D" }}>
                  <Mail className="w-5 h-5 text-[#0D9488]" />
                </div>
                <h3 className="font-bold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                  Email Us
                </h3>
                <p className="text-gray-500 text-sm mb-2">For general queries and support:</p>
                <a href="mailto:hello@alfamus.com" className="text-[#0D9488] font-semibold text-sm hover:underline">
                  hello@alfamus.com
                </a>
                <p className="text-gray-500 text-sm mt-2 mb-1">For advertising & partnerships:</p>
                <a href="mailto:ads@alfamus.com" className="text-[#0D9488] font-semibold text-sm hover:underline">
                  ads@alfamus.com
                </a>
                <p className="text-gray-500 text-sm mt-2 mb-1">For legal & privacy matters:</p>
                <a href="mailto:legal@alfamus.com" className="text-[#0D9488] font-semibold text-sm hover:underline">
                  legal@alfamus.com
                </a>
              </div>

              {/* Card: Phone */}
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#0F1F3D" }}>
                  <Phone className="w-5 h-5 text-[#0D9488]" />
                </div>
                <h3 className="font-bold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                  Call Us
                </h3>
                <p className="text-gray-500 text-sm mb-2">
                  Speak directly to our support team (business hours only):
                </p>
                <a href="tel:+919876543210" className="text-[#0D9488] font-semibold text-sm hover:underline">
                  +91 98765 43210
                </a>
                <p className="text-gray-400 text-xs mt-1">Monday – Friday, 10 AM – 6 PM IST</p>
              </div>

              {/* Card: Location */}
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#0F1F3D" }}>
                  <MapPin className="w-5 h-5 text-[#0D9488]" />
                </div>
                <h3 className="font-bold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                  Our Address
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  alfamus Internet Pvt. Ltd.<br />
                  B-204, Tech Park, Sector 62,<br />
                  Noida, Uttar Pradesh – 201301<br />
                  India
                </p>
              </div>

              {/* Card: Response time */}
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#0F1F3D" }}>
                  <Clock className="w-5 h-5 text-[#0D9488]" />
                </div>
                <h3 className="font-bold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                  Response Time
                </h3>
                <ul className="text-gray-500 text-sm space-y-1">
                  <li>✅ General Queries: 24–48 hours</li>
                  <li>✅ Bug Reports: 48–72 hours</li>
                  <li>✅ Advertising: 24 hours</li>
                  <li>✅ Privacy Requests: Within 72 hours</li>
                </ul>
              </div>

              {/* Trust badge */}
              <div className="rounded-2xl p-5 border border-[#0D9488]/30" style={{ backgroundColor: "#0D9488" + "18" }}>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#0D9488] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#0F1F3D]">
                    <strong>Your privacy is safe.</strong> We never share your contact information
                    with third parties. All messages are encrypted and handled confidentially by
                    our team.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8">
                {status === "success" ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: "#0D9488" + "20" }}>
                      <CheckCircle className="w-8 h-8" style={{ color: "#0D9488" }} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0F1F3D] mb-3" style={{ fontFamily: "Fraunces, serif" }}>
                      Message Received!
                    </h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Thank you for reaching out, <strong>{form.name}</strong>. Our team will review
                      your message and get back to you at <strong>{form.email}</strong> within 24–48 hours.
                    </p>
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setForm({ name: "", email: "", subject: "", reason: "", message: "" });
                      }}
                      className="mt-8 px-6 py-3 rounded-xl font-semibold text-white"
                      style={{ backgroundColor: "#0D9488" }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <MessageSquare className="w-6 h-6 text-[#0D9488]" />
                      <h2 className="text-2xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Fraunces, serif" }}>
                        Send Us a Message
                      </h2>
                    </div>

                    {errorMsg && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 mb-6">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-600 text-sm">{errorMsg}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-[#0F1F3D] mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="e.g. Rahul Sharma"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#E8E4DC] rounded-xl text-[#0F1F3D] placeholder-gray-400 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#0F1F3D] mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#E8E4DC] rounded-xl text-[#0F1F3D] placeholder-gray-400 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0F1F3D] mb-1.5">
                          Reason for Contact
                        </label>
                        <select
                          id="contact-reason"
                          name="reason"
                          value={form.reason}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#E8E4DC] rounded-xl text-[#0F1F3D] text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-all bg-white"
                        >
                          <option value="">— Please select a reason —</option>
                          {contactReasons.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0F1F3D] mb-1.5">
                          Subject
                        </label>
                        <input
                          id="contact-subject"
                          name="subject"
                          type="text"
                          placeholder="Brief subject of your message"
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#E8E4DC] rounded-xl text-[#0F1F3D] placeholder-gray-400 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0F1F3D] mb-1.5">
                          Your Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={6}
                          placeholder="Please describe your query in detail. The more information you provide, the faster we can help you."
                          value={form.message}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#E8E4DC] rounded-xl text-[#0F1F3D] placeholder-gray-400 text-sm outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-all resize-none"
                        />
                        <p className="text-xs text-gray-400 mt-1 text-right">{form.message.length} characters</p>
                      </div>

                      <div className="bg-[#F8F6F1] rounded-xl p-4 text-sm text-gray-500">
                        By submitting this form you agree to our{" "}
                        <a href="/privacy" className="text-[#0D9488] hover:underline">Privacy Policy</a>.
                        We will only use your information to respond to your enquiry.
                      </div>

                      <button
                        id="contact-submit"
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
                        style={{ backgroundColor: "#0D9488", fontFamily: "Syne, sans-serif" }}
                      >
                        {status === "loading" ? (
                          <>
                            <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Additional contact contexts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-[#0D9488] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                        For Employers & Recruiters
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Interested in featuring your job listings or brand on alfamus?
                        We offer premium placement and dedicated audience targeting.
                        Email <a href="mailto:partners@alfamus.com" className="text-[#0D9488] hover:underline">partners@alfamus.com</a>.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-[#0D9488] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-[#0F1F3D] mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                        For Press & Media
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Press enquiries, interview requests, and media kits can be requested by
                        emailing{" "}
                        <a href="mailto:press@alfamus.com" className="text-[#0D9488] hover:underline">press@alfamus.com</a>.
                        We respond to verified press enquiries within 24 hours.
                      </p>
                    </div>
                  </div>
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
