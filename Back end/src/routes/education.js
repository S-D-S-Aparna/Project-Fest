"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const educationController_1 = require("../controllers/educationController");
const router = (0, express_1.Router)();
router.get('/', educationController_1.getEducationCourses);
exports.default = router;
//# sourceMappingURL=education.js.map