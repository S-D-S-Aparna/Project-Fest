"use client";

import MainLayout from "@/components/layout/MainLayout";
import MapPlaceholder from "@/components/maps/MapPlaceholder";
import { Rocket, Code, Database, Monitor, BarChart, Cloud, ShieldCheck, PenTool, Layout, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

const technologies = [
  { name: "Agentic AI", icon: Rocket, category: "Artificial Intelligence" },
  { name: "Generative AI", icon: Rocket, category: "Artificial Intelligence" },
  { name: "Prompt Engineering", icon: FileText, category: "Artificial Intelligence" },
  { name: "Machine Learning", icon: Database, category: "Data Science" },
  { name: "Data Science & Analytics", icon: BarChart, category: "Data Science" },
  { name: "Python & SQL", icon: Code, category: "Programming" },
  { name: "React & Next.js", icon: Monitor, category: "Web Development" },
  { name: "UI/UX Design", icon: Layout, category: "Design" },
  { name: "Cloud Computing", icon: Cloud, category: "Infrastructure" },
  { name: "Cybersecurity", icon: ShieldCheck, category: "Infrastructure" },
  { name: "Digital Marketing & SEO", icon: BarChart, category: "Marketing" },
  { name: "Video Editing", icon: PenTool, category: "Creative" }
];

export default function Upskilling() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold mb-3 flex items-center gap-3">
            <Rocket className="w-8 h-8 text-purple-200" />
            Upskilling & New Tech
          </h1>
          <p className="text-purple-100 mb-6 leading-relaxed">
            Stay ahead of the curve. Master trending skills like Agentic AI, Cloud Computing, and Data Science. Build projects, earn certifications, and land your dream job.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/roadmap" className="bg-white text-purple-700 px-5 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors shadow-sm text-sm text-center inline-block">
              AI Roadmap
            </Link>
            <Link href="/mentors" className="bg-purple-800/40 border border-purple-400 hover:bg-purple-800/60 px-5 py-2 rounded-lg font-semibold transition-colors text-sm backdrop-blur-sm text-center inline-block">
              Talk to Expert
            </Link>
            <Link href="/resources" className="bg-purple-800/40 border border-purple-400 hover:bg-purple-800/60 px-5 py-2 rounded-lg font-semibold transition-colors text-sm backdrop-blur-sm text-center inline-block">
              Study Resources
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Trending Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech, idx) => {
            const slug = tech.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            return (
            <Link href={`/upskilling/${slug}`} key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group flex flex-col items-start">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <tech.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-purple-700 transition-colors">{tech.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{tech.category}</p>
            </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Career Roadmaps & Projects</h2>
              <button className="text-purple-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {[1, 2].map((proj) => (
                <div key={proj} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-100 rounded-lg">
                  <div>
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded mb-2 inline-block">Agentic AI</span>
                    <h3 className="font-bold text-gray-800">Build an AI Customer Support Agent</h3>
                    <p className="text-sm text-gray-500">Learn to integrate LLMs, function calling, and vector databases in 4 weeks.</p>
                  </div>
                  <Link href="/upskilling/projects" className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors whitespace-nowrap block text-center">
                    Start Project
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Local Tech Hubs & Events</h2>
            <MapPlaceholder title="Tech Events" type="Training Centres, Walk-in Interviews, & Career Fairs" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
