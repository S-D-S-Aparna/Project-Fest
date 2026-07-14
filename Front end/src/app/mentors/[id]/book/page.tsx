"use client";

import { useState, useEffect, use } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Video, List, AlignLeft, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FEATURED_MENTORS } from "../../featuredMentors";

interface MentorProfile {
  role?: string;
  expertise?: string[];
  hourlyRate?: number;
}

interface Mentor {
  id?: string | number;
  name: string;
  isFeaturedSample?: boolean;
  featuredImage?: string;
  mentorProfile?: MentorProfile;
}

export default function BookMentorDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const mentorId = resolvedParams.id;
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [stream, setStream] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        if (typeof mentorId === 'string' && mentorId.startsWith('featured-')) {
          const featured = FEATURED_MENTORS[mentorId];
          if (featured) {
            setMentor(featured);
            if (featured.mentorProfile?.expertise?.length > 0) {
              setStream(featured.mentorProfile.expertise[0]);
            }
            setLoading(false);
            return;
          }
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/users/mentors/${mentorId}`);
        setMentor(response.data.mentor);
        // Default stream to their first expertise if available
        if (response.data.mentor?.mentorProfile?.expertise?.length > 0) {
          setStream(response.data.mentor.mentorProfile.expertise[0]);
        }
      } catch (err) {
        console.error("Failed to fetch mentor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMentor();
  }, [mentorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in to book a session.");
      return;
    }
    
    if (!mentor) return;

    if (!date || !time || !stream) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setSubmitting(true);
    try {
      // Combine date and time for backend
      const dateTime = new Date(`${date}T${time}`).toISOString();

      if (typeof mentorId === 'string' && mentorId.startsWith('featured-')) {
        // Mock the backend booking for sample profiles
        await new Promise(resolve => setTimeout(resolve, 800));
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/bookings`,
          {
            mentorId: parseInt(mentorId),
            date: dateTime,
            stream,
            notes
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
      router.push(`/mentors/booking-confirmed?stream=${encodeURIComponent(stream)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&mentor=${encodeURIComponent(mentor.name)}`);
    } catch (error: unknown) {
      console.error("Booking error:", error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : "Failed to book session";

      alert(typeof message === "string" ? message : "Failed to book session");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (!mentor) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-800">Mentor Not Found</h1>
          <Link href="/mentors" className="text-indigo-600 hover:underline mt-4 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Mentors
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Link href={`/mentors/${mentorId}`} className="text-gray-500 hover:text-indigo-600 mb-6 inline-flex items-center gap-2 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Profile
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Panel - Mentor Summary */}
          <div className="md:w-1/3 bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-20 h-20 bg-white rounded-full p-1 shrink-0 shadow-lg relative overflow-hidden flex items-center justify-center ${mentor.isFeaturedSample ? 'bg-gradient-to-br from-orange-400 to-pink-500' : ''}`}>
                {mentor.isFeaturedSample ? (
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <Image 
                      src={mentor.featuredImage!} 
                      alt={mentor.name} 
                      width={55}
                      height={55}
                      className="object-contain" 
                      unoptimized
                    />
                  </div>
                ) : (
                  <Image 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.name}`} 
                    alt={mentor.name} 
                    fill
                    className="object-cover rounded-full bg-indigo-50" 
                    unoptimized
                  />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{mentor.name}</h3>
                <p className="text-indigo-200 text-sm">{mentor.mentorProfile?.role || "Mentor"}</p>
              </div>
            </div>

            <div className="space-y-4 text-indigo-100 text-sm flex-1">
              <div className="flex items-start gap-3">
                <Video className="w-5 h-5 shrink-0 text-indigo-300" />
                <p>1-on-1 Google Meet Session</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 shrink-0 text-indigo-300" />
                <p>45 Minutes Duration</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-indigo-300" />
                <p>Personalized Career Guidance</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-indigo-500/50">
              <p className="text-sm text-indigo-200 mb-1">Session Price</p>
              <p className="text-3xl font-bold">{mentor.mentorProfile?.hourlyRate ? `₹${mentor.mentorProfile.hourlyRate}` : "Free"}</p>
            </div>
          </div>

          {/* Right Panel - EDD Form */}
          <div className="md:w-2/3 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Finalize Your Session</h2>
            <p className="text-gray-500 mb-8">Select your preferred time and provide details to help {mentor.name} prepare for your call.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Stream Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <List className="w-4 h-4 text-indigo-600" /> Discussion Stream
                </label>
                <select 
                  value={stream} 
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select a stream...</option>
                  {mentor.mentorProfile?.expertise?.map((exp: string) => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                  {(!mentor.mentorProfile?.expertise || mentor.mentorProfile?.expertise.length === 0) && (
                    <option value="General Guidance">General Guidance</option>
                  )}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-indigo-600" /> Preferred Date
                  </label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" /> Preferred Time
                  </label>
                  <input 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-indigo-600" /> Preparation Notes (Optional)
                </label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What specific questions or topics do you want to cover? Be as detailed as possible."
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-lg cursor-pointer"
                >
                  {submitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  By confirming, you agree to our terms of service and cancellation policy.
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
