"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicket = void 0;
const db_1 = __importDefault(require("../db"));
const createTicket = async (req, res) => {
    try {
        const userId = req.user.id;
        const { subject, message } = req.body;
        const ticket = await db_1.default.supportTicket.create({
            data: { userId, subject, message }
        });
        res.status(201).json({ ticket });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createTicket = createTicket;
//# sourceMappingURL=supportController.js.map