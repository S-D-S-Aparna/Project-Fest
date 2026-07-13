"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const savedController_1 = require("../controllers/savedController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateToken, savedController_1.getSavedItems);
router.post('/', authMiddleware_1.authenticateToken, savedController_1.saveItem);
router.delete('/:itemType/:itemId', authMiddleware_1.authenticateToken, savedController_1.unsaveItem);
exports.default = router;
//# sourceMappingURL=saved.js.map