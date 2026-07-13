"use client";

import MainLayout from "@/components/layout/MainLayout";
import { GraduationCap, Target, BookOpen, Palette, Rocket, ArrowRight, Star, Award, Briefcase, Zap, Bot, Users } from "lucide-react";
import Link from "next/link";

const modules = [
  {
    title: "Education",
    description: "Explore degrees, colleges, and scholarships after 10th & 12th.",
    icon: GraduationCap,
    color: "bg-blue-500",
    href: "/education"
  },
  {
    title: "Sports",
    description: "Find academies, coaches, and sports career roadmaps.",
    icon: Target,
    color: "bg-green-500",
    href: "/sports"
  },
  {
    title: "Competitive Exams",
    description: "Prepare for UPSC, JEE, NEET, SSC with AI roadmaps.",
    icon: BookOpen,
    color: "bg-orange-500",
    href: "/competitive-exams"
  },
  {
    title: "Co-Curricular",
    description: "Dance, Music, Art, and other creative activities.",
    icon: Palette,
    color: "bg-pink-500",
    href: "/co-curricular"
  },
  {
    title: "Upskilling",
    description: "Learn AI, React, Data Science and trending skills.",
    icon: Rocket,
    color: "bg-purple-500",
    href: "/upskilling"
  }
];

export default function Home() {
  return (
    <MainLayout>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white mb-8 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Your True Passion</h2>
          <p className="text-indigo-100 text-lg mb-6">
            Get personalized career guidance, connect with mentors, and join communities that share your interests.
          </p>
          <div className="flex gap-4">
            <Link href="/roadmap" className="bg-white text-indigo-700 px-6 py-2.5 rounded-lg font-semibold shadow hover:bg-gray-50 transition-colors inline-block text-center">
              Explore Careers
            </Link>
            <Link href="/mentors" className="bg-indigo-800/50 hover:bg-indigo-800 text-white px-6 py-2.5 rounded-lg font-semibold backdrop-blur-sm transition-colors border border-indigo-500/30 inline-block text-center">
              Find a Mentor
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform translate-x-1/4 -translate-y-1/4">
            <path fill="#ffffff" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.2,-2.3C97.6,13.4,92.5,29.3,83.1,42.5C73.7,55.7,60,66.2,45.4,74.5C30.8,82.8,15.4,88.9,-0.4,89.5C-16.1,90.1,-32.3,85.2,-46.8,76.5C-61.4,67.8,-74.3,55.3,-82.9,40.7C-91.4,26.1,-95.7,9.4,-94.1,-6.6C-92.5,-22.5,-85.1,-37.7,-74.5,-49.4C-63.8,-61.1,-50,-69.3,-35.8,-76.3C-21.6,-83.4,-7.1,-89.3,7,-87.7C21.1,-86.1,42.2,-77.1,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Main Modules Grid */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Explore Categories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {modules.map((mod, idx) => (
          <Link href={mod.href} key={idx} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className={`w-12 h-12 ${mod.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
              <mod.icon className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">{mod.title}</h4>
            <p className="text-gray-500 text-sm mb-4">{mod.description}</p>
            <span className="text-indigo-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Trending Career Domains</h3>
              <Link href="/careers" className="text-sm text-indigo-600 font-medium hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Data Science', 'AI & ML', 'Cyber Security', 'Cloud Computing'].map((domain, i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-indigo-50 transition-colors cursor-pointer border border-gray-100">
                  <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                    <Zap className="w-5 h-5 text-indigo-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{domain}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Top Mentors</h3>
              <Link href="/mentors" className="text-sm text-indigo-600 font-medium hover:underline">Marketplace</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2].map((m) => (
                <Link href="/mentors" key={m} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah`} alt="Mentor" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Dr. Sarah Jenkins</h4>
                    <p className="text-xs text-gray-500 mb-2">Mentor @ Be You</p>
                    <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                      <Star className="w-3 h-3 fill-current" /> 4.9 (120 reviews)
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar widgets */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-bold text-indigo-900">Be You AI Assistant</h3>
            </div>
            <p className="text-sm text-indigo-800/80 mb-4">
              I can help you build personalized roadmaps, recommend courses, or review your resume.
            </p>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2.5 bg-white rounded-lg text-sm text-gray-700 hover:text-indigo-600 hover:shadow-sm transition-all border border-indigo-50">
                Top engineering colleges in India?
              </button>
              <button className="w-full text-left px-4 py-2.5 bg-white rounded-lg text-sm text-gray-700 hover:text-indigo-600 hover:shadow-sm transition-all border border-indigo-50">
                Generate an AI learning roadmap
              </button>
            </div>
            <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold shadow hover:bg-indigo-700 transition-colors">
              Chat with AI
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Community Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">New post in <span className="font-semibold">UPSC Prep</span></p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
