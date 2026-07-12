import { Request, Response } from 'express';
import prisma from '../db';

export const createTicket = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { subject, message } = req.body;
    
    const ticket = await prisma.supportTicket.create({
      data: { userId, subject, message }
    });
    res.status(201).json({ ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
