"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles, ChevronLeft, MessageCircle } from "lucide-react";
import { createClient } from "../../supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PROFILES = [
  {
    id: "career-coach",
    name: "Career Coach",
    description: "Job search & interview strategy",
    emoji: "🎯",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "tech-expert",
    name: "Tech Expert",
    description: "Coding interviews & system design",
    emoji: "💻",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "fresher-guide",
    name: "Fresher Guide",
    description: "Entry-level & first job advice",
    emoji: "🌱",
    color: "from-violet-500 to-purple-600",
  },
];

const WELCOME_MESSAGES: Record<string, string> = {
  "career-coach": "Hey there! 👋 I'm your Career Coach. I help with job search strategies, resume writing, interview prep, and salary negotiation. What can I help you with today?",
  "tech-expert": "Hello! 💻 I'm your Tech Expert. I can help you prep for coding interviews, system design, and technical assessments. What are you working on?",
  "fresher-guide": "Hi! 🌱 I'm your Fresher Guide — here to help you land your first job! Whether it's resume tips, where to apply, or what to expect, I've got you. What's on your mind?",
};

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  "career-coach": ["How do I negotiate my salary?", "Review my resume approach", "How to prepare for interviews?"],
  "tech-expert": ["What LeetCode patterns should I focus on?", "How to ace system design interviews?", "Best resources for DSA?"],
  "fresher-guide": ["How to write my first resume?", "Where should freshers apply?", "How many applications per day?"],
};

