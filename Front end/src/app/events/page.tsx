"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Calendar, Search, Users, MapPin, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string | null;
  type: string;
  url: string | null;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState<number | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleRegister = async (event: Event) => {
    if (!user) {
      toast.error("Please login to register for events.");
      router.push("/auth/login");
      return;
    }

    try {
      setRegistering(event.id);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/event-registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          eventName: event.title,
          activity: "Event",
          date: event.date
        }),
      });

      if (!res.ok) throw new Error("Failed to register");

      toast.success("Successfully registered!");
      
      const queryParams = new URLSearchParams({
        title: event.title,
        date: event.date,
        type: event.type,
        location: event.location || ''
      });
      
      router.push(`/events/rsvp-confirmed?${queryParams.toString()}`);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setRegistering(null);
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`}/api/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-orange-200" /> Events & Webinars
            </h1>
            <p className="text-orange-50 max-w-lg text-sm mb-6">
              Join live webinars, career fairs, and networking events to boost your professional connections.
            </p>
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search upcoming events..." className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-orange-300 outline-none shadow-sm" />
            </div>
          </div>
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 scale-150">
            <Calendar className="w-64 h-64" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10"><p className="text-gray-500 animate-pulse">Loading events...</p></div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(event => (
              <div key={event.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800 text-lg leading-tight">{event.title}</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded font-semibold whitespace-nowrap capitalize">
                    {event.type.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-6">{event.description}</p>
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {new Date(event.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                  {event.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {event.location}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => handleRegister(event)}
                  disabled={registering === event.id}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {registering === event.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Register / RSVP
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500 shadow-sm">
            <Users className="w-12 h-12 mx-auto mb-4 text-orange-200" />
            <p className="font-medium text-gray-800 mb-1 text-lg">No upcoming events yet</p>
            <p className="text-sm">We are currently scheduling our next batch of live webinars and events. Stay tuned!</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
