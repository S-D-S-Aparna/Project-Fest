"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Search, Star, Video, MessageSquare, Calendar, CheckCircle2, Monitor, Palette, Landmark, Trophy, GraduationCap, Sparkles, Zap } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

type Mentor = {
  id: number | string;
  name: string;
  email: string;
  isFeaturedSample?: boolean;
  featuredImage?: string;
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

// Define our streams for the creative hub
const STREAMS = [
  {
    id: "tech",
    title: "Tech & Upskilling",
    description: "Master coding, AI, and system design with top tech leads.",
    icon: Monitor,
    gradient: "from-blue-600 to-indigo-700",
    bgLight: "bg-blue-50",
    border: "border-blue-100",
    tags: ["Engineering", "Data Science", "Web Development", "AI"],
    featuredMentor: {
      id: "featured-tech",
      name: "Sarah Jenkins",
      email: "sarah@example.com",
      isFeaturedSample: true,
      featuredImage: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d1_200d_1f4bb/512.gif", // Tech Worker Emoji
      mentorProfile: {
        bio: "Principal AI Engineer specializing in large language models and scalable infrastructure.",
        company: "Tech Giant Inc.",
        role: "Principal AI Engineer",
        expertise: ["Engineering", "AI", "System Design"],
        yearsExperience: 10,
        hourlyRate: null,
        rating: 5.0,
        totalSessions: 1240
      }
    }
  },
  {
    id: "design",
    title: "Creative & Design",
    description: "Refine your artistic eye and build stunning portfolios.",
    icon: Palette,
    gradient: "from-pink-500 to-rose-500",
    bgLight: "bg-pink-50",
    border: "border-pink-100",
    tags: ["Design", "Art", "UI/UX"],
    featuredMentor: {
      id: "featured-design",
      name: "David Chen",
      email: "david@example.com",
      isFeaturedSample: true,
      featuredImage: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d1_200d_1f3a8/512.gif", // Artist Emoji
      mentorProfile: {
        bio: "Award-winning Creative Director helping you build portfolios that stand out globally.",
        company: "Creative Studio",
        role: "Creative Director",
        expertise: ["Design", "UI/UX", "Art Direction"],
        yearsExperience: 8,
        hourlyRate: null,
        rating: 4.9,
        totalSessions: 890
      }
    }
  },
  {
    id: "exams",
    title: "Competitive Exams",
    description: "Strategies from toppers for UPSC, JEE, NEET, and more.",
    icon: Landmark,
    gradient: "from-orange-500 to-red-600",
    bgLight: "bg-orange-50",
    border: "border-orange-100",
    tags: ["Government Exams", "Competitive Exams", "UPSC", "JEE", "NEET"],
    featuredMentor: {
      id: "featured-exam",
      name: "Ananya Sharma",
      email: "ananya@example.com",
      isFeaturedSample: true,
      featuredImage: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d1_200d_1f393/512.gif", // Student/Graduate Emoji
      mentorProfile: {
        bio: "Secured AIR 14 in UPSC CSE. I help aspirants structure their study plans effectively.",
        company: "Gov of India",
        role: "IAS Officer",
        expertise: ["UPSC", "Government Exams", "Strategy"],
        yearsExperience: 4,
        hourlyRate: null,
        rating: 5.0,
        totalSessions: 2100
      }
    }
  },
  {
    id: "sports",
    title: "Sports & Athletics",
    description: "Train with national champions and elite coaches.",
    icon: Trophy,
    gradient: "from-teal-500 to-emerald-600",
    bgLight: "bg-teal-50",
    border: "border-teal-100",
    tags: ["Sports", "Athletics", "Cricket", "Football"],
    featuredMentor: {
      id: "featured-sports",
      name: "Rahul Kumar",
      email: "rahul@example.com",
      isFeaturedSample: true,
      featuredImage: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f3c3/512.gif", // Runner Emoji
      mentorProfile: {
        bio: "Former National Athlete and Olympic Coach. Let's optimize your athletic performance.",
        company: "National Sports Academy",
        role: "Elite Coach",
        expertise: ["Athletics", "Sports", "Performance"],
        yearsExperience: 15,
        hourlyRate: null,
        rating: 4.8,
        totalSessions: 530
      }
    }
  },
  {
    id: "education",
    title: "Higher Education",
    description: "Navigate admissions, study abroad, and medical careers.",
    icon: GraduationCap,
    gradient: "from-purple-600 to-fuchsia-600",
    bgLight: "bg-purple-50",
    border: "border-purple-100",
    tags: ["Medical", "Study Abroad", "Higher Ed", "All Mentors"],
    featuredMentor: {
      id: "featured-medical",
      name: "Dr. Priya Patel",
      email: "priya@example.com",
      isFeaturedSample: true,
      featuredImage: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d1_200d_2695_fe0f/512.gif", // Doctor Emoji
      mentorProfile: {
        bio: "Senior Surgeon guiding pre-med students and young doctors through their medical journey.",
        company: "City Hospital",
        role: "Senior Surgeon",
        expertise: ["Medical", "Higher Ed", "Career Guidance"],
        yearsExperience: 12,
        hourlyRate: null,
        rating: 5.0,
        totalSessions: 1100
      }
    }
  }
];

export default function MentorsCreativeHub() {
  const [apiMentors, setApiMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/users/mentors`);
        setApiMentors(response.data.mentors);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  // Helper to filter mentors for a specific stream based on their expertise tags
  const getMentorsForStream = (stream: typeof STREAMS[0]) => {
    // Start with the featured animated sample mentor
    const streamMentors: Mentor[] = [stream.featuredMentor];
    
    // Add real API mentors that match the tags
    const matchedApiMentors = apiMentors.filter(mentor => 
      mentor.mentorProfile?.expertise?.some(exp => stream.tags.includes(exp)) || 
      (stream.tags.includes("All Mentors") && !STREAMS.slice(0, 4).some(s => mentor.mentorProfile?.expertise?.some(e => s.tags.includes(e))))
    );
    
    streamMentors.push(...matchedApiMentors);

    // Apply search filter if active
    if (searchQuery) {
      return streamMentors.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.mentorProfile?.expertise?.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.mentorProfile?.role?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return streamMentors;
  };

  return (
    <MainLayout>
      {/* Premium Hero Section */}
      <div className="relative bg-black rounded-3xl p-10 md:p-16 mb-16 overflow-hidden shadow-2xl">
        {/* Animated gradients */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-70"></div>
          <div className="absolute top-[20%] left-[30%] w-64 h-64 bg-pink-500 rounded-full mix-blend-screen filter blur-[80px] opacity-50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white text-sm font-bold tracking-wide">Connect with Industry Leaders</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200 mb-6 tracking-tight">
            Mentorship Hub
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed font-light">
            Whether you&apos;re mastering code, designing interfaces, training for nationals, or cracking UPSC—book <strong className="text-white font-semibold">Free 1-on-1 Sessions</strong> with world-class mentors across all our streams.
          </p>
          
          <div className="relative w-full max-w-2xl group">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
             <input 
               type="text" 
               placeholder="Search mentors by name, company, or specific skill..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-gray-300 rounded-2xl outline-none focus:border-indigo-400 focus:bg-white/20 transition-all text-lg shadow-2xl" 
             />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="space-y-24 mb-20">
          {STREAMS.map((stream) => {
            const streamMentors = getMentorsForStream(stream);
            
            // If searching and no results in this stream, skip it
            if (streamMentors.length === 0 && searchQuery) return null;

            return (
              <section key={stream.id} className="relative scroll-mt-24" id={stream.id}>
                {/* Stream Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stream.gradient} flex items-center justify-center text-white shadow-lg shadow-${stream.gradient.split('-')[1]}/30`}>
                      <stream.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{stream.title}</h2>
                      <p className="text-gray-500 mt-1 font-medium">{stream.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {streamMentors.map(mentor => (
                    <div key={mentor.id} className={`bg-white rounded-2xl p-6 border-2 ${mentor.isFeaturedSample ? stream.border : 'border-gray-100'} shadow-sm hover:shadow-xl transition-all flex flex-col sm:flex-row gap-6 group relative overflow-hidden`}>
                      
                      {mentor.isFeaturedSample && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm flex items-center gap-1 z-20">
                          <Zap className="w-3 h-3" /> Featured Profile
                        </div>
                      )}
                      
                      {/* Subtle background glow on hover */}
                      <div className={`absolute top-0 right-0 w-32 h-32 ${stream.bgLight} rounded-full mix-blend-multiply filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-1/2 -translate-y-1/2`}></div>
                      
                      {/* Profile Image */}
                      <div className="flex flex-col items-center gap-3 relative z-10 shrink-0">
                        <div className={`w-28 h-28 rounded-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br ${mentor.isFeaturedSample ? stream.gradient : 'from-indigo-100 to-purple-100'} p-1 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                            <div className="w-full h-full bg-white rounded-full relative overflow-hidden flex items-center justify-center">
                              {mentor.isFeaturedSample ? (
                                <Image 
                                  src={mentor.featuredImage!} 
                                  alt={mentor.name} 
                                  width={80}
                                  height={80}
                                  className="object-contain" 
                                  unoptimized
                                />
                              ) : (
                                <Image 
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.name}`} 
                                  alt={mentor.name} 
                                  fill
                                  className="object-cover" 
                                  unoptimized
                                />
                              )}
                            </div>
                            <div className="absolute bottom-0 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center" title="Available Now">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <p className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 shadow-sm">Free Session</p>
                      </div>
                      
                      {/* Mentor Details */}
                      <div className="flex-1 relative z-10">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className={`text-xl font-bold ${mentor.isFeaturedSample ? 'text-gray-900 group-hover:text-indigo-600' : 'text-gray-900'} transition-colors`}>{mentor.name}</h3>
                          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-lg text-xs font-bold border border-amber-200 shadow-sm">
                              <Star className="w-3.5 h-3.5 fill-current" /> {mentor.mentorProfile?.rating || "5.0"}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-2">{mentor.mentorProfile?.role || "Specialist"} {mentor.mentorProfile?.company && `at ${mentor.mentorProfile.company}`}</p>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">{mentor.mentorProfile?.bio}</p>
                        
                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-4">
                            <span className="flex items-center gap-1.5"><Video className="w-4 h-4 text-gray-400" /> {mentor.mentorProfile?.totalSessions || 0}+ Sessions</span>
                            <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-gray-400" /> Excellent</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {mentor.mentorProfile?.expertise?.map(tag => (
                            <span key={tag} className={`text-xs ${stream.bgLight} text-gray-700 border ${stream.border} px-2.5 py-1 rounded-md font-medium shadow-sm`}>{tag}</span>
                          ))}
                        </div>
                        
                        {/* CTAs */}
                        <div className="flex gap-3">
                          {/* If it's a sample mentor, we might not have a real profile page. But the dynamic route [id] works with any ID! */}
                          <Link href={`/mentors/${mentor.id}`} className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm">
                            Profile
                          </Link>
                          <Link 
                            href={`/mentors/${mentor.id}/book`}
                            className={`flex-1 ${mentor.isFeaturedSample ? `bg-gradient-to-r ${stream.gradient}` : 'bg-gray-900 hover:bg-gray-800'} text-white font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2`}
                          >
                            <Calendar className="w-4 h-4" /> Book For Free
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </MainLayout>
  );
}
