import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const getAllGovernorates = async (req: Request, res: Response): Promise<void> => {
  try {
    const governorates = await prisma.governorate.findMany({
      orderBy: { nameEn: 'asc' }
    });
    
    res.status(200).json({
      success: true,
      count: governorates.length,
      governorates
    });
  } catch (error) {
    console.error('Get governorates error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch governorates',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
