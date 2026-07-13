"use client";

import MainLayout from "@/components/layout/MainLayout";
import { CheckCircle, Calendar, MapPin, Sparkles, Tag, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense, useMemo } from "react";
import confetti from "canvas-confetti";

interface BookingDetails {
  eventName: string | null;
  activity: string | null;
  date: string | null;
  location: string | null;
  type: string | null;
}

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const details = useMemo<BookingDetails>(() => ({
    eventName: searchParams.get("eventName"),
    activity: searchParams.get("activity"),
    date: searchParams.get("date"),
    location: searchParams.get("location"),
    type: searchParams.get("type"),
  }), [searchParams]);

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        window.clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  if (!details || !details.eventName) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/co-curricular" className="hover:text-pink-600 transition-colors">Co-Curricular</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 font-medium">Registration Confirmed</span>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-20 transform rotate-12">
            <Sparkles className="w-48 h-48 text-white" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-pink-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Registration Confirmed!
            </h1>
            <p className="text-pink-100 text-lg">
              Your spot for the {details.activity} event is secured.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Event Details</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Tag className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Event Name</p>
                <p className="text-lg font-bold text-gray-900">{details.eventName}</p>
                <span className="inline-block mt-1 text-xs font-semibold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  {details.type}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                <p className="text-lg font-bold text-gray-900">
                  {details.date ? new Date(details.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Date not specified'}
                </p>
                <p className="text-gray-600 mt-1">
                  {details.date ? new Date(details.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Time not specified'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="text-lg font-bold text-gray-900">{details.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row gap-4">
            <Link 
              href="/co-curricular" 
              className="flex-1 text-center bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
            >
              Back to Activities
            </Link>
            <Link 
              href="/dashboard" 
              className="flex-1 text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              View My Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="flex justify-center items-center h-[60vh]">Loading...</div>}>
        <BookingSuccessContent />
      </Suspense>
    </MainLayout>
  );
}
