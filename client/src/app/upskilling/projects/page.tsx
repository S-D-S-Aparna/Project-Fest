"use client";

import MainLayout from "@/components/layout/MainLayout";
import { ChevronRight, Code, Database, Rocket, Layout, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const projectSteps = [
  {
    phase: "Phase 1: Setup & Architecture",
    duration: "Week 1",
    tasks: [
      "Initialize Next.js frontend and Node.js backend",
      "Set up PostgreSQL database with Prisma ORM",
      "Configure OpenAI API keys and environment variables",
      "Design the chat interface UI components"
    ]
  },
  {
    phase: "Phase 2: Core AI Integration",
    duration: "Week 2",
    tasks: [
      "Implement basic LLM chat completion endpoint",
      "Add conversation history and memory handling",
      "Create system prompts for support agent persona",
      "Handle rate limiting and error states"
    ]
  },
  {
    phase: "Phase 3: RAG & Vector Search",
    duration: "Week 3",
    tasks: [
      "Set up a vector database (Pinecone/Milvus)",
      "Embed company documentation using text-embedding models",
      "Implement semantic search for user queries",
      "Inject retrieved context into the LLM prompt"
    ]
  },
  {
    phase: "Phase 4: Tool Calling & Polish",
    duration: "Week 4",
    tasks: [
      "Add function calling (e.g., check_order_status, refund_item)",
      "Implement streaming responses for better UX",
      "Write unit tests and perform security audits",
      "Deploy to Vercel (Frontend) and Render (Backend)"
    ]
  }
];

export default function UpskillingProject() {
  return (
    <MainLayout>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/upskilling" className="hover:text-purple-600">Upskilling</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 font-medium">Project Features</span>
      </div>

      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-purple-900/50 text-purple-200 text-xs px-2 py-1 rounded font-semibold border border-purple-500/30">
            Agentic AI
          </span>
          <span className="bg-indigo-900/50 text-indigo-200 text-xs px-2 py-1 rounded font-semibold border border-indigo-500/30">
            Advanced
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-3 flex items-center gap-3">
          <Rocket className="w-8 h-8 text-purple-300" />
          Build an AI Customer Support Agent
        </h1>
        <p className="text-purple-100 max-w-2xl">
          Learn how to build a production-ready Agentic AI support bot that utilizes Retrieval-Augmented Generation (RAG) and function calling to resolve customer queries autonomously.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Roadmap</h2>
          {projectSteps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-800">{step.phase}</h3>
                <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  {step.duration}
                </span>
              </div>
              <ul className="space-y-3">
                {step.tasks.map((task, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4">Core Technologies</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Next.js & React</h4>
                  <p className="text-xs text-gray-500">Frontend Framework</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Node.js</h4>
                  <p className="text-xs text-gray-500">Backend Server</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">PostgreSQL + Vector DB</h4>
                  <p className="text-xs text-gray-500">Data & Embeddings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-8 text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-12 h-12 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">End of Upskilling Exploration</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          You have reviewed the complete project requirements and roadmap. Now it's time to open your code editor and start building. Happy coding!
        </p>
      </div>
    </MainLayout>
  );
}
