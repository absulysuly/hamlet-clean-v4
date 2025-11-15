import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ArabicCSVImporter } from '../utils/arabicCSV';

const prisma = new PrismaClient();

export const importCandidates = async (req: Request, res: Response) => {
  try {
    const records = await ArabicCSVImporter.importFromGitHub();
    const candidates = ArabicCSVImporter.normalizeRecords(records);

    if (candidates.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'No candidate records were parsed from the CSV source.',
      });
    }

    console.log(`🧹 Clearing existing candidates before import`);

    await prisma.$transaction(async (tx) => {
      await tx.candidate.deleteMany();
      await tx.candidate.createMany({
        data: candidates,
      });
    });

    console.log(`🎉 Import complete! Total candidates imported: ${candidates.length}`);

    res.status(200).json({
      success: true,
      message: `Successfully imported ${candidates.length} candidates`,
      total: candidates.length,
    });
  } catch (error) {
    console.error('❌ Import error:', error);
    res.status(500).json({
      success: false,
      message: 'Error importing candidates',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
