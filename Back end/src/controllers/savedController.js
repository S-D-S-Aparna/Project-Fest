"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsaveItem = exports.saveItem = exports.getSavedItems = void 0;
const db_1 = __importDefault(require("../db"));
const getSavedItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const savedItems = await db_1.default.savedItem.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ savedItems });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getSavedItems = getSavedItems;
const saveItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemType, itemId } = req.body;
        // Check if already saved
        const existing = await db_1.default.savedItem.findUnique({
            where: {
                userId_itemType_itemId: {
                    userId,
                    itemType,
                    itemId
                }
            }
        });
        if (existing) {
            return res.status(400).json({ message: 'Item already saved' });
        }
        const savedItem = await db_1.default.savedItem.create({
            data: { userId, itemType, itemId }
        });
        res.status(201).json({ savedItem });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.saveItem = saveItem;
const unsaveItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemType, itemId } = req.params;
        await db_1.default.savedItem.delete({
            where: {
                userId_itemType_itemId: {
                    userId,
                    itemType: itemType,
                    itemId: parseInt(itemId)
                }
            }
        });
        res.json({ message: 'Item removed from saved' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.unsaveItem = unsaveItem;
//# sourceMappingURL=savedController.js.map