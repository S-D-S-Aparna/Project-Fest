"use client";

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { User, BookOpen, MonitorPlay, MessageSquare, Settings, Award, Edit3, Target } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

type DashboardData = {
  id: number;
  name: string;
  email: string;
  role: string;
  posts: any[];
  bookingsAsStudent: any[];
  bookingsAsMentor: any[];
};

export default function UserDashboard() {
  const { user, token } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      axios.get(`http://localhost:5000/api/users/${user.userId}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setDashboardData(res.data.user);
      })
      .catch(err => {
        console.error("Failed to load dashboard data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user, token]);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-gray-500">Loading your dashboard...</div>
      </MainLayout>
    );
  }

  if (!user || !dashboardData) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Please log in to view your dashboard</h2>
          <Link href="/login" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">
            Log In
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Choose the relevant bookings to show (mentors see their students, students see their mentors)
  const bookingsToShow = dashboardData.role === "mentor" 
    ? dashboardData.bookingsAsMentor 
    : dashboardData.bookingsAsStudent;

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Profile Summary Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm md:w-1/3 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div className="w-24 h-24 bg-white p-1 rounded-full relative z-10 mt-8 mb-3">
             <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 font-bold text-3xl">
               {dashboardData.name.charAt(0).toUpperCase()}
             </div>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{dashboardData.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{dashboardData.email}</p>
          <div className="flex gap-2 mb-6">
             <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold capitalize">
               {dashboardData.role}
             </span>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors">
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        {/* Quick Stats & Progress */}
        <div className="md:w-2/3 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-700">Platform Activity</h3>
             </div>
             <p className="text-3xl font-bold text-gray-900 mb-1">{dashboardData.posts.length}</p>
             <p className="text-sm text-gray-500">Community Posts Created</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-700">Total Bookings</h3>
             </div>
             <p className="text-3xl font-bold text-gray-900 mb-1">{bookingsToShow.length}</p>
             <p className="text-sm text-gray-500">Sessions Scheduled</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Saved Items */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-600" /> Recent Posts</h3>
          <div className="space-y-4">
             {dashboardData.posts.length > 0 ? dashboardData.posts.map((post) => (
               <div key={post.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                 <div>
                   <h4 className="font-semibold text-gray-800 text-sm">{post.title}</h4>
                   <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                 </div>
                 <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium">View</span>
               </div>
             )) : (
               <p className="text-sm text-gray-500 italic">No posts created yet.</p>
             )}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MonitorPlay className="w-5 h-5 text-indigo-600" /> Upcoming Sessions
          </h3>
          <div className="space-y-4">
             {bookingsToShow.length > 0 ? bookingsToShow.map((booking: any) => (
               <div key={booking.id} className="flex items-center justify-between p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold shadow-sm">
                        {(booking.mentor?.name || booking.student?.name)?.charAt(0).toUpperCase()}
                     </div>
                     <div>
                       <h4 className="font-semibold text-gray-800 text-sm">
                         {booking.mentor ? `Mentor: ${booking.mentor.name}` : `Student: ${booking.student.name}`}
                       </h4>
                       <p className="text-xs text-indigo-600 font-medium">{new Date(booking.date).toLocaleString()}</p>
                     </div>
                   </div>
                   <button className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded font-medium shadow-sm hover:bg-indigo-700">Join Call</button>
               </div>
             )) : (
               <p className="text-sm text-gray-500 italic">No upcoming sessions booked.</p>
             )}
          </div>
        </div>
      </div>
      
      {/* Settings / Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <Link href="/community" className="bg-white p-4 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
            <MessageSquare className="w-6 h-6 text-gray-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Community Activity</p>
         </Link>
         <div className="bg-white p-4 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Settings className="w-6 h-6 text-gray-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Account Settings</p>
         </div>
      </div>
    </MainLayout>
  );
}
