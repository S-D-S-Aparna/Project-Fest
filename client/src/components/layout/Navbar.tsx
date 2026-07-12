"use client";

import Link from "next/link";
import { Search, Bell, MessageSquare, Bot, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 px-4 md:px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 w-64">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">B</span>
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-none">
            Be You
          </h1>
          <p className="text-[10px] text-gray-500 font-medium tracking-wider">FOLLOWING YOUR PASSION</p>
        </div>
      </Link>

      <div className="flex-1 max-w-2xl px-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search any course, college, exam, career..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        <button className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
          <Bot className="w-4 h-4" /> AI Search
        </button>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-100">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium text-sm">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="hidden md:block text-sm mr-2">
                <p className="font-medium text-gray-700 leading-none">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <button onClick={logout} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Log Out">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-100">
             <Link href="/login" className="text-gray-600 font-medium text-sm hover:text-indigo-600 transition-colors">
               Log In
             </Link>
             <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
               Sign Up
             </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
