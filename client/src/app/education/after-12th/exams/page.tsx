"use client";

import MainLayout from "@/components/layout/MainLayout";
import { ChevronRight, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const exams = [
  {
    name: "JEE Main",
    fullForm: "Joint Entrance Examination - Main",
    stream: "Engineering",
    description: "For admission to B.E./B.Tech, B.Arch, and B.Plan courses in NITs, IIITs, and other Centrally Funded Technical Institutions."
  },
  {
    name: "NEET UG",
    fullForm: "National Eligibility cum Entrance Test",
    stream: "Medical",
    description: "The primary medical entrance examination in India for admission to MBBS, BDS, and AYUSH courses."
  },
  {
    name: "CUET UG",
    fullForm: "Common University Entrance Test",
    stream: "All Streams",
    description: "A single window opportunity for students to seek admission in any of the Central Universities (CUs) across the country."
  },
  {
    name: "CLAT",
    fullForm: "Common Law Admission Test",
    stream: "Law",
    description: "A national level entrance exam for admissions to undergraduate (UG) and postgraduate (PG) law programs offered by 22 National Law Universities."
  },
  {
    name: "NDA & NA",
    fullForm: "National Defence Academy & Naval Academy Examination",
    stream: "Defence",
    description: "Conducted by UPSC for admission to the Army, Navy and Air Force wings of the NDA and for the Indian Naval Academy Course."
  },
  {
    name: "NATA",
    fullForm: "National Aptitude Test in Architecture",
    stream: "Architecture",
    description: "Measures the aptitude of the applicant for specific field of study, i.e. Architecture, through assessment of cognitive skills."
  },
  {
    name: "CA Foundation",
    fullForm: "Chartered Accountancy Foundation",
    stream: "Commerce",
    description: "The entry-level examination for the Chartered Accountancy course conducted by the Institute of Chartered Accountants of India (ICAI)."
  },
  {
    name: "NID DAT",
    fullForm: "National Institute of Design - Design Aptitude Test",
    stream: "Design",
    description: "A national level entrance exam to evaluate design aptitude for admission into B.Des and M.Des programs at various NID campuses."
  }
];

export default function EntranceExamsAfter12th() {
  return (
    <MainLayout>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/education" className="hover:text-indigo-600">Education</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/education/after-12th" className="hover:text-indigo-600">After 12th</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 font-medium">Entrance Exams</span>
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <FileText className="w-8 h-8 text-indigo-200" />
          Major Entrance Exams After 12th
        </h1>
        <p className="text-indigo-100 max-w-2xl">
          Below is a comprehensive list of top entrance examinations across various streams. Use this information to understand your options and begin your preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {exams.map((exam, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-gray-800">{exam.name}</h2>
              <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                {exam.stream}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-3">{exam.fullForm}</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {exam.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center mt-12 mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">End of Course Exploration</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          You have successfully reviewed the entrance exams and pathways available after 12th. Take your time to decide which exam aligns best with your career goals and start your focused preparation. Best of luck!
        </p>
      </div>
    </MainLayout>
  );
}
