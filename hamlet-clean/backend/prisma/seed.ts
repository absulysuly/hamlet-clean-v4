import { PrismaClient } from '@prisma/client';
import https from 'https';

const prisma = new PrismaClient();

interface CandidateCSVRow {
  ElectionNumber: string;
  Name_English: string;
  Name_Original: string;
  City: string;
}

async function fetchCSVData(): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = 'https://raw.githubusercontent.com/absulysuly/hamlet-unified-complete-2027/main/data/master_candidates_bilingual_2025-10-14_23-19-46.csv';
    
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));
      response.on('error', reject);
    });
  });
}

function parseCSV(csvData: string): CandidateCSVRow[] {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const rows: CandidateCSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
    if (!values || values.length < 4) continue;

    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index]?.replace(/^"|"$/g, '').trim() || '';
    });

    if (row.ElectionNumber && row.Name_English) {
      rows.push(row as CandidateCSVRow);
    }
  }

  return rows;
}

async function main() {
  console.log('🌙 Starting candidate import...');
  
  try {
    const csvData = await fetchCSVData();
    console.log('✅ CSV data fetched');

    const candidates = parseCSV(csvData);
    console.log(`✅ Parsed ${candidates.length} candidates`);

    await prisma.candidate.deleteMany({});
    console.log('✅ Database cleared');

    let imported = 0;
    for (const candidate of candidates) {
      try {
        await prisma.candidate.create({
          data: {
            name: candidate.Name_English || candidate.Name_Original,
            governorate: candidate.City || 'Unknown',
            listNumber: parseInt(candidate.ElectionNumber) || null,
            biography: `Original: ${candidate.Name_Original}`,
            votes: 0,
          },
        });
        imported++;
        if (imported % 500 === 0) console.log(`  ⏳ ${imported} imported...`);
      } catch (error) {
        console.error(`Failed: ${candidate.ElectionNumber}`);
      }
    }

    console.log(`\n🎉 Imported ${imported} candidates!`);
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
