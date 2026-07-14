"use client";

import MainLayout from "@/components/layout/MainLayout";
import { CheckCircle, CalendarDays, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";

function BookingConfirmedContent() {
  const searchParams = useSearchParams();
  const mentor = searchParams.get("mentor");
  const stream = searchParams.get("stream");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  useEffect(() => {
    // Fire a nice confetti burst on success!
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4f46e5', '#ec4899', '#f59e0b']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4f46e5', '#ec4899', '#f59e0b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="max-w-2xl mx-auto pt-10 pb-20">
      <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl text-center relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-green-400 to-emerald-500"></div>

        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          You&apos;re all set. We&apos;ve sent a calendar invite to your email with the Google Meet link.
        </p>

        {/* Dynamic Booking Details (EDD) */}
        {(mentor || stream || date || time) && (
          <div className="bg-indigo-50/50 rounded-2xl p-6 mb-8 border border-indigo-100 text-left">
            <h3 className="font-bold text-indigo-900 mb-4 border-b border-indigo-100 pb-2">Session Details</h3>
            <div className="grid grid-cols-2 gap-y-4">
              {mentor && (
                <div>
                  <p className="text-xs text-indigo-500 uppercase tracking-wider font-semibold">Mentor</p>
                  <p className="text-gray-800 font-medium">{mentor}</p>
                </div>
              )}
              {stream && (
                <div>
                  <p className="text-xs text-indigo-500 uppercase tracking-wider font-semibold">Stream</p>
                  <p className="text-gray-800 font-medium">{stream}</p>
                </div>
              )}
              {date && (
                <div>
                  <p className="text-xs text-indigo-500 uppercase tracking-wider font-semibold">Date</p>
                  <p className="text-gray-800 font-medium">{date}</p>
                </div>
              )}
              {time && (
                <div>
                  <p className="text-xs text-indigo-500 uppercase tracking-wider font-semibold">Time</p>
                  <p className="text-gray-800 font-medium">{time}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4 text-left">
           <CalendarDays className="w-10 h-10 text-indigo-500 shrink-0" />
           <div>
             <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Next Step for {stream || "Your Session"}</p>
             {stream === "Sports" || stream === "Athletics" ? (
                <p className="text-gray-800 font-medium text-sm sm:text-base">Get your athletic gear ready and outline your current training routines so the coach can optimize them.</p>
             ) : stream?.includes("Exam") || stream?.includes("UPSC") || stream?.includes("JEE") ? (
                <p className="text-gray-800 font-medium text-sm sm:text-base">Gather your latest mock test scores and highlight your weakest subjects for a targeted strategy session.</p>
             ) : stream?.includes("Engineering") || stream?.includes("Design") || stream?.includes("Data") ? (
                <p className="text-gray-800 font-medium text-sm sm:text-base">Ensure your portfolio or GitHub links are ready to share. Write down 3 technical roadblocks you&apos;re facing.</p>
             ) : (
                <p className="text-gray-800 font-medium text-sm sm:text-base">Prepare 3-5 specific questions for your mentor to make the most of your 1-on-1 session.</p>
             )}
           </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" /> View Dashboard
          </Link>
          
          <Link 
            href="/roadmap" 
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 font-semibold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Generate AI Roadmap <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function BookingConfirmed() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="py-20 text-center">Loading confirmation...</div>}>
        <BookingConfirmedContent />
      </Suspense>
    </MainLayout>
  );
}
