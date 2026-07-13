"use client";

import MainLayout from "@/components/layout/MainLayout";
import { FileText, Search, BookOpen, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
}

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}`}/api/resources`)
      .then(res => res.json())
      .then(data => {
        setResources(data.resources || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching resources:", err);
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <FileText className="w-8 h-8 text-teal-200" /> Study Resources
            </h1>
            <p className="text-teal-50 max-w-lg text-sm mb-6">
              Access past papers, study guides, technical documentation, and curated learning materials.
            </p>
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search for subjects, topics, or materials..." className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-teal-300 outline-none shadow-sm" />
            </div>
          </div>
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 scale-150">
            <FileText className="w-64 h-64" />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10"><p className="text-gray-500 animate-pulse">Loading resources...</p></div>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map(resource => (
              <div key={resource.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                <span className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded font-semibold w-max mb-3">
                  {resource.category}
                </span>
                <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-teal-600 transition-colors">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-6 flex-1">{resource.description}</p>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-600 font-medium hover:text-teal-800 transition-colors text-sm mt-auto">
                  Access Resource <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hardcoded Free Resources Fallback */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
              <span className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded font-semibold w-max mb-3">Programming</span>
              <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-teal-600 transition-colors">freeCodeCamp</h3>
              <p className="text-sm text-gray-600 mb-6 flex-1">Learn to code with free online courses, programming projects, and interview preparation for developer jobs.</p>
              <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-600 font-medium hover:text-teal-800 transition-colors text-sm mt-auto">
                Access Resource <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
              <span className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded font-semibold w-max mb-3">Academics</span>
              <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-teal-600 transition-colors">Khan Academy</h3>
              <p className="text-sm text-gray-600 mb-6 flex-1">Free world-class education for anyone, anywhere. Covers math, science, and more from kindergarten to early college.</p>
              <a href="https://www.khanacademy.org/" target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-600 font-medium hover:text-teal-800 transition-colors text-sm mt-auto">
                Access Resource <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
              <span className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded font-semibold w-max mb-3">University Courses</span>
              <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-teal-600 transition-colors">MIT OpenCourseWare</h3>
              <p className="text-sm text-gray-600 mb-6 flex-1">A web-based publication of virtually all MIT course content. Open and available to the world.</p>
              <a href="https://ocw.mit.edu/" target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-600 font-medium hover:text-teal-800 transition-colors text-sm mt-auto">
                Access Resource <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
              <span className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded font-semibold w-max mb-3">Design</span>
              <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-teal-600 transition-colors">Google UX Design Certificate (Coursera)</h3>
              <p className="text-sm text-gray-600 mb-6 flex-1">Professional training designed by Google to get you on the fast track to jobs in UX design (audit for free).</p>
              <a href="https://www.coursera.org/professional-certificates/google-ux-design" target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-600 font-medium hover:text-teal-800 transition-colors text-sm mt-auto">
                Access Resource <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        )}

        {/* Conclusion & Exploring Direction */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-8 text-center mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Want more personalized guidance?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Resources are a great start, but sometimes you need a custom approach. You can build your own roadmap using our AI tool, or book a free session with a mentor for direct feedback.
          </p>
          <div className="flex justify-center gap-4">
             <a href="/roadmap" className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-sm text-sm">
               Generate Roadmap
             </a>
             <a href="/mentors" className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
               Find a Mentor
             </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
