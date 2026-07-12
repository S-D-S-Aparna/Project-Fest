"use client";

import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import { useMemo } from "react";

const libraries: "places"[] = ["places"];

export default function MapPlaceholder({ title, type }: { title: string; type: string }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const center = useMemo(() => ({ lat: 28.6139, lng: 77.2090 }), []); // Default to New Delhi

  if (loadError) {
    return (
      <div className="w-full h-64 bg-red-50 rounded-xl flex flex-col items-center justify-center border border-red-200">
        <MapPin className="w-10 h-10 text-red-500 mb-3" />
        <h3 className="font-semibold text-gray-800">Error loading Maps</h3>
        <p className="text-sm text-gray-500 text-center px-4 mt-1">Please check your API key.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-xl flex flex-col items-center justify-center border border-gray-200">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-3"></div>
        <p className="text-sm text-gray-500">Loading Map...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border border-gray-200 relative">
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <p className="text-xs text-gray-500">Showing {type}</p>
      </div>
      
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={12}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <Marker position={center} />
        <Marker position={{ lat: 28.6239, lng: 77.2190 }} />
        <Marker position={{ lat: 28.6039, lng: 77.1990 }} />
        <Marker position={{ lat: 28.6339, lng: 77.2290 }} />
      </GoogleMap>
    </div>
  );
}
