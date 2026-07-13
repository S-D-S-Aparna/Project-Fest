import { Router } from 'express';
import { getSavedItems, saveItem, unsaveItem } from '../controllers/savedController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getSavedItems);
router.post('/', authenticateToken, saveItem);
router.delete('/:itemType/:itemId', authenticateToken, unsaveItem);

export default router;
