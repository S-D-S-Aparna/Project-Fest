"use client";

import MainLayout from "@/components/layout/MainLayout";
import { CheckCircle, Calendar, MapPin, Trophy, Tag, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import confetti from "canvas-confetti";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
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

    // Get details from URL
    setDetails({
      eventName: searchParams.get("eventName"),
      activity: searchParams.get("activity"),
      date: searchParams.get("date"),
      location: searchParams.get("location"),
      type: searchParams.get("type"),
    });

    return () => clearInterval(interval);
  }, [searchParams]);

  if (!details || !details.eventName) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/sports" className="hover:text-green-600 transition-colors">Sports</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 font-medium">Spot Secured</span>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-20 transform rotate-12">
            <Trophy className="w-48 h-48 text-white" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-green-100">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Registration Confirmed!
            </h1>
            <p className="text-green-100 text-lg">
              Your spot for the {details.activity} {details.type.toLowerCase()} is secured. Get ready to train!
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Tryout Details</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Tag className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Event Name</p>
                <p className="text-lg font-bold text-gray-900">{details.eventName}</p>
                <span className="inline-block mt-1 text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  {details.type}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(details.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-gray-600 mt-1">
                  {new Date(details.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="text-lg font-bold text-gray-900">{details.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row gap-4">
            <Link 
              href="/sports" 
              className="flex-1 text-center bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-md"
            >
              Back to Sports
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

export default function SportsBookingSuccessPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="flex justify-center items-center h-[60vh]">Loading...</div>}>
        <BookingSuccessContent />
      </Suspense>
    </MainLayout>
  );
}
