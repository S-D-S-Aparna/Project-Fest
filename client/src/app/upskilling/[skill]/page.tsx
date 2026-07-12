"use client";

import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { Rocket, Calendar, MapPin, Users, ChevronRight, CheckCircle2, Code, Database, Monitor } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const upskillingData: Record<string, any> = {
  "agentic-ai": {
    title: "Agentic AI",
    gradient: "from-purple-600 to-indigo-700",
    description: "Learn to build autonomous AI agents. Master function calling, RAG pipelines, and LLM orchestration.",
    icon: Rocket,
    events: [
      { id: 501, title: "Building AI Agents Bootcamp", date: "2026-07-20T10:00:00Z", location: "Online / Discord", type: "Bootcamp" },
      { id: 502, title: "LangChain Masterclass", date: "2026-07-25T14:00:00Z", location: "Online / Zoom", type: "Masterclass" }
    ]
  },
  "data-science-analytics": {
    title: "Data Science & Analytics",
    gradient: "from-fuchsia-600 to-purple-700",
    description: "Turn raw data into actionable insights. Master Python, Pandas, machine learning models, and visualization.",
    icon: Database,
    events: [
      { id: 503, title: "Data Analytics Hackathon", date: "2026-08-10T09:00:00Z", location: "Tech Park Hub", type: "Hackathon" },
      { id: 504, title: "Intro to Machine Learning", date: "2026-08-15T11:00:00Z", location: "Online", type: "Workshop" }
    ]
  },
  "react-next-js": {
    title: "React & Next.js",
    gradient: "from-blue-600 to-cyan-600",
    description: "Build modern, highly performant web applications. Learn App Router, Server Components, and Tailwind CSS.",
    icon: Monitor,
    events: [
      { id: 505, title: "Next.js 14 Crash Course", date: "2026-07-18T10:00:00Z", location: "Online", type: "Crash Course" },
      { id: 506, title: "Frontend Developer Meetup", date: "2026-07-30T18:00:00Z", location: "City Cafe", type: "Meetup" }
    ]
  },
  "python-sql": {
    title: "Python & SQL",
    gradient: "from-green-600 to-teal-700",
    description: "The core stack of modern backend development and data engineering. Master databases and scripting.",
    icon: Code,
    events: [
      { id: 507, title: "SQL Optimization Workshop", date: "2026-08-05T14:00:00Z", location: "Online", type: "Workshop" },
      { id: 508, title: "Python for Beginners", date: "2026-08-12T10:00:00Z", location: "Online", type: "Course" }
    ]
  }
};

export default function UpskillingSkillPage() {
  const params = useParams();
  const router = useRouter();
  const skillSlug = params.skill as string;
  const { user } = useAuth();
  const [loading, setLoading] = useState<number | null>(null);
  
  const data = upskillingData[skillSlug] || {
    title: skillSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    gradient: "from-purple-600 to-indigo-700",
    description: "Master trending technologies and advance your career with specialized training and workshops.",
    icon: Rocket,
    events: [
      { id: 599, title: "Tech Skills Bootcamp", date: "2026-08-20T10:00:00Z", location: "Online", type: "Bootcamp" },
    ]
  };

  const Icon = data.icon;

  const handleRegister = async (event: any) => {
    if (!user) {
      toast.error("Please login to register.");
      router.push("/auth/login");
      return;
    }

    try {
      setLoading(event.id);
      const res = await fetch("http://localhost:5000/api/event-registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          eventName: event.title,
          activity: data.title + " (Upskilling)",
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
        theme: 'upskilling'
      });
      
      router.push(`/upskilling/booking-confirmed?${queryParams.toString()}`);
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
        <Link href="/upskilling" className="hover:text-purple-600 transition-colors">Upskilling</Link>
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
              Find a Mentor
            </Link>
            <Link href="/roadmap" className="bg-black/20 backdrop-blur-md border border-white/30 hover:bg-black/30 text-white px-6 py-3 rounded-xl font-bold transition-all">
              Learning Roadmap
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Bootcamps & Workshops</h2>
          <span className="text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">Enroll Now</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.events.map((event: any) => (
            <div key={event.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-600 bg-fuchsia-50 border border-fuchsia-100 px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                  <div className="bg-gray-50 p-2 rounded-lg text-center min-w-[60px] border border-gray-200">
                    <span className="block text-xs font-semibold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="block text-xl font-bold text-gray-900">{new Date(event.date).getDate()}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
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
                    Industry Experts & Mentors
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleRegister(event)}
                disabled={loading === event.id}
                className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {loading === event.id ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Enroll in Event
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
