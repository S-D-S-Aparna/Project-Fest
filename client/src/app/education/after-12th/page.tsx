"use client";

import MainLayout from "@/components/layout/MainLayout";
import CourseCard from "@/components/education/CourseCard";
import { Laptop, HeartPulse, Leaf, Calculator, Palette, Scale, Building, Plane, Shield, MonitorPlay, ChevronRight } from "lucide-react";
import Link from "next/link";

const streams = [
  {
    title: "Engineering & Tech",
    category: "B.Tech / B.E.",
    duration: "4 Yrs",
    salary: "4-12",
    icon: Laptop,
    color: "bg-blue-600",
    careers: ["Software Engineer", "Mechanical Engineer", "Civil Engineer"]
  },
  {
    title: "Medical & Healthcare",
    category: "MBBS, BDS, BAMS",
    duration: "5.5 Yrs",
    salary: "5-15",
    icon: HeartPulse,
    color: "bg-red-500",
    careers: ["Doctor", "Surgeon", "Dentist", "Therapist"]
  },
  {
    title: "Agriculture",
    category: "B.Sc Agriculture",
    duration: "4 Yrs",
    salary: "3-8",
    icon: Leaf,
    color: "bg-green-600",
    careers: ["Agronomist", "Research Scientist", "Forest Officer"]
  },
  {
    title: "Commerce",
    category: "B.Com, BBA, CA",
    duration: "3-5 Yrs",
    salary: "4-10",
    icon: Calculator,
    color: "bg-indigo-600",
    careers: ["Chartered Accountant", "Financial Analyst", "HR Manager"]
  },
  {
    title: "Arts & Humanities",
    category: "BA, Journalism",
    duration: "3 Yrs",
    salary: "3-7",
    icon: Palette,
    color: "bg-pink-500",
    careers: ["Journalist", "Psychologist", "Content Writer"]
  },
  {
    title: "Law",
    category: "Integrated LLB",
    duration: "5 Yrs",
    salary: "4-15",
    icon: Scale,
    color: "bg-amber-600",
    careers: ["Corporate Lawyer", "Judge", "Legal Advisor"]
  },
  {
    title: "Hotel Management",
    category: "BHM",
    duration: "3-4 Yrs",
    salary: "3-8",
    icon: Building,
    color: "bg-teal-600",
    careers: ["Hotel Manager", "Chef", "Event Coordinator"]
  },
  {
    title: "Aviation",
    category: "Pilot, Cabin Crew",
    duration: "1-3 Yrs",
    salary: "5-20",
    icon: Plane,
    color: "bg-sky-500",
    careers: ["Commercial Pilot", "Air Hostess", "ATC"]
  },
  {
    title: "Defence",
    category: "NDA",
    duration: "3-4 Yrs",
    salary: "6-12",
    icon: Shield,
    color: "bg-slate-700",
    careers: ["Army Officer", "Navy Officer", "Air Force Pilot"]
  }
];

export default function After12th() {
  return (
    <MainLayout>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/education" className="hover:text-indigo-600">Education</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 font-medium">After 12th</span>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Courses After 12th in India</h1>
            <p className="text-gray-600 max-w-2xl">
              Explore career-focused courses available after Class 12 across Science, Commerce, Arts and Vocational streams.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">250+</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Courses</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">5000+</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Colleges</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Top Career Streams</h2>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500">
            <option>All Streams</option>
            <option>Science (PCM)</option>
            <option>Science (PCB)</option>
            <option>Commerce</option>
            <option>Arts</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {streams.map((stream, idx) => (
          <CourseCard key={idx} {...stream} />
        ))}
      </div>
      
      {/* Sections for Entrance Exams & Mentors related to After 12th */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-indigo-900">Entrance Exams</h3>
             <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <p className="text-sm text-indigo-800/70 mb-4">Check important entrance exams for your dream course.</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">JEE Main</span>
            <span className="bg-white text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">NEET UG</span>
            <span className="bg-white text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">CUET</span>
            <span className="bg-white text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">CLAT</span>
            <span className="bg-white text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-100">NDA</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-gray-800">Need Guidance?</h3>
             <button className="text-indigo-600 text-sm font-medium hover:underline">Book Mentor</button>
          </div>
          <p className="text-sm text-gray-600 mb-4">Connect with students and professionals from top institutes.</p>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <MonitorPlay className="w-5 h-5 text-indigo-600" />
             </div>
             <div>
               <p className="text-sm font-semibold text-gray-800">1-on-1 Mentorship</p>
               <p className="text-xs text-gray-500">Starting at ₹299/session</p>
             </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
