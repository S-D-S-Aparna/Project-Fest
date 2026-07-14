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

    const parsedCourses = courses.map(course => {
      let parsedCareers: string[] = [];
      if (typeof course.careers === 'string') {
        try {
          parsedCareers = JSON.parse(course.careers);
        } catch (e) {
          parsedCareers = course.careers.split(',').map(s => s.trim());
        }
      }
      return { ...course, careers: parsedCareers };
    });

    res.json({ courses: parsedCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
