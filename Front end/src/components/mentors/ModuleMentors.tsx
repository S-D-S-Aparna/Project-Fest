"use client";

import { useState, useEffect } from "react";
import { Star, Video, MessageSquare, Calendar, CheckCircle2 } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

type Mentor = {
  id: number;
  name: string;
  email: string;
  mentorProfile?: {
    bio: string;
    company: string | null;
    role: string | null;
    expertise: string[];
    yearsExperience: number | null;
    hourlyRate: number | null;
    rating: number | null;
    totalSessions: number;
  };
};

export default function ModuleMentors({ category }: { category: string }) {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        // Using the proxy rewrite for /api
        const response = await axios.get('/api/users/mentors');
        const allMentors: Mentor[] = response.data.mentors;
        
        // Filter by the specific category
        const filtered = category === "All Mentors" 
          ? allMentors 
          : allMentors.filter(mentor => mentor.mentorProfile?.expertise?.includes(category));
          
        // Limit to 4 mentors for the module preview
        setMentors(filtered.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [category]);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading mentors...</div>;
  }

  if (mentors.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Book a {category} Mentor</h2>
        <p className="text-gray-500 mb-6">No mentors currently available for this category. Check back soon!</p>
        <Link href="/mentors" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Browse All Mentors
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl p-8 border-2 border-indigo-100 shadow-lg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">Expert Mentors Available</h2>
          <p className="text-gray-600 mt-1">Book a free 1:1 session with a {category} specialist</p>
        </div>
        <Link href="/mentors" className="text-sm font-bold text-white bg-indigo-600 border border-transparent px-5 py-2.5 rounded-xl hover:bg-indigo-700 hover:shadow-md transition-all">
          View All Mentors
        </Link>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 font-bold text-3xl group">
                <Image 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.name}`} 
                  alt={mentor.name} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300" 
                  unoptimized
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center" title="Available Now">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-sm font-bold text-green-600 text-center mt-2">Free Session</p>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-xl font-bold text-gray-900">{mentor.name}</h2>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs font-bold border border-amber-100">
                  <Star className="w-3.5 h-3.5 fill-current" /> {mentor.mentorProfile?.rating || "New"}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{mentor.mentorProfile?.role || "Mentor"} {mentor.mentorProfile?.company && (mentor.mentorProfile.company !== "" ? `at ${mentor.mentorProfile.company}` : "")}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5 text-indigo-500" /> {mentor.mentorProfile?.totalSessions || 0}+ Sessions</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-indigo-500" /> Reviews</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {mentor.mentorProfile?.expertise?.map(tag => (
                  <span key={tag} className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2 py-1 rounded-md">{tag}</span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Link href={`/mentors/${mentor.id}`} className="flex-1 bg-white border border-indigo-600 text-indigo-600 font-semibold py-2 rounded-lg text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center">
                  View Profile
                </Link>
                <Link 
                  href={`/mentors/${mentor.id}/book`}
                  className="flex-1 bg-indigo-600 text-white font-semibold py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book For Free
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
