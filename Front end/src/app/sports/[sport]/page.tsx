"use client";

import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { Trophy, Calendar, MapPin, Users, ChevronRight, CheckCircle2, Shield, Activity, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface SportEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  type: string;
}

interface SportData {
  title: string;
  gradient: string;
  description: string;
  icon: LucideIcon;
  events: SportEvent[];
}

const sportData: Record<string, SportData> = {
  "cricket": {
    title: "Cricket",
    gradient: "from-blue-600 to-indigo-700",
    description: "Master the pitch. Join professional academies, find batting/bowling coaches, and participate in local league tryouts.",
    icon: Shield,
    events: [
      { id: 201, title: "State Under-19 Tryouts", date: "2026-08-10T08:00:00Z", location: "National Stadium", type: "Tryouts" },
      { id: 202, title: "Pace Bowling Masterclass", date: "2026-07-25T16:00:00Z", location: "City Sports Complex", type: "Academy" }
    ]
  },
  "football": {
    title: "Football",
    gradient: "from-green-600 to-emerald-700",
    description: "Own the field. Discover elite training camps, tactical workshops, and scout days for major clubs.",
    icon: Activity,
    events: [
      { id: 203, title: "FC Youth Academy Trials", date: "2026-09-05T09:00:00Z", location: "City FC Ground", type: "Tryouts" },
      { id: 204, title: "Tactical Awareness Camp", date: "2026-07-30T10:00:00Z", location: "Downtown Turf", type: "Camp" }
    ]
  },
  "basketball": {
    title: "Basketball",
    gradient: "from-orange-500 to-red-600",
    description: "Elevate your game. Sign up for shooting clinics, summer leagues, and high-performance conditioning.",
    icon: Trophy,
    events: [
      { id: 205, title: "Summer Pro-Am League", date: "2026-08-15T18:00:00Z", location: "Metro Indoor Arena", type: "League" },
      { id: 206, title: "Elite Guard Skills Clinic", date: "2026-07-22T14:00:00Z", location: "University Gym", type: "Clinic" }
    ]
  },
  "badminton": {
    title: "Badminton",
    gradient: "from-teal-500 to-cyan-600",
    description: "Speed, agility, and precision. Train with national champions and register for upcoming open tournaments.",
    icon: Activity,
    events: [
      { id: 207, title: "National Open Tournament", date: "2026-08-20T08:00:00Z", location: "Badminton Hub", type: "Tournament" },
      { id: 208, title: "Footwork & Agility Camp", date: "2026-07-18T10:00:00Z", location: "Sports Academy", type: "Camp" }
    ]
  }
};

export default function SportPage() {
  const params = useParams();
  const router = useRouter();
  const sportSlug = params.sport as string;
  const { user } = useAuth();
  const [loading, setLoading] = useState<number | null>(null);

  const data: SportData = sportData[sportSlug] || {
    title: sportSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    gradient: "from-green-600 to-emerald-700",
    description: "Explore elite training opportunities, find specialized coaches, and register for tryouts in this sport.",
    icon: Trophy,
    events: [
      { id: 299, title: "Regional Open Trials", date: "2026-09-15T09:00:00Z", location: "Main Sports Complex", type: "Tryouts" },
      { id: 300, title: "Fundamentals Coaching Camp", date: "2026-08-01T10:00:00Z", location: "Local Ground", type: "Academy" }
    ]
  };

  const Icon = data.icon;

  const handleRegister = async (event: SportEvent) => {
    if (!user) {
      toast.error("Please login to register for sports events.");
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
          activity: data.title + " (Sports)",
          date: event.date
        }),
      });

      if (!res.ok) throw new Error("Failed to register");

      toast.success("Successfully registered!");
      
      // Navigate to booking confirmed page with query params
      const queryParams = new URLSearchParams({
        eventName: event.title,
        activity: data.title,
        date: event.date,
        location: event.location,
        type: event.type
      });
      
      router.push(`/sports/booking-confirmed?${queryParams.toString()}`);
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
        <Link href="/sports" className="hover:text-green-600 transition-colors">Sports</Link>
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
              Find a Coach
            </Link>
            <Link href="/roadmap" className="bg-black/20 backdrop-blur-md border border-white/30 hover:bg-black/30 text-white px-6 py-3 rounded-xl font-bold transition-all">
              Training Roadmap
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Active Tryouts & Academies</h2>
          <span className="text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">Register Now</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-300 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                  <div className="bg-gray-50 p-2 rounded-lg text-center min-w-[60px] border border-gray-200">
                    <span className="block text-xs font-semibold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="block text-xl font-bold text-gray-900">{new Date(event.date).getDate()}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
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
                    Scouts & Coaches attending
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleRegister(event)}
                disabled={loading === event.id}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {loading === event.id ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Secure Your Spot
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
