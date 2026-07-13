"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Award, Search, FileText, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface Scholarship {
  id: number;
  title: string;
  description: string;
  amount: string | null;
  deadline: string | null;
  organization: string;
  url: string | null;
}

export default function Scholarships() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`}/api/scholarships`)
      .then(res => res.json())
      .then(data => {
        setScholarships(data.scholarships || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching scholarships:", err);
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-200" /> Scholarships & Grants
            </h1>
            <p className="text-amber-50 max-w-lg text-sm mb-6">
              Discover and apply for financial aid, scholarships, and grants to support your educational journey.
            </p>
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search by degree, field, or location..." className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-amber-300 outline-none shadow-sm" />
            </div>
          </div>
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 scale-150">
            <Award className="w-64 h-64" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10"><p className="text-gray-500 animate-pulse">Loading scholarships...</p></div>
        ) : scholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scholarships.map(scholarship => (
              <div key={scholarship.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800 text-lg">{scholarship.title}</h3>
                  {scholarship.amount && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-semibold whitespace-nowrap">
                      {scholarship.amount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{scholarship.description}</p>
                
                <div className="flex flex-col gap-2 mt-auto">
                  <div className="flex items-center text-xs text-gray-500">
                    <Award className="w-4 h-4 mr-2" />
                    <span>{scholarship.organization}</span>
                  </div>
                  {scholarship.deadline && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <a href={scholarship.url || "#"} className="mt-4 block w-full text-center bg-amber-50 hover:bg-amber-100 text-amber-700 py-2 rounded-lg font-medium transition-colors text-sm">
                  View Details
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500 shadow-sm">
            <FileText className="w-12 h-12 mx-auto mb-4 text-amber-200" />
            <p className="font-medium text-gray-800 mb-1 text-lg">No scholarships found</p>
            <p className="text-sm">We are partnering with top institutions to bring you the best opportunities soon.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
