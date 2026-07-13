import { Request, Response } from 'express';
import prisma from '../db';

export const getScholarships = async (req: Request, res: Response) => {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ scholarships });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createScholarship = async (req: Request, res: Response) => {
  try {
    const { title, description, amount, deadline, organization, url } = req.body;
    const newScholarship = await prisma.scholarship.create({
      data: { title, description, amount, deadline: deadline ? new Date(deadline) : null, organization, url }
    });
    res.status(201).json({ scholarship: newScholarship });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteScholarship = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.scholarship.delete({
      where: { id: parseInt(id as string) }
    });
    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
