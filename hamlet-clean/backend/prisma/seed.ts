import { PrismaClient } from '@prisma/client';
import https from 'https';

const prisma = new PrismaClient();

// GitHub raw URL for the bilingual candidate CSV
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

async function main() {
  console.log('🌙 Starting candidate import from bilingual CSV...');
  
  try {
    // Fetch CSV data
    console.log('📥 Fetching CSV data from GitHub...');
    const csvContent = await fetchCSV(CSV_URL);
    console.log('✅ CSV data fetched');
    
    // Parse CSV
    const records = parseCSV(csvContent);
    console.log(`✅ Parsed ${records.length} candidates`);
    
    // Clear existing candidates
    console.log('🗑️ Clearing existing candidates...');
    await prisma.candidate.deleteMany({});
    console.log('✅ Database cleared');
    
    // Import candidates
    console.log('📊 Importing candidates...');
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
        console.log(`  ⏳ ${count} imported...`);
      }
    }
    
    console.log(`🎉 Successfully imported ${count} candidates!`);
    
    // Show sample
    const sample = await prisma.candidate.findMany({ take: 3 });
    console.log('\n📋 Sample candidates:');
    sample.forEach(c => console.log(`  - ${c.name} (${c.nameOriginal}) - ${c.governorate}`));
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });