"use client";

import MainLayout from "@/components/layout/MainLayout";
import MapPlaceholder from "@/components/maps/MapPlaceholder";
import { Palette, Music, Camera, PenTool, Mic, Mic2, Heart, Star, Sparkles, Move } from "lucide-react";
import Link from "next/link";

const activities = [
  { name: "Dance", icon: Move },
  { name: "Singing & Music", icon: Music },
  { name: "Art & Painting", icon: Palette },
  { name: "Photography", icon: Camera },
  { name: "Acting", icon: Star },
  { name: "Public Speaking", icon: Mic },
  { name: "Fashion Design", icon: Sparkles },
  { name: "Graphic Design", icon: PenTool },
  { name: "Writing", icon: PenTool },
  { name: "Yoga & Wellness", icon: Heart },
  { name: "Cooking", icon: Sparkles }
];

export default function CoCurricular() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <Palette className="w-8 h-8 text-pink-200" />
          Co-Curricular Activities
        </h1>
        <p className="text-pink-50 max-w-2xl mb-6">
          Unleash your creativity and passions. Discover mentors, workshops, and competitions to help you build an amazing portfolio outside of academics.
        </p>
        <div className="flex gap-4">
          <a href="/mentors" className="bg-white text-pink-700 px-5 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors shadow-sm text-sm inline-block text-center">
            Find Mentors
          </a>
          <a href="/roadmap" className="bg-pink-800/40 border border-pink-400 hover:bg-pink-800/60 px-5 py-2 rounded-lg font-semibold transition-colors text-sm backdrop-blur-sm inline-block text-center text-white">
            Build Portfolio
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
        {activities.map((act, idx) => {
          const slug = act.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
          return (
          <Link href={`/co-curricular/${slug}`} key={idx} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all cursor-pointer flex flex-col items-center justify-center text-center group block">
            <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <act.icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm group-hover:text-pink-600 transition-colors">{act.name}</h3>
            <h3 className="font-semibold text-gray-800 text-sm group-hover:text-pink-600 transition-colors">{act.name}</h3>
          </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Competitions</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((comp) => (
                <div key={comp} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-100 rounded-lg hover:bg-pink-50/30 transition-colors">
                  <div>
                    <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded mb-2 inline-block">Photography</span>
                    <h3 className="font-bold text-gray-800">National Youth Photography Contest</h3>
                    <p className="text-sm text-gray-500">Win up to ₹50,000 and a feature in leading magazines.</p>
                  </div>
                  <Link href="/co-curricular/photography" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
                    Register Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Nearby Academies</h2>
            <MapPlaceholder title="Creative Schools" type="Dance, Music & Art Academies" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
