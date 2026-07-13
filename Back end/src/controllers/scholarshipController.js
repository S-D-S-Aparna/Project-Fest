"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScholarship = exports.createScholarship = exports.getScholarships = void 0;
const db_1 = __importDefault(require("../db"));
const getScholarships = async (req, res) => {
    try {
        const scholarships = await db_1.default.scholarship.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ scholarships });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getScholarships = getScholarships;
const createScholarship = async (req, res) => {
    try {
        const { title, description, amount, deadline, organization, url } = req.body;
        const newScholarship = await db_1.default.scholarship.create({
            data: { title, description, amount, deadline: deadline ? new Date(deadline) : null, organization, url }
        });
        res.status(201).json({ scholarship: newScholarship });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createScholarship = createScholarship;
const deleteScholarship = async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.default.scholarship.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Scholarship deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteScholarship = deleteScholarship;
//# sourceMappingURL=scholarshipController.js.map