import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

// Register for an event / co-curricular activity
router.post("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { eventName, activity, date } = req.body;
    
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    if (!eventName || !activity || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        userId: req.user.userId,
        eventName,
        activity,
        date: new Date(date)
      }
    });

    res.status(201).json({ registration });
  } catch (error) {
    console.error("Error creating event registration:", error);
    res.status(500).json({ error: "Failed to register for event" });
  }
});

// Get user's registrations
router.get("/", authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const registrations = await prisma.eventRegistration.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: { date: "asc" }
    });

    res.status(200).json({ registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

export default router;
