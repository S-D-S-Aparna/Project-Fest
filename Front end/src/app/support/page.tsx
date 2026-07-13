"use client";

import MainLayout from "@/components/layout/MainLayout";
import { HelpCircle, Mail, MessageSquare, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Support() {
  const { token, user } = useAuth();
  const router = useRouter();
  
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ subject, message })
      });

      if (!res.ok) {
        throw new Error("Failed to submit support ticket");
      }

      setSuccess(true);
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while submitting the ticket.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-200" /> Help & Support
            </h1>
            <p className="text-blue-50 max-w-lg text-sm mb-6">
              Need assistance? We&apos;re here to help you navigate your journey on Be You.
            </p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 scale-150">
            <HelpCircle className="w-64 h-64" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="font-bold text-gray-800 mb-2 text-lg">FAQs</h3>
            <p className="text-gray-500 text-sm">Find answers to common questions about mentors, roadmaps, and more in our comprehensive knowledge base.</p>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm">
            <Mail className="w-12 h-12 mx-auto mb-4 text-cyan-500" />
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Direct Contact</h3>
            <p className="text-gray-500 text-sm">Prefer email? Reach out directly at support@beyou.com and we&apos;ll reply within 24 hours.</p>
          </div>
        </div>

        {/* Submit Ticket Form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 text-xl">Submit a Support Ticket</h3>
          
          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-100">
              Your support ticket has been submitted successfully! We will get back to you soon.
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Briefly describe your issue..."
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Provide as much detail as possible..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className={`w-full py-3 px-6 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all ${
                !token ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {!token ? "Log in to submit" : "Submit Ticket"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
