"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Bell, MonitorPlay, MessageSquare, Calendar, Bot, CheckCircle2 } from "lucide-react";

const notifications = [
  { id: 1, type: "mentor", title: "Session Confirmed", message: "Your 1-on-1 session with Rahul Sharma is confirmed for tomorrow at 10:00 AM.", time: "10 mins ago", icon: MonitorPlay, color: "bg-blue-100 text-blue-600", read: false },
  { id: 2, type: "ai", title: "New AI Recommendation", message: "Be You AI has generated a new learning roadmap based on your recent activity in Data Science.", time: "2 hours ago", icon: Bot, color: "bg-purple-100 text-purple-600", read: false },
  { id: 3, type: "community", title: "New Message in UPSC Prep", message: "Priya replied to your question about Modern History resources.", time: "5 hours ago", icon: MessageSquare, color: "bg-indigo-100 text-indigo-600", read: true },
  { id: 4, type: "event", title: "Upcoming Event Reminder", titleColor: "text-amber-800", message: "The 'Tech Careers 2026' webinar starts in 1 hour. Don't forget to join!", time: "1 day ago", icon: Calendar, color: "bg-amber-100 text-amber-600", read: true },
  { id: 5, type: "system", title: "Profile Update Successful", message: "Your role was successfully updated to 'Student'.", time: "2 days ago", icon: CheckCircle2, color: "bg-green-100 text-green-600", read: true },
];

export default function Notifications() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Bell className="w-6 h-6 text-indigo-600" /> Notifications
          </h1>
          <button className="text-indigo-600 text-sm font-medium hover:underline">
            Mark all as read
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100 bg-gray-50">
            <button className="flex-1 py-3 text-sm font-semibold text-indigo-700 border-b-2 border-indigo-600">All</button>
            <button className="flex-1 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Unread (2)</button>
            <button className="flex-1 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Mentors</button>
            <button className="flex-1 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Community</button>
          </div>

          <div className="divide-y divide-gray-50">
            {notifications.map((notif) => (
              <div key={notif.id} className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 cursor-pointer ${notif.read ? 'opacity-70' : 'bg-indigo-50/20'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                  <notif.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-semibold text-sm ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1.5 flex-shrink-0"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-100 text-center">
             <button className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
               Load More Notifications
             </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
