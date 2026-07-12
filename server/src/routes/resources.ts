import { Router } from 'express';
import { getResources, createResource, deleteResource } from '../controllers/resourceController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getResources);
router.post('/', authenticateToken, createResource);
router.delete('/:id', authenticateToken, deleteResource);

export default router;
