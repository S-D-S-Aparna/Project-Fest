import { Request, Response } from 'express';
import prisma from '../db';

export const getResources = async (req: Request, res: Response) => {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ resources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createResource = async (req: Request, res: Response) => {
  try {
    const { title, description, category, url } = req.body;
    const newResource = await prisma.resource.create({
      data: { title, description, category, url }
    });
    res.status(201).json({ resource: newResource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.resource.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
