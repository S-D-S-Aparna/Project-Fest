import { Router } from 'express';
import { getEducationCourses } from '../controllers/educationController';

const router = Router();

router.get('/', getEducationCourses);

export default router;
