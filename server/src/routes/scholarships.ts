import { Router } from 'express';
import { getScholarships, createScholarship, deleteScholarship } from '../controllers/scholarshipController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getScholarships);
router.post('/', authenticateToken, createScholarship);
router.delete('/:id', authenticateToken, deleteScholarship);

export default router;
