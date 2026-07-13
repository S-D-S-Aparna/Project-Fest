import { Clock, IndianRupee, Briefcase, BookOpen, Cpu, Wrench, Activity, Camera, Laptop, HeartPulse, Leaf, Calculator, Palette, Scale, Building, Plane, Shield, MonitorPlay, Microscope, Database, TrendingUp, FlaskConical, Stethoscope, Globe, BrainCircuit, GraduationCap, type LucideIcon } from "lucide-react";

const IconMap: Record<string, LucideIcon> = {
  BookOpen, Cpu, Wrench, Activity, Camera, Laptop, HeartPulse, Leaf, Calculator, Palette, Scale, Building, Plane, Shield, MonitorPlay, Microscope, Database, Briefcase, TrendingUp, FlaskConical, Stethoscope, Globe, BrainCircuit, GraduationCap
};

export interface CourseCardProps {
  title: string;
  category: string;
  duration: string;
  salary: string;
  icon: string | LucideIcon;
  color: string;
  careers: string[];
}

export default function CourseCard({ title, category, duration, salary, icon, color, careers }: CourseCardProps) {
  const Icon = typeof icon === 'string' ? (IconMap[icon] || BookOpen) : icon;
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group">
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors leading-tight">{title}</h4>
          <p className="text-xs font-semibold text-indigo-600 uppercase mt-1 tracking-wider">{category}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <ul className="text-sm text-gray-600 space-y-1.5 list-disc list-inside">
          {careers.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium text-gray-500 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" /> {duration}
        </div>
        <div className="flex items-center gap-1.5">
          <IndianRupee className="w-3.5 h-3.5" /> {salary} LPA
        </div>
        <div className="flex items-center gap-1.5 ml-auto text-indigo-600">
          <Briefcase className="w-3.5 h-3.5" /> High Demand
        </div>
      </div>
    </div>
  );
}
