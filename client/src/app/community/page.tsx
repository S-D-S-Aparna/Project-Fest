"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Users, Search, MessageSquare, Image as ImageIcon, Paperclip, Send, ThumbsUp, MessageCircle } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const communities = [
  { name: "Education Hub", members: "12.5k" },
  { name: "Sports & Athletics", members: "8.2k" },
  { name: "Competitive Exams", members: "45.1k" },
  { name: "Co-Curricular", members: "5.4k" },
  { name: "Tech & Upskilling", members: "24.8k" },
];

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: { name: string; role: string };
  comments: any[];
};

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState("Discussions");
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/community/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!token) {
      alert("Please log in to create a post.");
      return;
    }
    if (!newPostContent.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/community/posts",
        {
          title: newPostContent.slice(0, 30) + (newPostContent.length > 30 ? "..." : ""),
          content: newPostContent,
          category: "General"
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setNewPostContent("");
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Error creating post");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
        
        {/* Left Sidebar - Communities List */}
        <div className="w-full lg:w-64 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden flex-shrink-0">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" /> My Communities
            </h2>
          </div>
          <div className="p-2 overflow-y-auto flex-1 space-y-1">
            {communities.map((c, i) => (
              <button key={i} className={`w-full text-left px-3 py-3 rounded-lg transition-colors flex items-center justify-between ${i === 2 ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-gray-50 border border-transparent'}`}>
                <span className={`font-medium text-sm ${i === 2 ? 'text-indigo-700' : 'text-gray-700'}`}>{c.name}</span>
                <span className="text-xs text-gray-400 bg-white px-1.5 py-0.5 rounded shadow-sm">{c.members}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Feed/Chat */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white z-10">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Competitive Exams</h1>
              <p className="text-xs text-gray-500">45.1k Members • 1,204 Online</p>
            </div>
            
            <div className="flex bg-gray-100 p-1 rounded-lg">
               {["Discussions", "Q&A", "Events"].map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </div>

          {/* Feed Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-10 text-gray-500">Loading posts...</div>
              ) : posts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No posts yet. Be the first to start a discussion!</div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-bold text-sm">
                          {post.author.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{post.author.name}</h4>
                        <p className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()} • {post.author.role === 'mentor' ? 'Mentor' : 'Student'}
                        </p>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                       <button className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-600 text-sm font-medium transition-colors">
                         <ThumbsUp className="w-4 h-4" /> 0 Likes
                       </button>
                       <button className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-600 text-sm font-medium transition-colors">
                         <MessageCircle className="w-4 h-4" /> {post.comments.length} Replies
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
             <div className="flex items-center gap-2">
               <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                 <Paperclip className="w-5 h-5" />
               </button>
               <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                 <ImageIcon className="w-5 h-5" />
               </button>
               <div className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 flex items-center">
                 <input 
                   type="text" 
                   placeholder="Start a discussion..." 
                   className="bg-transparent border-none outline-none w-full text-sm"
                   value={newPostContent}
                   onChange={(e) => setNewPostContent(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleCreatePost()}
                 />
               </div>
               <button 
                 onClick={handleCreatePost}
                 className="p-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-full transition-colors shadow-sm"
               >
                 <Send className="w-4 h-4 ml-0.5" />
               </button>
             </div>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}
