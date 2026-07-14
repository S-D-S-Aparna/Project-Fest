import { NextResponse } from "next/server";

// Smart local knowledge base for fallback when AI API is unavailable
const platformKnowledge: Record<string, { title: string; description: string; link: string }[]> = {
  "software engineer": [
    { title: "🖥️ B.Tech in Computer Science", description: "Build a strong foundation in algorithms, data structures, and system design. Top colleges include IITs, NITs, and IIIT Hyderabad.", link: "/education/bachelors" },
    { title: "💡 Upskilling: Full-Stack Development", description: "Learn React, Node.js, and databases to become job-ready. Practice with real-world projects.", link: "/upskilling" },
    { title: "🏆 Competitive Exams: JEE / GATE", description: "Crack JEE for B.Tech admission or GATE for M.Tech/PSU jobs in CS.", link: "/competitive-exams" },
  ],
  "data science": [
    { title: "📊 Data Science & AI Courses", description: "Master Python, statistics, machine learning, and deep learning frameworks like TensorFlow and PyTorch.", link: "/upskilling" },
    { title: "🎓 M.Tech / MS in Data Science", description: "Explore postgraduate programs at top institutions specializing in AI/ML.", link: "/education/masters" },
    { title: "🤖 AI Career Roadmap", description: "Generate a personalized roadmap to break into the Data Science field.", link: "/roadmap" },
  ],
  "doctor": [
    { title: "🩺 MBBS & Medical Careers", description: "Explore the path to becoming a doctor — from NEET preparation to MBBS admission.", link: "/education/bachelors" },
    { title: "📚 NEET Exam Preparation", description: "Resources, study plans, and mentor guidance for cracking NEET UG/PG.", link: "/competitive-exams" },
    { title: "👨‍⚕️ Connect with Medical Mentors", description: "Book sessions with experienced doctors and medical professionals.", link: "/mentors" },
  ],
  "sports": [
    { title: "⚽ Sports Career Paths", description: "Explore professional careers in cricket, football, badminton, athletics, and more.", link: "/sports" },
    { title: "🏅 Sports Scholarships", description: "Find scholarships for student-athletes at top universities.", link: "/scholarships" },
    { title: "🗺️ Sports Career Roadmap", description: "Get an AI-generated roadmap for your sports career journey.", link: "/sports/career-roadmap" },
  ],
  "mentor": [
    { title: "🧑‍🏫 Browse Expert Mentors", description: "Connect with industry professionals across tech, medicine, arts, sports, and more.", link: "/mentors" },
    { title: "📅 Book a Free Session", description: "Schedule a one-on-one session with a mentor tailored to your career goals.", link: "/mentors" },
    { title: "🌟 Featured Mentors", description: "Explore our top-rated mentors and their areas of expertise.", link: "/mentors" },
  ],
  "exam": [
    { title: "📝 Competitive Exams Hub", description: "Find resources for JEE, NEET, GATE, UPSC, CAT, and more.", link: "/competitive-exams" },
    { title: "📖 Exam Preparation Resources", description: "Study materials, previous papers, and strategy guides.", link: "/resources" },
    { title: "🎯 Personalized Study Plans", description: "Get AI-powered study plans based on your target exam.", link: "/roadmap" },
  ],
  "design": [
    { title: "🎨 UI/UX Design Courses", description: "Learn Figma, Adobe XD, and design thinking to build stunning interfaces.", link: "/upskilling" },
    { title: "🖌️ Co-Curricular: Arts & Design", description: "Explore creative pathways in graphic design, animation, and visual arts.", link: "/co-curricular" },
    { title: "🧑‍🏫 Design Mentors", description: "Connect with professional designers for career guidance.", link: "/mentors" },
  ],
  "default": [
    { title: "🗺️ AI Career Roadmap", description: "Tell us your dream career and get a personalized roadmap powered by AI.", link: "/roadmap" },
    { title: "🧑‍🏫 Explore Mentors", description: "Connect with professionals who can guide your journey.", link: "/mentors" },
    { title: "📚 Courses & Upskilling", description: "Browse courses across tech, design, business, and more.", link: "/upskilling" },
  ],
};

function getLocalResults(query: string): string {
  const q = query.toLowerCase();
  let bestMatch = platformKnowledge["default"];
  let bestScore = 0;

  for (const [keyword, results] of Object.entries(platformKnowledge)) {
    if (keyword === "default") continue;
    const words = keyword.split(" ");
    const score = words.filter(w => q.includes(w)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = results;
    }
  }

  let md = `## 🔍 Here's what we found for "${query}"\n\n`;
  md += `We matched your search to the best resources on **Be You**!\n\n`;
  for (const item of bestMatch) {
    md += `### ${item.title}\n${item.description}\n\n`;
  }
  md += `\n> 💡 **Tip:** Try our [AI Career Roadmap](/roadmap) for a fully personalized plan!`;
  return md;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    // Try HuggingFace AI first
    try {
      const systemInstruction = `You are 'Be You AI', an intelligent search assistant for the 'Be You' educational platform.
The user is searching for something on the platform (courses, mentors, exams, sports, upskilling, etc).
Based on their query: "${query}"
Please provide a helpful, concise summary of what they should look into, and recommend up to 3 specific areas, topics, or roles they can explore on our platform.
Use Markdown formatting for readability. Be very encouraging and helpful. Keep it under 200 words.`;

      const formattedMessages = [
        { role: "system", content: systemInstruction },
        { role: "user", content: `I am looking for: ${query}` }
      ];

      const hfResponse = await fetch("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: formattedMessages,
          max_tokens: 300,
          temperature: 0.6
        }),
        signal: AbortSignal.timeout(10000),
      });

      if (hfResponse.ok) {
        const data = await hfResponse.json();
        const resultText = data.choices?.[0]?.message?.content;
        if (resultText) {
          return NextResponse.json({ result: resultText });
        }
      }
    } catch (aiError) {
      console.warn("AI Search: HuggingFace unavailable, using smart local fallback.", (aiError as Error).message);
    }

    // Fallback: smart local keyword-based search
    const fallbackResult = getLocalResults(query);
    return NextResponse.json({ result: fallbackResult });

  } catch (error) {
    console.error("AI Search Error:", error);
    return NextResponse.json({ error: "Failed to generate search results." }, { status: 500 });
  }
}
