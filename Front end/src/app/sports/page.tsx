"use client";

import MainLayout from "@/components/layout/MainLayout";
import MapPlaceholder from "@/components/maps/MapPlaceholder";
import { ArrowRight, Trophy, Users, MonitorPlay, Target, Award, Shield } from "lucide-react";
import Link from "next/link";

const sportsList = [
  "Cricket", "Football", "Hockey", "Volleyball", "Badminton", "Kabaddi", 
  "Chess", "Swimming", "Athletics", "Wrestling", "Archery", "Tennis", 
  "Kho Kho", "Table Tennis", "Basketball", "Cycling", "Shooting", "Boxing"
];

export default function SportsHome() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-300" />
          Sports & Athletics
        </h1>
        <p className="text-green-50 max-w-2xl mb-6">
          Turn your passion for sports into a career. Discover academies, training roadmaps, coaches, and scholarships for major sports in India.
        </p>
        <div className="flex gap-4">
          <a href="/roadmap" className="bg-white text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-sm text-sm inline-block text-center">
            Sports Roadmaps
          </a>
          <Link href="/mentors" className="bg-green-800/40 border border-green-400 hover:bg-green-800/60 px-5 py-2 rounded-lg font-semibold transition-colors text-sm backdrop-blur-sm inline-block text-center text-white">
            Find Coaches
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Explore Sports</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {sportsList.map((sport, idx) => {
                const slug = sport.toLowerCase().replace(/\s+/g, '-');
                return (
                <Link href={`/sports/${slug}`} key={idx} className="bg-white border border-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium shadow-sm hover:shadow-md hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all cursor-pointer flex items-center justify-between group">
                  <span>{sport}</span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-600 transition-colors" />
                </Link>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Link href="/sports/career-roadmap" className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow block">
               <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                 <Shield className="w-5 h-5 text-amber-600" />
               </div>
               <h3 className="font-bold text-gray-800 mb-1">Career Opportunities</h3>
               <p className="text-sm text-gray-500 mb-3">Explore roles like Coach, Sports Analyst, Physiotherapist, and more.</p>
               <span className="text-sm font-semibold text-green-600 flex items-center gap-1">Explore Careers <ArrowRight className="w-3 h-3" /></span>
             </Link>
             
             <Link href="/sports/career-roadmap" className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow block">
               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                 <Target className="w-5 h-5 text-blue-600" />
               </div>
               <h3 className="font-bold text-gray-800 mb-1">Training Roadmaps</h3>
               <p className="text-sm text-gray-500 mb-3">Step-by-step guides from beginner to professional level athletes.</p>
               <span className="text-sm font-semibold text-green-600 flex items-center gap-1">View Roadmaps <ArrowRight className="w-3 h-3" /></span>
             </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Nearby Facilities</h2>
            <MapPlaceholder title="Sports Centers" type="Academies, Training Centres & Stadiums" />
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-green-900 mb-2">Book a Coach</h2>
            <p className="text-sm text-green-800/80 mb-4">Get 1-on-1 mentorship from professional athletes and certified coaches.</p>
            <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-lg shadow-sm border border-green-50">
               <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
               <div>
                 <p className="font-semibold text-gray-800 text-sm">Rahul Dravid</p>
                 <p className="text-xs text-gray-500">Cricket Coach (BCCI Level 3)</p>
               </div>
            </div>
            <button className="w-full bg-green-600 text-white font-medium py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
               Find Mentors
            </button>
          </div>
        </div>
      </div>

      {/* Conclusion & Exploring Direction */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Ready to level up your game?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Whether you&apos;re aiming for professional leagues or just getting started, expert guidance makes all the difference. Connect with top sports mentors or generate a custom training roadmap to reach your goals.
        </p>
        <div className="flex justify-center gap-4">
           <Link href="/mentors" className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-700 transition-colors shadow-sm text-sm inline-block text-center">
             Connect with Coach
           </Link>
           <a href="/roadmap" className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
             Create Roadmap
           </a>
        </div>
      </div>
    </MainLayout>
  );
}
