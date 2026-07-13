import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

    // Format messages for Gemini API
    const history = messages.map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: history,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    const reply = response.text || "I'm sorry, I couldn't process that request.";
    
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
});

export default router;
