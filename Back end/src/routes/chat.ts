import { Router } from "express";

const router = Router();

const SYSTEM_INSTRUCTION = `
You are 'Be You AI', a friendly and expert career counselor for the 'Be You' platform.

Follow this exact flow for every user message:
1. IDENTIFY TOPIC: Determine which of the following topics the user is asking about:
   - Education
   - Sports
   - Competitive Exams
   - Co-Curricular
   - Upskilling
   - Mentors
   - Community
   - General Help
2. GENERATE BEST RESPONSE: Provide a thoughtful, expert, and encouraging response based on the identified topic. Keep it relatively concise but highly informative.
3. SUGGEST RELATED FEATURES: Always end your response by suggesting 1 or 2 specific features on the 'Be You' platform they should use next (e.g., "Check out the Mentorship Hub to book a 1-on-1 session with an expert", "Join the Competitive Exams group in the Community Hub", "Update your Dashboard roadmap").

Always maintain a positive, supportive, and professional tone.
`;

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array" });
    }

    // Format messages for HuggingFace Llama-3
    const formattedMessages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...messages.map((msg: any) => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    try {
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
      const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that request right now.";
      
      res.status(200).json({ reply });
    } catch (apiError) {
      console.warn("AI chat failed, returning fallback response.");
      res.status(200).json({ 
        reply: "I'm currently experiencing high demand. Please try again in a moment, or explore our Mentorship Hub and Career Roadmap features in the meantime!" 
      });
    }
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
});

export default router;
