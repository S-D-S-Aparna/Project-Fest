import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { name: true, role: true } },
        comments: {
          include: { author: { select: { name: true } } }
        }
      }
    });
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create a post
router.post("/posts", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { title, content, category } = req.body;
    
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const post = await prisma.post.create({
      data: {
        title,
        content,
        category,
        authorId: req.user.userId
      },
      include: { author: { select: { name: true, role: true } } }
    });

    res.status(201).json({ post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Comment on a post
router.post("/posts/:id/comments", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(id),
        authorId: req.user.userId
      },
      include: { author: { select: { name: true } } }
    });

    res.status(201).json({ comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

export default router;
