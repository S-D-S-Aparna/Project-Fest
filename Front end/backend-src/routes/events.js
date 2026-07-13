"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', eventController_1.getEvents);
router.post('/', authMiddleware_1.authenticateToken, eventController_1.createEvent);
router.delete('/:id', authMiddleware_1.authenticateToken, eventController_1.deleteEvent);
exports.default = router;
//# sourceMappingURL=events.js.map