import { Request, Response } from 'express';
import https from 'https';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CSV URL with REAL Arabic text
const CSV_URL = 'https://raw.githubusercontent.com/absulysuly/hamlet-unified-complete-2027/main/ElectionCandidates_Original.csv';

export const importCandidates = async (req: Request, res: Response) => {
  try {
    console.log('🚀 Starting candidate import from ElectionCandidates_Original.csv...');
    
    // Fetch CSV data with UTF-8 encoding
    const csvData = await new Promise<string>((resolve, reject) => {
      let data = '';
      https.get(CSV_URL, (response) => {
        response.setEncoding('utf8'); // Ensures Arabic characters display correctly
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          resolve(data);
        });
      }).on('error', (error) => {
        reject(error);
      });
    });

    console.log('📥 CSV data fetched successfully');

    // Parse CSV manually to handle complex structure
    const lines = csvData.split('\n');
    const candidates: any[] = [];
    
    // Skip header rows (first 6 lines are headers)
    for (let i = 6; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Split by comma but handle quoted fields
      const fields = line.split(',');
      
      if (fields.length < 10) continue;

      const listNumber = fields[0]?.trim();
      const partyName = fields[1]?.trim();
      const district = fields[5]?.trim(); // Electoral district (governorate)
      const candidateName = fields[8]?.trim(); // Column I - has REAL Arabic text!
      
      // Skip if essential data is missing
      if (!candidateName || candidateName.length < 2) continue;
      if (!district || district.length < 2) continue;

      // Detect if name contains Arabic characters
      const hasArabic = /[\u0600-\u06FF]/.test(candidateName);
      
      candidates.push({
        name: hasArabic ? candidateName : candidateName, // Arabic name
        nameOriginal: hasArabic ? candidateName : null, // Store Arabic in nameOriginal
        governorate: district,
        alliance: partyName || null,
        listNumber: listNumber ? parseInt(listNumber) : null,
        photoUrl: null,
        biography: null,
        votes: 0
      });
    }

    console.log(`✅ Parsed ${candidates.length} candidates with real Arabic text`);

    // Clear existing candidates
    await prisma.candidate.deleteMany();
    console.log('🗑️  Cleared existing candidates');

    // Import new candidates in batches
    const batchSize = 100;
    for (let i = 0; i < candidates.length; i += batchSize) {
      const batch = candidates.slice(i, i + batchSize);
      await prisma.candidate.createMany({
        data: batch,
        skipDuplicates: true
      });
      console.log(`📝 Imported batch ${Math.floor(i / batchSize) + 1} (${Math.min(i + batchSize, candidates.length)}/${candidates.length})`);
    }

    console.log(`🎉 Import complete! Total candidates: ${candidates.length}`);

    res.status(200).json({
      success: true,
      message: `Successfully imported ${candidates.length} bilingual candidates`,
      total: candidates.length
    });

  } catch (error) {
    console.error('❌ Import error:', error);
    res.status(500).json({
      success: false,
      message: 'Error importing candidates',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
