"use client";

import MainLayout from "@/components/layout/MainLayout";
import CourseCard from "@/components/education/CourseCard";
import { ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Phd() {
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/education?level=phd')
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
        <span className="text-gray-800 font-medium">Ph.D / Doctorate</span>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctoral Research</h1>
            <p className="text-gray-600 max-w-2xl">
              Push the boundaries of human knowledge. Discover fellowships, write thesis proposals, and secure funding for your doctoral studies.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">3-6</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Years</p>
            </div>
            <div className="w-px bg-gray-200"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">Dr.</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Title</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-500">Loading courses...</div>
        ) : (
          streams.map((stream, idx) => (
            <CourseCard key={idx} {...stream} />
          ))
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-orange-900">Grants & Fellowships</h3>
          </div>
          <p className="text-sm text-orange-800/70 mb-4">Popular funding sources to support your independent research.</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white text-orange-700 px-3 py-1 rounded-full text-xs font-semibold border border-orange-100">JRF</span>
            <span className="bg-white text-orange-700 px-3 py-1 rounded-full text-xs font-semibold border border-orange-100">PMRF</span>
            <span className="bg-white text-orange-700 px-3 py-1 rounded-full text-xs font-semibold border border-orange-100">Fulbright</span>
            <span className="bg-white text-orange-700 px-3 py-1 rounded-full text-xs font-semibold border border-orange-100">DAAD</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
