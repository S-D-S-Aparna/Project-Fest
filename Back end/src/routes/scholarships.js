"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scholarshipController_1 = require("../controllers/scholarshipController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', scholarshipController_1.getScholarships);
router.post('/', authMiddleware_1.authenticateToken, scholarshipController_1.createScholarship);
router.delete('/:id', authMiddleware_1.authenticateToken, scholarshipController_1.deleteScholarship);
exports.default = router;
//# sourceMappingURL=scholarships.js.map