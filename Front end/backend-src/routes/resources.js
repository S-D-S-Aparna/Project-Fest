"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resourceController_1 = require("../controllers/resourceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', resourceController_1.getResources);
router.post('/', authMiddleware_1.authenticateToken, resourceController_1.createResource);
router.delete('/:id', authMiddleware_1.authenticateToken, resourceController_1.deleteResource);
exports.default = router;
//# sourceMappingURL=resources.js.map