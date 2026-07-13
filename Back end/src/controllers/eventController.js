"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.createEvent = exports.getEvents = void 0;
const db_1 = __importDefault(require("../db"));
const getEvents = async (req, res) => {
    try {
        const events = await db_1.default.event.findMany({
            orderBy: { date: 'asc' }
        });
        res.json({ events });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getEvents = getEvents;
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, type, url } = req.body;
        const newEvent = await db_1.default.event.create({
            data: { title, description, date: new Date(date), location, type, url }
        });
        res.status(201).json({ event: newEvent });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createEvent = createEvent;
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.default.event.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=eventController.js.map