import { PrismaClient } from '@prisma/client';
import { ArabicCSVImporter } from '../src/utils/arabicCSV';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding with Arabic support...');

  try {
    const records = await ArabicCSVImporter.importFromGitHub();
    const candidates = ArabicCSVImporter.normalizeRecords(records);

    if (candidates.length === 0) {
      console.warn('⚠️  No candidates parsed from CSV. Seeding skipped.');
      return;
    }

    console.log(`📥 Preparing to seed ${candidates.length} candidates...`);

    await prisma.$transaction(async (tx) => {
      await tx.candidate.deleteMany();
      await tx.candidate.createMany({
        data: candidates,
      });
    });

    console.log('✅ Database seeded successfully with Arabic candidates!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
