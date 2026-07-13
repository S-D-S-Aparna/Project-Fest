"use client";

import { MapPin } from "lucide-react";

export default function MapPlaceholder({ title, type }: { title: string; type: string }) {
  const query = encodeURIComponent(`${title} ${type} India`);
  
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border border-gray-200 relative">
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-100 shadow-sm pointer-events-none">
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <p className="text-xs text-gray-500">Showing {type}</p>
      </div>
      
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://maps.google.com/maps?q=${query}&t=&z=11&ie=UTF8&iwloc=&output=embed`}
      ></iframe>
    </div>
  );
}
