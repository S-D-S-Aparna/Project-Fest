import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1].content;

    // Call Gemini API
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: latestMessage,
        config: {
           systemInstruction: "You are 'Be You AI', an expert career counselor, mentor, and educational guide for the 'Be You' platform. You help students discover their passions, suggest career roadmaps, and provide information about courses, sports, and competitive exams. Keep your tone encouraging, professional, and concise.",
        }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to generate AI response." }, { status: 500 });
  }
}
