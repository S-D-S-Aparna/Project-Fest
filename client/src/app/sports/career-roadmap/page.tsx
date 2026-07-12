"use client";

import MainLayout from "@/components/layout/MainLayout";
import { ChevronRight, Target, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const careers = [
  {
    role: "Professional Athlete",
    description: "Compete at national and international levels in your chosen sport.",
    timeline: "5-10 years of intensive training"
  },
  {
    role: "Sports Coach",
    description: "Train and mentor athletes to reach their maximum potential.",
    timeline: "Certification + 3-5 years experience"
  },
  {
    role: "Sports Analyst",
    description: "Analyze player performance, team strategies, and statistics using data.",
    timeline: "Degree in Sports Science/Analytics"
  },
  {
    role: "Physiotherapist",
    description: "Help athletes recover from injuries and maintain peak physical condition.",
    timeline: "BPT/MPT Degree + Certification"
  }
];

const roadmapSteps = [
  {
    level: "Beginner (0-2 Years)",
    focus: "Fundamentals & Conditioning",
    details: "Focus on learning the basic rules, building core strength, and developing fundamental skills through local academies."
  },
  {
    level: "Intermediate (2-5 Years)",
    focus: "Specialization & Competition",
    details: "Participate in district/state level tournaments. Identify your specific position or playstyle and train specialized techniques."
  },
  {
    level: "Advanced (5-8 Years)",
    focus: "Peak Performance & Strategy",
    details: "Engage in national level competitions. Work with sports psychologists, dieticians, and elite coaches for marginal gains."
  },
  {
    level: "Professional (8+ Years)",
    focus: "Mastery & Maintenance",
    details: "Compete at the highest professional leagues. Focus on injury prevention, legacy building, and transition into leadership roles."
  }
];

export default function SportsCareerRoadmap() {
  return (
    <MainLayout>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/sports" className="hover:text-green-600">Sports</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 font-medium">Career & Roadmap</span>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <Target className="w-8 h-8 text-teal-200" />
          Sports Careers & Training Roadmap
        </h1>
        <p className="text-teal-100 max-w-2xl">
          Discover the potential career paths in the sports industry and follow a structured roadmap to level up from a beginner to a professional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Career Opportunities */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-800">Career Opportunities</h2>
          </div>
          <div className="space-y-4">
            {careers.map((career, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{career.role}</h3>
                <p className="text-sm font-semibold text-emerald-600 mb-2">{career.timeline}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{career.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Training Roadmap */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-800">Training Roadmap</h2>
          </div>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-100 text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-gray-800">{step.level}</h3>
                  <p className="text-sm font-semibold text-emerald-600 mb-2">{step.focus}</p>
                  <p className="text-sm text-gray-600">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-teal-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">End of Sports Exploration</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          You have reviewed the core career options and the foundational roadmap for sports. Take this knowledge onto the field and start your training journey today. Best of luck on your athletic path!
        </p>
      </div>
    </MainLayout>
  );
}
