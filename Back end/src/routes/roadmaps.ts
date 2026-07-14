import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware";

const SYSTEM_INSTRUCTION = `
You are Be You AI, an expert career counselor. 
The user will give you a career or learning goal.
You must return a JSON array containing exactly 5 structured milestones to achieve this goal.
Each milestone object must have:
- "title": A short, punchy title for the step.
- "description": A 1-2 sentence description of what to do.

DO NOT return anything other than the JSON array. Do not include markdown blocks like \`\`\`json. Just the raw array.
`;

router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { goal } = req.body;
    if (!goal) return res.status(400).json({ error: "Goal is required" });

    let milestonesStr = "[]";
    
    try {
      const hfResponse = await fetch("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            { role: "user", content: goal }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!hfResponse.ok) {
        throw new Error(`HuggingFace API error: ${hfResponse.statusText}`);
      }

      const data = await hfResponse.json();
      milestonesStr = data.choices?.[0]?.message?.content || "[]";
    } catch (apiError) {
      console.warn("AI generation failed or API key missing, using fallback.");
      milestonesStr = "INVALID"; // Will trigger the catch block below
    }

    // Clean up in case Gemini added markdown blocks
    milestonesStr = milestonesStr.replace(/```json/g, "").replace(/```/g, "").trim();
    
    // Validate JSON
    try {
      JSON.parse(milestonesStr);
    } catch(e) {
      milestonesStr = JSON.stringify([
        { title: "Step 1: Research", description: "Start by researching the basics of " + goal },
        { title: "Step 2: Learn", description: "Take introductory courses." },
        { title: "Step 3: Practice", description: "Build small projects or practice." },
        { title: "Step 4: Network", description: "Connect with professionals in this field." },
        { title: "Step 5: Apply", description: "Apply for opportunities." }
      ]);
    }

    const roadmap = await prisma.roadmap.create({
      data: {
        title: `Roadmap to: ${goal}`,
        goal,
        milestones: milestonesStr,
        userId: req.user!.userId
      }
    });

    res.status(201).json({ roadmap });
  } catch (error) {
    console.error("Error generating roadmap:", error);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

router.get("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const roadmaps = await prisma.roadmap.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ roadmaps });
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    res.status(500).json({ error: "Failed to fetch roadmaps" });
  }
});

export default router;
