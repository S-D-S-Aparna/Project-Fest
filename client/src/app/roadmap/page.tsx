"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Sparkles, ArrowRight, Target, Clock, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function RoadmapPage() {
  const { token, user } = useAuth();
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmaps, setRoadmaps] = useState<any[]>([]);

  useEffect(() => {
    if (token) fetchRoadmaps();
  }, [token]);

  const fetchRoadmaps = async () => {
    try {
      const res = await axios.get(\`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/roadmaps\`, {
        headers: { Authorization: \`Bearer \${token}\` }
      });
      setRoadmaps(res.data.roadmaps);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal || !token) return;

    setLoading(true);
    try {
      await axios.post(
        \`\${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/roadmaps\`,
        { goal },
        { headers: { Authorization: \`Bearer \${token}\` } }
      );
      setGoal("");
      fetchRoadmaps();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" /> AI Powered
            </div>
            <h1 className="text-3xl font-bold mb-2">Your Personal Career Roadmap</h1>
            <p className="text-indigo-100 mb-6 max-w-lg text-sm">
              Tell Be You AI what your dream career or learning goal is, and we'll generate a step-by-step personalized plan to get you there.
            </p>

            <form onSubmit={handleGenerate} className="flex gap-2">
              <div className="relative flex-1 max-w-lg">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g., I want to become a UX Designer..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-300 outline-none shadow-sm"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !goal}
                className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow disabled:opacity-70 flex items-center gap-2"
              >
                {loading ? "Generating..." : "Generate"} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 scale-150">
            <Target className="w-64 h-64" />
          </div>
        </div>

        {roadmaps.length === 0 && !loading && (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500 shadow-sm">
            <Clock className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
            <p>You haven't generated any roadmaps yet.</p>
          </div>
        )}

        {loading && (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 flex flex-col items-center justify-center shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-indigo-600 font-medium animate-pulse">Be You AI is mapping your future...</p>
          </div>
        )}

        {roadmaps.map((rm) => {
          let milestones = [];
          try {
            milestones = JSON.parse(rm.milestones);
          } catch (e) {
            console.error("Failed to parse milestones for", rm.id);
          }

          return (
            <div key={rm.id} className="bg-white border border-gray-100 rounded-2xl p-8 mb-8 shadow-sm">
              <div className="mb-8 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">{rm.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Generated for {user?.name}</p>
              </div>

              <div className="space-y-6">
                {milestones.map((m: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold z-10 shrink-0">
                        {idx + 1}
                      </div>
                      {idx < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-indigo-50 mt-2"></div>
                      )}
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex-1 hover:border-indigo-100 hover:shadow-md transition-all">
                      <h3 className="font-bold text-gray-800 mb-1 flex justify-between">
                        {m.title}
                        <button className="text-gray-400 hover:text-green-500 transition-colors">
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
