"use client";

import MainLayout from "@/components/layout/MainLayout";
import CourseCard, { type CourseCardProps } from "@/components/education/CourseCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function After10th() {
  const [streams, setStreams] = useState<CourseCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`}/api/education?level=after_10th`)
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
        <span className="text-gray-800 font-medium">After 10th</span>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Courses After 10th</h1>
            <p className="text-gray-600 max-w-2xl">
              Start building the foundation of your career early. Choose between standard intermediate boards, skill-based polytechnic diplomas, or vocational training.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">50+</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Diplomas</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">100%</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Skill Focus</p>
            </div>
          </div>
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
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-blue-900">Entrance Exams</h3>
          </div>
          <p className="text-sm text-blue-800/70 mb-4">Exams for diploma and technical institutes after 10th.</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">POLYCET</span>
            <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">APRJC</span>
            <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">ITI Entrance</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
