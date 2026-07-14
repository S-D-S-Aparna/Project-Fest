"use client";

import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { BookOpen, Calendar, MapPin, Users, ChevronRight, CheckCircle2, Landmark, Code, BriefcaseMedical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import ModuleMentors from "@/components/mentors/ModuleMentors";

const examData: Record<string, any> = {
  "upsc-cse": {
    title: "UPSC CSE",
    gradient: "from-orange-500 to-red-600",
    description: "The civil services examination. Get ready with comprehensive mock tests, mentorship, and strategy workshops.",
    icon: Landmark,
    events: [
      { id: 601, title: "All India Prelims Mock", date: "2026-05-15T09:00:00Z", location: "Online / Test Centers", type: "Mock Test" },
      { id: 602, title: "Topper Strategy Seminar", date: "2026-05-20T14:00:00Z", location: "Delhi Hub", type: "Seminar" }
    ]
  },
  "jee-advanced": {
    title: "JEE Advanced",
    gradient: "from-blue-600 to-indigo-700",
    description: "Gateway to the IITs. Register for intensive crash courses and nationwide test series.",
    icon: Code,
    events: [
      { id: 603, title: "Physics Crash Course", date: "2026-04-10T10:00:00Z", location: "Online", type: "Crash Course" },
      { id: 604, title: "Full Syllabus Grand Test", date: "2026-04-25T09:00:00Z", location: "Test Centers", type: "Mock Test" }
    ]
  },
  "neet-ug": {
    title: "NEET UG",
    gradient: "from-rose-500 to-red-600",
    description: "Medical entrance examination. Secure your seat with top-tier coaching workshops and test series.",
    icon: BriefcaseMedical,
    events: [
      { id: 605, title: "Biology Revision Marathon", date: "2026-04-15T08:00:00Z", location: "Online", type: "Workshop" },
      { id: 606, title: "NEET National Mock", date: "2026-04-30T10:00:00Z", location: "Test Centers", type: "Mock Test" }
    ]
  }
};

export default function CompetitiveExamPage() {
  const params = useParams();
  const router = useRouter();
  const examSlug = params.exam as string;
  const { user } = useAuth();
  const [loading, setLoading] = useState<number | null>(null);
  
  const data = examData[examSlug] || {
    title: examSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    gradient: "from-orange-500 to-red-600",
    description: "Prepare effectively for this competitive exam. Register for mock tests and expert-led strategy sessions.",
    icon: BookOpen,
    events: [
      { id: 699, title: "All India Mock Test", date: "2026-06-10T09:00:00Z", location: "Online", type: "Mock Test" },
    ]
  };

  const Icon = data.icon;

  const handleRegister = async (event: any) => {
    if (!user) {
      toast.error("Please login to register.");
      router.push("/login");
      return;
    }

    try {
      setLoading(event.id);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/event-registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          eventName: event.title,
          activity: data.title + " (Exam)",
          date: event.date
        }),
      });

      if (!res.ok) throw new Error("Failed to register");

      toast.success("Successfully registered!");
      
      const queryParams = new URLSearchParams({
        eventName: event.title,
        activity: data.title,
        date: event.date,
        location: event.location,
        type: event.type,
        theme: 'exams'
      });
      
      router.push(`/competitive-exams/booking-confirmed?${queryParams.toString()}`);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/competitive-exams" className="hover:text-orange-600 transition-colors">Exams</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 font-medium capitalize">{data.title}</span>
      </div>

      <div className={`bg-gradient-to-r ${data.gradient} rounded-2xl p-8 md:p-12 text-white mb-8 shadow-xl relative overflow-hidden group`}>
        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-20 group-hover:scale-110 transition-transform duration-700">
          <Icon className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {data.title}
          </h1>
          <p className="text-white/90 max-w-2xl text-lg leading-relaxed mb-8">
            {data.description}
          </p>
          <div className="flex gap-4">
            <Link href="/mentors" className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg">
              Book a Mentor
            </Link>
            <Link href="/roadmap" className="bg-black/20 backdrop-blur-md border border-white/30 hover:bg-black/30 text-white px-6 py-3 rounded-xl font-bold transition-all">
              AI Study Plan
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mock Tests & Workshops</h2>
          <span className="text-sm font-medium text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">Register Now</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.events.map((event: any) => (
            <div key={event.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                  <div className="bg-gray-50 p-2 rounded-lg text-center min-w-[60px] border border-gray-200">
                    <span className="block text-xs font-semibold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="block text-xl font-bold text-gray-900">{new Date(event.date).getDate()}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    Thousands of Aspirants
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleRegister(event)}
                disabled={loading === event.id}
                className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {loading === event.id ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Register for Event
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Book Mentor Section */}
      <ModuleMentors category="Government Exams" />
    </MainLayout>
  );
}
