# Be You - Career & Mentorship Platform

**Be You** is a comprehensive full-stack platform designed to help students discover their true passion through personalized career guidance, community engagement, and AI-powered roadmaps. 

## 🚀 Features

- **🎓 Interactive Hubs:** Dedicated sections for Education, Sports, Competitive Exams, Upskilling, and Co-Curricular activities, complete with Google Maps integrations.
- **🤝 Mentorship System:** A robust system allowing students to discover mentors and book 1-on-1 sessions.
- **🤖 Be You AI Chatbot:** An integrated Gemini 2.5 Flash chatbot that acts as a personalized career counselor, identifying user topics and recommending platform features.
- **🗺️ AI Roadmap Generator:** Automatically generates structured 5-step career milestones based on user goals using Google's Gemini AI.
- **💬 Community Forum:** Users can read and post real-time community discussions.
- **🔐 Secure Authentication:** Role-based (Student/Mentor) JWT authentication.
- **🛡️ Admin Control Panel:** A dashboard to monitor platform statistics and promote students to mentors.

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Maps:** Google Maps API (`@react-google-maps/api`)

### Backend (`/server`)
- **Server:** Node.js & Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **AI Integration:** Google GenAI API (`gemini-2.5-flash`)
- **Authentication:** JWT & bcrypt

## ⚙️ Local Development

### Prerequisites
- Node.js
- PostgreSQL (Running locally)
- A Google Maps API Key
- A Google Gemini API Key

### Setup
1. Clone the repository.
2. Run `npm install` in both the `client` and `server` directories.
3. Configure your `.env` files in both directories based on your local setup.
4. Run `npx prisma db push` and `npx prisma generate` in the `server` directory.
5. Open a terminal and start the backend: 
   ```bash
   cd server
   npm run dev
   ```
6. Open a **new, separate terminal** and start the frontend:
   ```bash
   cd client
   npm run dev
   ```
7. Visit `http://localhost:3000`

---
*Built to help you follow your passion.*
