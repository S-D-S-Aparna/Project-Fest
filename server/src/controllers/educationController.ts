import { Request, Response } from 'express';
import prisma from '../db';

export const getEducationCourses = async (req: Request, res: Response) => {
  try {
    const { level } = req.query;
    const filter = level ? { educationLevel: String(level) } : {};
    
    const courses = await prisma.educationCourse.findMany({
      where: filter,
      orderBy: { id: 'asc' }
    });
    res.json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
