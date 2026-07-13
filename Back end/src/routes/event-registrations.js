"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Register for an event / co-curricular activity
router.post("/", authMiddleware_1.authenticateToken, async (req, res) => {
    try {
        const { eventName, activity, date } = req.body;
        if (!req.user)
            return res.status(401).json({ error: "Unauthorized" });
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
    }
    catch (error) {
        console.error("Error creating event registration:", error);
        res.status(500).json({ error: "Failed to register for event" });
    }
});
// Get user's registrations
router.get("/", authMiddleware_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).json({ error: "Unauthorized" });
        const registrations = await prisma.eventRegistration.findMany({
            where: {
                userId: req.user.userId
            },
            orderBy: { date: "asc" }
        });
        res.status(200).json({ registrations });
    }
    catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).json({ error: "Failed to fetch registrations" });
    }
});
exports.default = router;
//# sourceMappingURL=event-registrations.js.map