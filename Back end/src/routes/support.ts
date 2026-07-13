import { Router } from 'express';
import { createTicket } from '../controllers/supportController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createTicket);

export default router;
