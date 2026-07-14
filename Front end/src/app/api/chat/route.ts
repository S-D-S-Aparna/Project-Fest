import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // We can pass the whole message history to HuggingFace for better context!
    // Format the messages for the Llama-3 instruct model
    const formattedMessages = [
      { 
        role: "system", 
        content: "You are 'Be You AI', an expert career counselor, mentor, and educational guide for the 'Be You' platform. You help students discover their passions, suggest career roadmaps, and provide information about courses, sports, and competitive exams. Keep your tone encouraging, professional, and concise."
      },
      ...messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))
    ];

    const hfResponse = await fetch("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: formattedMessages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!hfResponse.ok) {
      throw new Error(`HuggingFace API error: ${hfResponse.statusText}`);
    }

    const data = await hfResponse.json();
    const replyText = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that request right now.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json({ error: "Failed to generate AI response." }, { status: 500 });
  }
}
