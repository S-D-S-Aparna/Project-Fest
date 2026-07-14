"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, MessageSquare, Bot, LogOut, MapPin, GraduationCap, Dumbbell, BookOpen, Briefcase, Palette, FlaskConical, Building2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const searchSuggestions = [
  { icon: GraduationCap, label: "Colleges near me", query: "colleges+near+me", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: BookOpen, label: "Coaching centers near me", query: "coaching+centers+near+me", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Dumbbell, label: "Sports academies near me", query: "sports+academies+near+me", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: FlaskConical, label: "Science labs near me", query: "science+labs+near+me", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Palette, label: "Art & design institutes near me", query: "art+design+institutes+near+me", color: "text-pink-600", bg: "bg-pink-50" },
  { icon: Building2, label: "Libraries near me", query: "libraries+near+me", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Briefcase, label: "Internship offices near me", query: "internship+offices+near+me", color: "text-indigo-600", bg: "bg-indigo-50" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on typed text
  const filteredSuggestions = searchValue.trim()
    ? searchSuggestions.filter(s => s.label.toLowerCase().includes(searchValue.toLowerCase()))
    : searchSuggestions;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function openGoogleMaps(query: string) {
    window.open(`https://www.google.com/maps/search/${query}`, "_blank");
    setShowDropdown(false);
  }

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
        <div className="relative flex-1 flex gap-2 w-full" ref={dropdownRef}>
          <form
            className="relative flex-1 flex gap-2 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchValue.trim()) {
                setShowDropdown(false);
                window.location.href = `/search?q=${encodeURIComponent(searchValue.trim())}`;
              }
            }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={inputRef}
                name="search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search any course, college, exam, career..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="hidden md:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
            >
              <Bot className="w-4 h-4" /> AI Search
            </button>
          </form>

          {/* Dropdown Suggestions */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Google Maps Quick Actions */}
              <div className="px-4 pt-3 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  <MapPin className="w-3 h-3" />
                  Find on Google Maps
                </div>
                <div className="space-y-0.5">
                  {filteredSuggestions.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => openGoogleMaps(item.query)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                      <MapPin className="w-3.5 h-3.5 text-gray-300 ml-auto group-hover:text-red-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider + AI search hint */}
              {searchValue.trim() && (
                <div className="border-t border-gray-100 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDropdown(false);
                      window.location.href = `/search?q=${encodeURIComponent(searchValue.trim())}`;
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <span className="text-sm text-indigo-700 font-semibold">AI Search: </span>
                      <span className="text-sm text-indigo-600">"{searchValue}"</span>
                    </div>
                  </button>
                </div>
              )}

              {filteredSuggestions.length === 0 && !searchValue.trim() && (
                <div className="px-4 py-6 text-center text-sm text-gray-400">
                  No suggestions found
                </div>
              )}
            </div>
          )}
        </div>
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
