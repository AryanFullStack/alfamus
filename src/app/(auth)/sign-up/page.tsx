import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";
import { signUpAction } from "@/app/actions";
import { UrlProvider } from "@/components/url-provider";
import { Briefcase } from "lucide-react";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F8F6F1" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 justify-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#0F1F3D] flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#0D9488]" />
            </div>
            <span className="text-2xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
              alfamus<span className="text-[#0D9488]">.com</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
            Create your account
          </h1>
          <p className="text-[#6B7280] mt-2 text-sm">
            Already have an account?{" "}
            <Link className="text-[#0D9488] font-semibold hover:underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 shadow-sm">
          <UrlProvider>
            <form className="flex flex-col gap-5">
              <div>
                <label htmlFor="full_name" className="block text-sm font-semibold text-[#0F1F3D] mb-1.5" style={{ fontFamily: "Syne, sans-serif" }}>
                  Full Name
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#0F1F3D] mb-1.5" style={{ fontFamily: "Syne, sans-serif" }}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#0F1F3D] mb-1.5" style={{ fontFamily: "Syne, sans-serif" }}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E4DC] text-sm text-[#0F1F3D] bg-[#F8F6F1] outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/20 transition-colors"
                />
              </div>

              <SubmitButton
                formAction={signUpAction}
                pendingText="Creating account..."
                className="w-full px-6 py-3 bg-[#0F1F3D] text-white font-semibold rounded-xl hover:bg-[#0D9488] transition-all text-sm"
              >
                Create Account
              </SubmitButton>

              <FormMessage message={searchParams} />
            </form>
          </UrlProvider>
        </div>

        <p className="text-center text-xs text-[#6B7280] mt-6">
          By signing up, you agree to our{" "}
          <Link href="/privacy" className="hover:text-[#0D9488] transition-colors">Privacy Policy</Link>
          {" "}and{" "}
          <Link href="/terms" className="hover:text-[#0D9488] transition-colors">Terms of Service</Link>
        </p>
      </div>
    </div>
  );
}

