"use client";

import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { BookOpen, Calendar, MapPin, Users, ChevronRight, CheckCircle2, GraduationCap, Briefcase, Award, Microscope } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const educationData: Record<string, any> = {
  "after-10th": {
    title: "After 10th",
    gradient: "from-blue-500 to-blue-700",
    description: "Explore your immediate next steps after high school. Find polytechnic colleges, ITI courses, and intermediate admissions.",
    icon: BookOpen,
    events: [
      { id: 401, title: "Polytechnic Admission Fair", date: "2026-06-15T10:00:00Z", location: "City Convention Center", type: "Fair" },
      { id: 402, title: "Career Counseling Seminar", date: "2026-06-20T14:00:00Z", location: "Online / Zoom", type: "Seminar" }
    ]
  },
  "after-12th": {
    title: "After 12th",
    gradient: "from-indigo-500 to-indigo-700",
    description: "The most crucial decision point. Discover engineering, medical, commerce, and arts colleges.",
    icon: GraduationCap,
    events: [
      { id: 403, title: "Mega Engineering Expo", date: "2026-07-10T09:00:00Z", location: "Tech Park", type: "Expo" },
      { id: 404, title: "Medical Admissions Guidance", date: "2026-07-12T11:00:00Z", location: "City Hospital Auditorium", type: "Seminar" }
    ]
  },
  "bachelors": {
    title: "Bachelor's Degree",
    gradient: "from-purple-500 to-purple-700",
    description: "Your foundation for a professional career. Explore major degree programs and campus placements.",
    icon: Briefcase,
    events: [
      { id: 405, title: "University Open Day", date: "2026-08-05T09:00:00Z", location: "Central University Campus", type: "Open Day" },
      { id: 406, title: "Undergraduate Scholarship Test", date: "2026-08-15T10:00:00Z", location: "Online", type: "Test" }
    ]
  },
  "masters": {
    title: "Master's Degree",
    gradient: "from-pink-500 to-pink-700",
    description: "Specialize in your field. Find postgraduate programs, MBA fairs, and advanced research opportunities.",
    icon: Award,
    events: [
      { id: 407, title: "Global MBA Fair", date: "2026-09-01T10:00:00Z", location: "Grand Hotel", type: "Fair" },
      { id: 408, title: "Postgraduate Admissions Info Session", date: "2026-09-10T15:00:00Z", location: "Online", type: "Seminar" }
    ]
  },
  "phd": {
    title: "PhD & Research",
    gradient: "from-orange-500 to-orange-700",
    description: "Push the boundaries of human knowledge. Discover research fellowships, grants, and doctoral programs.",
    icon: Microscope,
    events: [
      { id: 409, title: "Research Fellowship Workshop", date: "2026-10-05T10:00:00Z", location: "National Science Institute", type: "Workshop" },
      { id: 410, title: "Doctoral Candidates Networking", date: "2026-10-15T18:00:00Z", location: "University Faculty Club", type: "Networking" }
    ]
  }
};

export default function EducationLevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelSlug = params.level as string;
  const { user } = useAuth();
  const [loading, setLoading] = useState<number | null>(null);
  
  const data = educationData[levelSlug] || {
    title: levelSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    gradient: "from-blue-600 to-indigo-700",
    description: "Explore opportunities, colleges, and admission events for this educational level.",
    icon: BookOpen,
    events: [
      { id: 499, title: "General Admission Fair", date: "2026-09-15T09:00:00Z", location: "City Hall", type: "Fair" },
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/event-registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          eventName: event.title,
          activity: data.title + " (Education)",
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
        theme: 'education'
      });
      
      router.push(`/education/booking-confirmed?${queryParams.toString()}`);
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
        <Link href="/education" className="hover:text-blue-600 transition-colors">Education</Link>
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
              Speak to a Counselor
            </Link>
            <Link href="/roadmap" className="bg-black/20 backdrop-blur-md border border-white/30 hover:bg-black/30 text-white px-6 py-3 rounded-xl font-bold transition-all">
              Generate Roadmap
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Events & Fairs</h2>
          <span className="text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">Register Now</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.events.map((event: any) => (
            <div key={event.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                  <div className="bg-gray-50 p-2 rounded-lg text-center min-w-[60px] border border-gray-200">
                    <span className="block text-xs font-semibold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="block text-xl font-bold text-gray-900">{new Date(event.date).getDate()}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
                    Counselors & Universities attending
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleRegister(event)}
                disabled={loading === event.id}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
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
    </MainLayout>
  );
}
