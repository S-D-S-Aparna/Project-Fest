"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Bot, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchResults() {
      if (!query) return;
      
      setLoading(true);
      setError("");
      setResult("");

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch search results");
        }

        setResult(data.result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <Bot className="w-16 h-16 text-indigo-200 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What are you looking for?</h2>
        <p className="text-gray-500 max-w-md">
          Type in the search bar above to let our AI assistant find the perfect courses, mentors, or exams for you.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Search Results</h1>
          <p className="text-gray-500">Results for: <span className="font-semibold text-gray-700">"{query}"</span></p>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
            <Bot className="absolute inset-0 m-auto w-6 h-6 text-indigo-600" />
          </div>
          <p className="text-lg font-medium text-gray-700 animate-pulse">Analyzing your request...</p>
          <p className="text-sm text-gray-500 mt-2">Our AI is searching the platform for the best matches.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-red-800 mb-1">Oops! Something went wrong</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && result && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="prose prose-indigo max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
