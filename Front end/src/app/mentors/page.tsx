"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Search, Star, Video, MessageSquare, Calendar, ChevronRight, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function Mentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Mentors");
  const { token, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/users/mentors`);
        
        // We now get real mentorProfile data from the backend
        setMentors(response.data.mentors);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const filteredMentors = selectedCategory === "All Mentors" 
    ? mentors 
    : mentors.filter(mentor => mentor.mentorProfile?.expertise?.includes(selectedCategory));

  // handleBookSession logic moved to the individual booking page

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-3">1-on-1 Mentorship</h1>
        <p className="text-blue-100 max-w-2xl mb-6">
          Connect with industry experts, exam toppers, and top coaches. Book personalized video sessions to get the guidance you need to succeed.
        </p>
        <div className="flex gap-4">
          <div className="relative max-w-md w-full">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input type="text" placeholder="Search mentors by name, company, or skill..." className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 shadow-sm" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
        {["All Mentors", "Engineering", "Government Exams", "Design", "Medical", "Sports", "Study Abroad"].map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading mentors...</div>
      ) : filteredMentors.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No mentors available for this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-10">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6">
               <div className="flex flex-col items-center gap-3">
                 <div className="w-24 h-24 bg-gray-100 rounded-full flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 font-bold text-3xl group">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.name}`} alt={mentor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center" title="Available Now">
                       <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                 </div>
                 <p className="text-lg font-bold text-green-600 text-center mt-2">Free Session</p>
               </div>
               
               <div className="flex-1">
                 <div className="flex justify-between items-start mb-1">
                   <h2 className="text-xl font-bold text-gray-900">{mentor.name}</h2>
                   <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs font-bold border border-amber-100">
                      <Star className="w-3.5 h-3.5 fill-current" /> {mentor.mentorProfile?.rating || "New"}
                   </div>
                 </div>
                 <p className="text-sm text-gray-600 mb-3">{mentor.mentorProfile?.role || "Mentor"} {mentor.mentorProfile?.company && `at ${mentor.mentorProfile.company}`}</p>
                 
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
      )}

      {/* Conclusion & Exploring Direction */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Ready to accelerate your journey?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Talking to a mentor is just the beginning. After booking your session, head over to your personalized roadmap or explore learning resources to prepare your questions.
        </p>
        <div className="flex justify-center gap-4">
           <a href="/roadmap" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm text-sm">
             Go to Roadmap
           </a>
           <a href="/resources" className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
             Explore Resources
           </a>
        </div>
      </div>

    </MainLayout>
  );
}
