"use client";

import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { Sparkles, Calendar, MapPin, Users, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import ModuleMentors from "@/components/mentors/ModuleMentors";

const activityData: Record<string, any> = {
  "dance": {
    title: "Dance & Choreography",
    gradient: "from-pink-500 to-rose-500",
    description: "Express yourself through movement. Join masterclasses, compete in national events, and learn from top choreographers.",
    icon: Sparkles,
    events: [
      { id: 1, title: "National Youth Dance Championship", date: "2026-08-15T10:00:00Z", location: "New Delhi Arena", type: "Competition" },
      { id: 2, title: "Hip-Hop Masterclass", date: "2026-07-20T14:00:00Z", location: "Virtual Studio", type: "Workshop" }
    ]
  },
  "singing-and-music": {
    title: "Singing & Music",
    gradient: "from-blue-500 to-indigo-500",
    description: "Find your voice and master your instrument. From vocal training to music production.",
    icon: Sparkles,
    events: [
      { id: 3, title: "Battle of the Bands", date: "2026-09-01T18:00:00Z", location: "City Square", type: "Competition" },
      { id: 4, title: "Vocal Pitch Control Workshop", date: "2026-07-25T16:00:00Z", location: "Online", type: "Workshop" }
    ]
  },
  "art-and-painting": {
    title: "Art & Painting",
    gradient: "from-purple-500 to-fuchsia-500",
    description: "Create visual masterpieces. Explore digital art, 3D modeling, and classical painting techniques.",
    icon: Sparkles,
    events: [
      { id: 5, title: "Digital Art Exhibition", date: "2026-08-10T09:00:00Z", location: "Metro Art Gallery", type: "Exhibition" },
      { id: 6, title: "Watercolor Basics", date: "2026-07-22T10:00:00Z", location: "Virtual", type: "Workshop" }
    ]
  },
  "photography": {
    title: "Photography & Cinematography",
    gradient: "from-teal-500 to-emerald-500",
    description: "Capture the world through your lens. Learn drone flying, advanced editing, and composition.",
    icon: Sparkles,
    events: [
      { id: 7, title: "National Youth Photography Contest", date: "2026-08-20T00:00:00Z", location: "Online Submission", type: "Competition" },
      { id: 8, title: "Lightroom Editing Masterclass", date: "2026-07-18T15:00:00Z", location: "Online", type: "Workshop" }
    ]
  }
};

export default function ActivityPage() {
  const params = useParams();
  const router = useRouter();
  const activitySlug = params.activity as string;
  const { user } = useAuth();
  const [loading, setLoading] = useState<number | null>(null);
  
  // Fallback to a generic activity if not mapped
  const data = activityData[activitySlug] || {
    title: activitySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    gradient: "from-orange-500 to-red-500",
    description: "Explore advanced opportunities, competitions, and workshops in this field.",
    icon: Sparkles,
    events: [
      { id: 99, title: "Annual Competition", date: "2026-09-15T10:00:00Z", location: "Main Campus", type: "Competition" },
      { id: 100, title: "Beginner Workshop", date: "2026-08-01T14:00:00Z", location: "Online", type: "Workshop" }
    ]
  };

  const Icon = data.icon;

  const handleRegister = async (event: any) => {
    if (!user) {
      toast.error("Please login to register for events.");
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
          activity: data.title,
          date: event.date
        }),
      });

      if (!res.ok) throw new Error("Failed to register");

      const resData = await res.json();
      toast.success("Successfully registered!");
      
      // Navigate to booking confirmed page with query params
      const queryParams = new URLSearchParams({
        eventName: event.title,
        activity: data.title,
        date: event.date,
        location: event.location,
        type: event.type
      });
      
      router.push(`/co-curricular/booking-confirmed?${queryParams.toString()}`);
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
        <Link href="/co-curricular" className="hover:text-pink-600 transition-colors">Co-Curricular</Link>
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
              Explore Mentors
            </Link>
            <Link href="/roadmap" className="bg-black/20 backdrop-blur-md border border-white/30 hover:bg-black/30 text-white px-6 py-3 rounded-xl font-bold transition-all">
              View Roadmap
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Events & Registrations</h2>
          <span className="text-sm font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full">Active Now</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.events.map((event: any) => (
            <div key={event.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                  <div className="bg-gray-50 p-2 rounded-lg text-center min-w-[60px]">
                    <span className="block text-xs font-semibold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="block text-xl font-bold text-gray-900">{new Date(event.date).getDate()}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
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
                    Limited Seats Available
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleRegister(event)}
                disabled={loading === event.id}
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading === event.id ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Register Now
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Book Mentor Section */}
      <ModuleMentors category="Design" />
    </MainLayout>
  );
}
