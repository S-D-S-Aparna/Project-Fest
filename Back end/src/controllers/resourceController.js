"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.createResource = exports.getResources = void 0;
const db_1 = __importDefault(require("../db"));
const getResources = async (req, res) => {
    try {
        const resources = await db_1.default.resource.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ resources });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getResources = getResources;
const createResource = async (req, res) => {
    try {
        const { title, description, category, url } = req.body;
        const newResource = await db_1.default.resource.create({
            data: { title, description, category, url }
        });
        res.status(201).json({ resource: newResource });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createResource = createResource;
const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.default.resource.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Resource deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteResource = deleteResource;
//# sourceMappingURL=resourceController.js.map