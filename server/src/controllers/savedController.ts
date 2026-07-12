import { Request, Response } from 'express';
import prisma from '../db';

export const getSavedItems = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const savedItems = await prisma.savedItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ savedItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const saveItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { itemType, itemId } = req.body;
    
    // Check if already saved
    const existing = await prisma.savedItem.findUnique({
      where: {
        userId_itemType_itemId: {
          userId,
          itemType,
          itemId
        }
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Item already saved' });
    }

    const savedItem = await prisma.savedItem.create({
      data: { userId, itemType, itemId }
    });
    res.status(201).json({ savedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const unsaveItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { itemType, itemId } = req.params;
    
    await prisma.savedItem.delete({
      where: {
        userId_itemType_itemId: {
          userId,
          itemType,
          itemId: parseInt(itemId)
        }
      }
    });
    res.json({ message: 'Item removed from saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
