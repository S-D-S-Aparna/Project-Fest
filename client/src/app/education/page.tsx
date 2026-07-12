"use client";

import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Microscope, Briefcase, Award } from "lucide-react";
import MapPlaceholder from "@/components/maps/MapPlaceholder";

const levels = [
  {
    title: "After 10th",
    desc: "Intermediate, Polytechnic, ITI, Diploma",
    icon: BookOpen,
    href: "/education/after-10th",
    color: "bg-blue-500"
  },
  {
    title: "After 12th",
    desc: "Engineering, Medical, Commerce, Arts & More",
    icon: GraduationCap,
    href: "/education/after-12th",
    color: "bg-indigo-500"
  },
  {
    title: "Bachelor's",
    desc: "Major degree programs available in India",
    icon: Briefcase,
    href: "/education/bachelors",
    color: "bg-purple-500"
  },
  {
    title: "Master's",
    desc: "Postgraduate programs & specializations",
    icon: Award,
    href: "/education/masters",
    color: "bg-pink-500"
  },
  {
    title: "PhD",
    desc: "Research opportunities & higher ed guidance",
    icon: Microscope,
    href: "/education/phd",
    color: "bg-orange-500"
  }
];

export default function EducationHome() {
  return (
    <MainLayout>
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Education Pathways</h1>
        <p className="text-gray-600 mb-6">Discover the perfect academic route for your career goals, from high school to doctoral research.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level, i) => (
            <Link href={level.href} key={i} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
              <div className={`w-12 h-12 ${level.color} rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <level.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 group-hover:text-indigo-700">{level.title}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-2">{level.desc}</p>
                <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Nearby Institutions</h2>
          <p className="text-sm text-gray-600 mb-6">Find top colleges, universities, and coaching centers near your location.</p>
          <MapPlaceholder title="Colleges & Universities" type="Educational Institutes" />
        </div>
        
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-3">AI Education Roadmap</h2>
            <p className="text-indigo-200 mb-6 text-sm leading-relaxed max-w-sm">
              Not sure which degree or college is right for you? Let Be You AI build a personalized education roadmap based on your interests and strengths.
            </p>
            <a href="/roadmap" className="inline-block bg-white text-indigo-900 px-6 py-2.5 rounded-lg font-semibold shadow hover:bg-indigo-50 transition-colors text-sm">
              Generate My Roadmap
            </a>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
             <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
        </div>
      </div>

      {/* Conclusion & Exploring Direction */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">What's Next in your Education?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Now that you've explored different educational paths, it's time to take action. You can connect with an expert mentor to discuss your options or browse our extensive resource library.
        </p>
        <div className="flex justify-center gap-4">
           <a href="/mentors" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm text-sm">
             Talk to a Mentor
           </a>
           <a href="/resources" className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
             View Resources
           </a>
        </div>
      </div>
    </MainLayout>
  );
}
