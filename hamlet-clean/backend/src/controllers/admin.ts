import fs from 'fs';
import csvParser from 'csv-parser';
import { Response } from 'express';

const CSV_URL = 'https://raw.githubusercontent.com/absulysuly/hamlet-unified-complete-2027/main/data/master_candidates_bilingual_2025-10-14_23-19-46.csv';

export const importCandidates = (res: Response) => {
    const candidates: { englishName: string; arabicName: string; }[] = [];

    fs.createReadStream(CSV_URL)
        .pipe(csvParser({
            separator: ',',
            quote: '"', 
            headers: ['englishName', 'arabicName'],
            skipEmptyLines: true
        }))
        .on('data', (data) => {
            candidates.push(data);
        })
        .on('end', () => {
            // Functionality to save candidates to your database can be added here.
            res.status(200).json({ message: 'Candidates imported successfully', candidates });
        })
        .on('error', (error) => {
            res.status(500).json({ message: 'Error importing candidates', error });
        });
};