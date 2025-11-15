import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
    const candidates = [];
    
    // Read CSV file
    fs.createReadStream('ElectionCandidates_Original.csv')
        .pipe(csv({ encoding: 'utf-8' }))
        .on('data', (row) => {
            // Assuming the CSV has columns name_ar, name_en, and other relevant fields
            candidates.push({
                nameAr: row.name_ar,
                nameEn: row.name_en,
                // Map other fields accordingly
            });
        })
        .on('end', async () => {
            // Save to database
            await prisma.candidate.createMany({ data: candidates });
            console.log('Candidates imported successfully.');
        });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });