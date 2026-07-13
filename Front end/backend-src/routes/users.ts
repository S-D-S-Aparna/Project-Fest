import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

// Get all users (Admin)
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Update user role (Admin)
router.patch("/:id/role", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role },
      select: { id: true, name: true, role: true }
    });
    
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Failed to update role" });
  }
});

// Get mentors
router.get("/mentors", async (req, res) => {
  try {
    const mentors = await prisma.user.findMany({
      where: { role: "mentor" },
      select: { 
        id: true, 
        name: true, 
        email: true,
        mentorProfile: true
      }
    });
    res.status(200).json({ mentors });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ error: "Failed to fetch mentors" });
  }
});

// Get single mentor by ID
router.get("/mentors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await prisma.user.findFirst({
      where: { id: parseInt(id), role: "mentor" },
      select: { 
        id: true, 
        name: true, 
        email: true,
        mentorProfile: true 
      }
    });
    
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    
    res.status(200).json({ mentor });
  } catch (error) {
    console.error("Error fetching mentor:", error);
    res.status(500).json({ error: "Failed to fetch mentor details" });
  }
});

// Get user dashboard data
router.get("/:id/dashboard", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    // Ensure users can only fetch their own dashboard data
    if (req.user?.userId !== parseInt(id as string)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id as string) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        posts: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        },
        bookingsAsStudent: {
          take: 5,
          orderBy: { date: 'asc' },
          include: { mentor: { select: { name: true } } }
        },
        bookingsAsMentor: {
          take: 5,
          orderBy: { date: 'asc' },
          include: { student: { select: { name: true } } }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;
