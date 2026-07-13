"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Bookmark, FolderHeart, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface SavedItem {
  id: number;
  itemType: string;
  itemId: number;
  createdAt: string;
}

export default function Saved() {
  const { token, user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (!token) {
      return;
    }

    let isMounted = true;

    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/saved`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch saved items");
        }

        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setItems(data);
          setError("");
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An error occurred");
          }
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token, user, authLoading, router]);

  const handleUnsave = async (itemType: string, itemId: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/saved/${itemType}/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error("Failed to unsave item");
      }
      
      // Remove item from state
      setItems(items.filter(i => !(i.itemType === itemType && i.itemId === itemId)));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Failed to remove item");
      }
    }
  };

  if (authLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Bookmark className="w-8 h-8 text-purple-200" /> Saved Items
            </h1>
            <p className="text-purple-50 max-w-lg text-sm mb-2">
              Your personal collection of bookmarked mentors, courses, articles, and roadmaps.
            </p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 scale-150">
            <Bookmark className="w-64 h-64" />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500 shadow-sm">
            <FolderHeart className="w-12 h-12 mx-auto mb-4 text-purple-200" />
            <p className="font-medium text-gray-800 mb-1 text-lg">Your saved list is empty</p>
            <p className="text-sm">Explore the platform and click the bookmark icon to save your favorite items here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
                <div>
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-2 uppercase tracking-wider">
                    {item.itemType}
                  </span>
                  <p className="text-gray-800 font-medium">Item ID: {item.itemId}</p>
                  <p className="text-xs text-gray-400 mt-1">Saved on {new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => handleUnsave(item.itemType, item.itemId)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
