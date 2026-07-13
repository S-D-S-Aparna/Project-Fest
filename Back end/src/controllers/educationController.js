"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEducationCourses = void 0;
const db_1 = __importDefault(require("../db"));
const getEducationCourses = async (req, res) => {
    try {
        const { level } = req.query;
        const filter = level ? { educationLevel: String(level) } : {};
        const courses = await db_1.default.educationCourse.findMany({
            where: filter,
            orderBy: { id: 'asc' }
        });
        res.json({ courses });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getEducationCourses = getEducationCourses;
//# sourceMappingURL=educationController.js.map