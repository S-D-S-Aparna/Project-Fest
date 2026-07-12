import { Request, Response } from 'express';
import prisma from '../db';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    });
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, type, url } = req.body;
    const newEvent = await prisma.event.create({
      data: { title, description, date: new Date(date), location, type, url }
    });
    res.status(201).json({ event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
