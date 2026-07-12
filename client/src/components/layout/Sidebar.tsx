"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, GraduationCap, BookOpen, Target, Palette, 
  Rocket, Users, MonitorPlay, Compass, Award, FileText, Bookmark, Calendar, HelpCircle
} from "lucide-react";

const mainLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/education", label: "Education", icon: GraduationCap },
  { href: "/sports", label: "Sports", icon: Target },
  { href: "/competitive-exams", label: "Competitive Exams", icon: BookOpen },
  { href: "/co-curricular", label: "Co-Curricular", icon: Palette },
  { href: "/upskilling", label: "Upskilling", icon: Rocket },
];

const secondaryLinks = [
  { href: "/chat", label: "Be You AI Chat", icon: Rocket },
  { href: "/community", label: "Community", icon: Users },
  { href: "/mentors", label: "Mentors", icon: MonitorPlay },
  { href: "/roadmap", label: "AI Roadmap", icon: Compass },
  { href: "/scholarships", label: "Scholarships", icon: Award },
  { href: "/resources", label: "Study Resources", icon: FileText },
];

const userLinks = [
  { href: "/dashboard", label: "My Dashboard", icon: Home },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/events", label: "Events & Webinars", icon: Calendar },
  { href: "/support", label: "Help & Support", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  const NavItem = ({ href, label, icon: Icon }: any) => {
    const isActive = pathname === href;
    return (
      <Link 
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive 
            ? "bg-indigo-50 text-indigo-700" 
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
        {label}
      </Link>
    );
  };

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-100 overflow-y-auto z-40 hidden lg:block">
      <div className="py-4 px-3 space-y-6">
        
        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Explore</p>
          <div className="space-y-1">
            {mainLinks.map((link) => (
              <NavItem key={link.href} {...link} />
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Discover</p>
          <div className="space-y-1">
            {secondaryLinks.map((link) => (
              <NavItem key={link.href} {...link} />
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Personal</p>
          <div className="space-y-1">
            {userLinks.map((link) => (
              <NavItem key={link.href} {...link} />
            ))}
          </div>
        </div>

        <div className="px-3 pt-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100/50">
            <h4 className="font-semibold text-indigo-900 mb-1 text-sm">Not sure what to choose?</h4>
            <p className="text-xs text-indigo-700/80 mb-3">Take our Career Discovery Quiz and find the best path.</p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm">
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