const CANNED_RESPONSES: Record<string, string[]> = {
  "career-coach": [
    "Great question! Start by updating your LinkedIn profile with quantified achievements — hiring managers spend only 7 seconds on resumes. What specific role are you targeting?",
    "For salary negotiation, research market rates on Glassdoor and Levels.fyi. Always negotiate — 70% of employers expect it. What's your target range?",
    "The STAR method (Situation, Task, Action, Result) is your best friend for behavioral interviews. Practice with real examples from past experiences. Want to run through one together?",
    "Networking accounts for 70-80% of jobs filled. Reach out to 5 new LinkedIn connections per week with personalized messages. Quality beats quantity!",
    "Your resume should lead with impact, not duties. Replace 'Responsible for managing...' with 'Managed X team, achieving Y% improvement in Z.' Numbers matter!",
  ],
  "tech-expert": [
    "For system design interviews, use this framework: requirements → capacity estimation → high-level design → detailed design → tradeoffs. What system would you like to practice?",
    "LeetCode patterns > random problems. Master: sliding window, two pointers, fast-slow pointers, BFS/DFS, and dynamic programming. Which area feels weakest?",
    "React interview tip: Be ready to explain reconciliation, custom hooks, and performance optimization (memo, useMemo, useCallback). What stack are you interviewing for?",
    "For backend roles, know: CAP theorem, database indexing strategies, caching patterns, and horizontal vs vertical scaling. What's your target company?",
    "A strong GitHub profile matters — build 2-3 polished projects with READMEs, deployed demos, and clean commit history. What's your current project?",
  ],
  "fresher-guide": [
    "As a fresher, projects > internships on your resume. Build 2-3 projects that solve real problems — deployed projects with live demos impress recruiters far more than academic work!",
    "Your resume should be 1 page maximum. Put: Education → Skills → Projects → Work Experience. Use action verbs and keep bullet points to 2-3 per section.",
    "Don't get discouraged by rejections — set a daily goal of 5 applications/day and track everything in a spreadsheet. It's a numbers game!",
    "LinkedIn optimization: Use all 2,600 characters in your summary, add skills, get endorsements, and post about your learning journey. Recruiters search by keywords!",
    "For entry-level roles, look at startups and SMEs, not just FAANG. Smaller companies offer more responsibility and are more willing to train freshers.",
  ],
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (selectedProfile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedProfile]);

  const selectProfile = (profileId: string) => {
    setSelectedProfile(profileId);
    setMessages([
      {
        role: "assistant",
        content: WELCOME_MESSAGES[profileId],
      },
    ]);
  };

  const sendMessage = async (text?: string) => {
    const userMessage = (text || input).trim();
    if (!userMessage || !selectedProfile) return;

    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          profile: selectedProfile,
        }),
      });

      if (!res.ok) {
        let errMessage = "Network response was not ok";
        try {
          const errData = await res.json();
          errMessage = errData.error || errMessage;
        } catch(e) {}
        throw new Error(errMessage);
      }
      
      const data = await res.json();
      
      if (data.error || !data.response) throw new Error(data.error || "No response");

      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
      console.error(err);
      // Fallback to canned responses
      const responses = CANNED_RESPONSES[selectedProfile] || [];
      const response = responses[Math.floor(Math.random() * responses.length)] ||
        "That's a great question! Focus on your unique value proposition and keep applying consistently. Would you like more specific advice?";
      
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
        setIsTyping(false);
      }, 800 + Math.random() * 600);
      return;
    }
    
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentProfile = PROFILES.find((p) => p.id === selectedProfile);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-2xl flex items-center justify-center hover:scale-110 transition-all text-white group"
        aria-label="Open AI Chat"
        style={{ boxShadow: "0 8px 32px rgba(99,102,241,0.4)" }}
      >
        {open ? <X className="w-6 h-6" /> : <Sparkles className="w-5 h-5 md:w-6 md:h-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 md:-top-1 md:-right-1 w-5 h-5 bg-[#0D9488] rounded-full border-2 border-white text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
            AI
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-4 left-4 md:left-auto md:bottom-28 md:right-8 z-[100] md:w-[400px] rounded-2xl bg-white shadow-2xl border border-[#E8E4DC] overflow-hidden flex flex-col"
          style={{ maxHeight: "calc(100vh - 6rem)", height: "80vh", animation: "slideUpChat 0.25s ease-out" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F1F3D] via-[#162B52] to-[#0F1F3D] px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              {selectedProfile && (
                <button
                  onClick={() => { setSelectedProfile(null); setMessages([]); }}
                  className="text-white/60 hover:text-white transition-colors mr-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                {currentProfile ? (
                  <span className="text-base">{currentProfile.emoji}</span>
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <div className="text-white text-sm font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>
                  {currentProfile ? currentProfile.name : "AI Career Assistant"}
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/50 text-xs">
                    {currentProfile ? currentProfile.description : "Choose your advisor below"}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Profile selector */}
          {!selectedProfile ? (
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-base font-bold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                  Meet Your AI Advisors
                </h3>
                <p className="text-xs text-[#6B7280] mt-1">Powered by alfamus AI — choose your specialist</p>
              </div>
              <div className="flex flex-col gap-2.5">
                {PROFILES.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => selectProfile(profile.id)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#E8E4DC] hover:border-[#0D9488] hover:bg-[#F8F6F1] transition-all text-left group"
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform`}>
                      {profile.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#0F1F3D]" style={{ fontFamily: "Syne, sans-serif" }}>
                        {profile.name}
                      </div>
                      <div className="text-xs text-[#6B7280]">{profile.description}</div>
                    </div>
                    <div className="text-[#0D9488] opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">
                      Chat →
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0" style={{ minHeight: "240px" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentProfile?.color} flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0`}>
                        {currentProfile?.emoji}
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#0F1F3D] text-white rounded-br-md"
                          : "bg-[#F8F6F1] text-[#0F1F3D] rounded-bl-md border border-[#E8E4DC]"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start items-center gap-2">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${currentProfile?.color} flex items-center justify-center text-sm flex-shrink-0`}>
                      {currentProfile?.emoji}
                    </div>
                    <div className="bg-[#F8F6F1] border border-[#E8E4DC] px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-[#6B7280] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions */}
              {messages.length === 1 && selectedProfile && (
                <div className="px-4 pb-2 flex flex-col gap-1.5">
                  {SUGGESTED_QUESTIONS[selectedProfile]?.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left text-xs px-3 py-2 rounded-xl border border-[#E8E4DC] text-[#6B7280] hover:border-[#0D9488] hover:text-[#0D9488] hover:bg-[#F8F6F1] transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-[#E8E4DC] flex gap-2 flex-shrink-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask your ${currentProfile?.name}...`}
                  disabled={isTyping}
                  className="flex-1 px-3 py-2.5 bg-[#F8F6F1] rounded-xl text-sm text-[#0F1F3D] placeholder-[#6B7280] outline-none focus:ring-2 focus:ring-[#6366F1]/30 border border-[#E8E4DC] transition-all disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideUpChat {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
