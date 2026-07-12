"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Bot, Send, User, Sparkles, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi! I am Be You AI, your personal career guide. How can I help you discover your passion today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: userMsg }] }),
      });

      const data = await response.json();
      
      if (response.ok) {
         setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
      } else {
         setMessages(prev => [...prev, { role: "ai", content: "Sorry, I encountered an error. Please try again." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "ai", content: "Network error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center gap-3">
           <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-6 h-6 text-white" />
           </div>
           <div>
             <h1 className="font-bold text-lg flex items-center gap-2">Be You AI <Sparkles className="w-4 h-4 text-blue-200" /></h1>
             <p className="text-xs text-blue-100">Your AI Career Counselor</p>
           </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-6">
           {messages.map((msg, i) => (
             <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-5 h-5" />
                  </div>
                )}
                
                <div className={`max-w-[75%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'}`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-5 h-5" />
                  </div>
                )}
             </div>
           ))}
           
           {isLoading && (
             <div className="flex gap-4 justify-start">
               <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-5 h-5" />
               </div>
               <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
                 <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                 <span className="text-sm text-gray-500">Thinking...</span>
               </div>
             </div>
           )}
           <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3">
             <input 
               type="text" 
               placeholder="Ask about careers, courses, or roadmaps..." 
               className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               disabled={isLoading}
             />
             <button 
               onClick={handleSend}
               disabled={isLoading || !input.trim()}
               className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
             >
               <Send className="w-5 h-5 ml-1" />
             </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">Be You AI can make mistakes. Verify important information.</p>
        </div>
      </div>
    </MainLayout>
  );
}
