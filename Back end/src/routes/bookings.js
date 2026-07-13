"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Book a session
router.post("/", authMiddleware_1.authenticateToken, async (req, res) => {
    try {
        const { mentorId, date, stream, notes } = req.body;
        if (!req.user)
            return res.status(401).json({ error: "Unauthorized" });
        // Validate mentor exists and has role 'mentor'
        const mentor = await prisma.user.findUnique({ where: { id: mentorId } });
        if (!mentor || mentor.role !== "mentor") {
            return res.status(400).json({ error: "Invalid mentor" });
        }
        const meetingLink = `https://meet.google.com/mock-${Math.random().toString(36).substring(7)}`;
        const booking = await prisma.booking.create({
            data: {
                mentorId,
                studentId: req.user.userId,
                date: new Date(date),
                stream,
                notes,
                meetingLink
            },
            include: {
                mentor: { select: { name: true } },
                student: { select: { name: true } }
            }
        });
        res.status(201).json({ booking });
    }
    catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Failed to book session" });
    }
});
// Get user's bookings (handled in dashboard route, but here for completeness if needed)
router.get("/", authMiddleware_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ error: "Unauthorized" });
        const bookings = await prisma.booking.findMany({
            where: {
                OR: [
                    { studentId: req.user.userId },
                    { mentorId: req.user.userId }
                ]
            },
            include: {
                mentor: { select: { name: true, email: true } },
                student: { select: { name: true, email: true } }
            },
            orderBy: { date: "asc" }
        });
        res.status(200).json({ bookings });
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
});
exports.default = router;
//# sourceMappingURL=bookings.js.map