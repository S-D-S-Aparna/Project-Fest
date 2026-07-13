"use client";

import MainLayout from "@/components/layout/MainLayout";
import CourseCard, { type CourseCardProps } from "@/components/education/CourseCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function After12th() {
  const [streams, setStreams] = useState<CourseCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`}/api/education?level=after_12th`)
      .then(res => res.json())
      .then(data => {
        setStreams(data.courses);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
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
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-500">Loading courses...</div>
        ) : (
          streams.map((stream, idx) => (
            <CourseCard key={idx} {...stream} />
          ))
        )}
      </div>
      
      {/* Sections for Entrance Exams & Mentors related to After 12th */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-indigo-900">Entrance Exams</h3>
             <Link href="/education/after-12th/exams" className="text-indigo-600 text-sm font-medium hover:underline">View All</Link>
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
      </div>
    </MainLayout>
  );
}
