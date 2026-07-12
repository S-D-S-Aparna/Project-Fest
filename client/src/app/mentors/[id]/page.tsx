"use client";

import { useState, useEffect, use } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Star, Video, MessageSquare, Calendar, ChevronRight, CheckCircle2, Award, Briefcase, Clock, FileText, ArrowRight, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MentorDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const mentorId = resolvedParams.id;
  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/mentors/${mentorId}`);
        setMentor(response.data.mentor);
      } catch (err) {
        console.error("Failed to fetch mentor:", err);
        setError("Could not find mentor.");
      } finally {
        setLoading(false);
      }
    };
    fetchMentor();
  }, [mentorId]);

  // handleBookSession moved to EDD page

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !mentor) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-800">Mentor Not Found</h1>
          <Link href="/mentors" className="text-indigo-600 hover:underline mt-4 inline-block flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Mentors
          </Link>
        </div>
      </MainLayout>
    );
  }

  const profile = mentor.mentorProfile || {};

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/mentors" className="hover:text-indigo-600">Mentors</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 font-medium">{mentor.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
             
             <div className="relative mt-8 mb-4 inline-block">
               <div className="w-28 h-28 bg-white p-1 rounded-full mx-auto relative z-10 shadow-md">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.name}`} alt={mentor.name} className="w-full h-full object-cover rounded-full bg-indigo-50" />
               </div>
               <div className="absolute bottom-1 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full z-20 flex items-center justify-center" title="Available Now">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
               </div>
             </div>
             
             <h1 className="text-2xl font-bold text-gray-900">{mentor.name}</h1>
             <p className="text-gray-600 mt-1 font-medium">{profile.role || "Expert Mentor"} {profile.company && `at ${profile.company}`}</p>
             
             <div className="flex items-center justify-center gap-2 mt-3 text-sm font-semibold">
               <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100">
                  <Star className="w-4 h-4 fill-current" /> {profile.rating || "New"}
               </div>
               <span className="text-gray-400">|</span>
               <div className="flex items-center gap-1 text-gray-600">
                  <Video className="w-4 h-4 text-indigo-500" /> {profile.totalSessions || 0} Sessions
               </div>
             </div>

             <div className="mt-8 pt-6 border-t border-gray-100">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-gray-500">Session Price</span>
                 <span className="text-xl font-bold text-green-600">{profile.hourlyRate ? `₹${profile.hourlyRate}` : "Free"}</span>
               </div>
               <Link 
                 href={`/mentors/${mentorId}/book`}
                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
               >
                 <Calendar className="w-5 h-5" /> Book 1-on-1 Session
               </Link>
               <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                 <Clock className="w-3 h-3" /> Usually responds in 2 hours
               </p>
             </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" /> About Me
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {profile.bio || "This mentor hasn't added a bio yet, but they are highly recommended by the Be You platform."}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" /> Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.expertise && profile.expertise.length > 0 ? (
                profile.expertise.map((tag: string) => (
                  <span key={tag} className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-4 py-2 rounded-lg font-medium text-sm">
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">General Career Guidance</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-indigo-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
             <div>
               <h3 className="font-bold text-indigo-900 mb-2">Want to prepare before your session?</h3>
               <p className="text-sm text-indigo-800/80">
                 Generate an AI Roadmap based on your goals so you can ask {mentor.name} specific questions.
               </p>
             </div>
             <Link href="/roadmap" className="shrink-0 bg-white border border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm flex items-center gap-2 text-sm">
               Go to AI Roadmap <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
