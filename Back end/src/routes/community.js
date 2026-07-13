"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
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
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});
// Create a post
router.post("/posts", authMiddleware_1.authenticateToken, async (req, res) => {
    try {
        const { title, content, category } = req.body;
        if (!req.user)
            return res.status(401).json({ error: "Unauthorized" });
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
    }
    catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
});
// Comment on a post
router.post("/posts/:id/comments", authMiddleware_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        if (!req.user)
            return res.status(401).json({ error: "Unauthorized" });
        const comment = await prisma.comment.create({
            data: {
                content,
                postId: parseInt(id),
                authorId: req.user.userId
            },
            include: { author: { select: { name: true } } }
        });
        res.status(201).json({ comment });
    }
    catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
});
exports.default = router;
//# sourceMappingURL=community.js.map