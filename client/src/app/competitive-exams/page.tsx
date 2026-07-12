"use client";

import MainLayout from "@/components/layout/MainLayout";
import MapPlaceholder from "@/components/maps/MapPlaceholder";
import { BookOpen, Landmark, BriefcaseMedical, Code, Cpu, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

const exams = [
  { name: "UPSC CSE", category: "Civil Services", icon: Landmark, color: "bg-orange-500", applicants: "10L+" },
  { name: "JEE Advanced", category: "Engineering", icon: Code, color: "bg-blue-600", applicants: "1.5L+" },
  { name: "NEET UG", category: "Medical", icon: BriefcaseMedical, color: "bg-red-500", applicants: "24L+" },
  { name: "GATE", category: "Postgraduate Engg", icon: Cpu, color: "bg-indigo-500", applicants: "8L+" },
  { name: "CAT", category: "Management", icon: Target, color: "bg-amber-500", applicants: "3L+" },
  { name: "SSC CGL", category: "Govt. Jobs", icon: Landmark, color: "bg-emerald-600", applicants: "15L+" },
];

const categories = ["All", "Government", "Engineering", "Medical", "Management", "Law", "Defence"];

export default function CompetitiveExams() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-orange-200" />
          Competitive Exams
        </h1>
        <p className="text-orange-50 max-w-2xl mb-6">
          Everything you need to crack India's toughest exams. Get syllabus, preparation strategies, AI roadmaps, and coaching center details.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-orange-700 px-5 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-sm text-sm">
            AI Exam Roadmap
          </button>
          <button className="bg-orange-800/40 border border-orange-400 hover:bg-orange-800/60 px-5 py-2 rounded-lg font-semibold transition-colors text-sm backdrop-blur-sm">
            Mock Tests
          </button>
        </div>
      </div>

      <div className="mb-6 flex overflow-x-auto pb-2 scrollbar-hide gap-3">
        {categories.map((cat, idx) => (
          <button key={idx} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${idx === 0 ? "bg-orange-500 text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {exams.map((exam, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${exam.color} rounded-lg flex items-center justify-center text-white`}>
                <exam.icon className="w-6 h-6" />
              </div>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">
                {exam.applicants} Aspirants
              </span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg group-hover:text-orange-600 transition-colors">{exam.name}</h3>
            <p className="text-sm text-gray-500 font-medium mb-4">{exam.category}</p>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
               <div className="text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded text-center">Syllabus</div>
               <div className="text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded text-center">Exam Pattern</div>
               <div className="text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded text-center">Resources</div>
               <div className="text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded text-center">Strategy</div>
            </div>

            <span className="text-sm font-semibold text-orange-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              View Details <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
         <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
           <h2 className="text-lg font-bold text-gray-800 mb-4">Find Coaching Institutes Nearby</h2>
           <MapPlaceholder title="Coaching Centres" type="Exam Coaching Institutes" />
         </div>

         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
           <div>
             <h2 className="text-lg font-bold text-gray-800 mb-2">Topper Mentorship</h2>
             <p className="text-sm text-gray-600 mb-6">Book a 1-on-1 session with exam toppers and experienced educators to refine your strategy.</p>
             <div className="space-y-3">
               {[1, 2, 3].map((m) => (
                 <div key={m} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">IAS Rahul Sharma</p>
                      <p className="text-xs text-gray-500">UPSC AIR 45 (2022)</p>
                    </div>
                 </div>
               ))}
             </div>
           </div>
           <button className="w-full mt-6 bg-indigo-600 text-white font-medium py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
             View All Mentors
           </button>
         </div>
      </div>
    </MainLayout>
  );
}
