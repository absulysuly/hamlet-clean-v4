import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import https from 'https';

const prisma = new PrismaClient();

const CSV_URL = 'https://raw.githubusercontent.com/absulysuly/hamlet-unified-complete-2027/main/data/master_candidates_bilingual_2025-10-14_23-19-46.csv';

async function fetchCSV(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

function parseCSV(csvContent: string): any[] {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.replace(/"/g, '').trim());
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  });
}

export const importCandidates = async (req: Request, res: Response) => {
  try {
    res.write('🌙 Starting candidate import...\n\n');
    
    // Fetch CSV
    res.write('📥 Fetching CSV data from GitHub...\n');
    const csvContent = await fetchCSV(CSV_URL);
    res.write('✅ CSV data fetched\n\n');
    
    // Parse CSV
    const records = parseCSV(csvContent);
    res.write(`✅ Parsed ${records.length} candidates\n\n`);
    
    // Clear database
    res.write('🗑️ Clearing existing candidates...\n');
    await prisma.candidate.deleteMany({});
    res.write('✅ Database cleared\n\n');
    
    // Import
    res.write('📊 Importing candidates...\n');
    let count = 0;
    
    for (const row of records) {
      await prisma.candidate.create({
        data: {
          name: row.Name_English || row.Name_Original || 'Unknown',
          nameOriginal: row.Name_Original,
          governorate: row.City || 'Unknown',
          listNumber: parseInt(row.ElectionNumber) || null,
          votes: 0,
        },
      });
      
      count++;
      if (count % 500 === 0) {
        res.write(`  ⏳ ${count} imported...\n`);
      }
    }
    
    res.write(`\n🎉 Successfully imported ${count} candidates!\n\n`);
    
    // Show samples
    const sample = await prisma.candidate.findMany({ take: 3 });
    res.write('📋 Sample candidates:\n');
    sample.forEach(c => res.write(`  - ${c.name} (${c.nameOriginal}) - ${c.governorate}\n`));
    
    res.end('\n✅ IMPORT COMPLETE! Your database is ready!');
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Import failed' 
    });
  }
};
