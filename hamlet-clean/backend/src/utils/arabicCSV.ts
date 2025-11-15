import type { Prisma } from '@prisma/client';
import fetch from 'node-fetch';
import iconv from 'iconv-lite';
import { parse } from 'csv-parse/sync';

export type RawCandidateRecord = Record<string, string | null | undefined> | string[];

const CSV_URL =
  'https://raw.githubusercontent.com/absulysuly/hamlet-unified-complete-2027/main/ElectionCandidates_Original.csv';

const normalizeKey = (key: string) => key.toLowerCase().replace(/[^a-z0-9]/g, '');

const sanitizeString = (value: string | null | undefined) => {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const candidateKeyMatches = (candidateKeys: string[], key: string) => {
  const normalizedKey = normalizeKey(key);
  return candidateKeys.some((candidateKey) =>
    normalizedKey.includes(normalizeKey(candidateKey)),
  );
};

const possibleGovernorateKeys = [
  'governorate',
  'governate',
  'district',
  'province',
  'muhafaza',
  'electoral district',
  'governorate en',
];

const possibleAllianceKeys = [
  'alliance',
  'party',
  'coalition',
  'entity',
  'list name',
  'list',
];

const possibleListNumberKeys = ['list number', 'list_no', 'list id', 'list'];

const possibleEnglishNameKeys = [
  'name_en',
  'english name',
  'candidate name',
  'candidate english',
  'name',
  'full name',
];

const possibleArabicNameKeys = [
  'name_ar',
  'arabic name',
  'candidate arabic',
  'name original',
  'name arabic',
  'name_arabic',
];

const extractFirstMatchingValue = (
  record: Record<string, string | null | undefined>,
  keys: string[],
) => {
  for (const [key, rawValue] of Object.entries(record)) {
    if (candidateKeyMatches(keys, key)) {
      const sanitized = sanitizeString(rawValue);
      if (sanitized) {
        return sanitized;
      }
    }
  }
  return null;
};

const findValueByPredicate = (
  record: Record<string, string | null | undefined>,
  predicate: (value: string, key: string) => boolean,
) => {
  for (const [key, rawValue] of Object.entries(record)) {
    const sanitized = sanitizeString(rawValue);
    if (sanitized && predicate(sanitized, key)) {
      return sanitized;
    }
  }
  return null;
};

const toRecordObject = (row: RawCandidateRecord): Record<string, string | null | undefined> => {
  if (Array.isArray(row)) {
    return {
      listNumber: row[0],
      alliance: row[1],
      subAlliance: row[2],
      gender: row[3],
      sequenceNumber: row[4],
      governorate: row[5],
      district: row[6],
      subDistrict: row[7],
      candidateName: row[8],
      notes: row[9],
    };
  }

  return row;
};

export type NormalizedCandidate = Prisma.CandidateCreateManyInput;

export class ArabicCSVImporter {
  static containsArabic(text: string) {
    return /[\u0600-\u06FF]/.test(text);
  }

  static async importFromGitHub(): Promise<Record<string, string | null | undefined>[]> {
    try {
      console.log('🔄 Starting Arabic-aware CSV import...');

      const response = await fetch(CSV_URL, {
        headers: {
          'User-Agent': 'Hamlet-Unified-Service/1.0 (+https://github.com/absulysuly/hamlet-clean-v4)',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const encodings = ['win1256', 'cp1256', 'iso-8859-6', 'utf8', 'utf16le'];
      let csvText: string | null = null;
      let usedEncoding = 'utf8';

      for (const encoding of encodings) {
        try {
          const decoded = iconv.decode(buffer, encoding);
          if (!csvText) {
            csvText = decoded;
            usedEncoding = encoding;
          }

          if (this.containsArabic(decoded)) {
            csvText = decoded;
            usedEncoding = encoding;
            console.log(`✅ Arabic text detected with encoding: ${encoding}`);
            break;
          }
        } catch (error) {
          console.warn(`⚠️  Encoding ${encoding} failed, trying next...`);
        }
      }

      if (!csvText) {
        csvText = iconv.decode(buffer, 'utf8');
      }

      if (this.containsArabic(csvText)) {
        console.log(`📗 Using encoding ${usedEncoding} with detected Arabic characters.`);
      } else {
        console.warn('⚠️  No Arabic characters detected after decoding. Proceeding with parsed data.');
      }

      try {
        const records = parse(csvText, {
          columns: true,
          skip_empty_lines: true,
          trim: true,
          relax_quotes: true,
          escape: '\\',
          from_line: 1,
        }) as Record<string, string | null | undefined>[];

        if (records.length > 0) {
          console.log(`📊 Successfully loaded ${records.length} candidate records`);
          return records;
        }

        console.warn('⚠️  Parsed zero records using column-based parsing. Falling back to row parsing.');
      } catch (error) {
        console.warn('⚠️  Column parsing failed, retrying with row-based parsing.', error);
      }

      const fallbackRows = parse(csvText, {
        columns: false,
        skip_empty_lines: true,
        trim: true,
        relax_quotes: true,
        escape: '\\',
        from_line: 7,
      }) as string[][];

      console.log(`📊 Fallback parser loaded ${fallbackRows.length} rows`);

      return fallbackRows.map(toRecordObject);
    } catch (error) {
      console.error('❌ Arabic CSV import failed:', error);
      throw error;
    }
  }

  static normalizeRecords(records: Array<Record<string, string | null | undefined>>): NormalizedCandidate[] {
    const normalizedMap = new Map<string, NormalizedCandidate>();

    records.forEach((rawRecord, index) => {
      const record = toRecordObject(rawRecord);

      const englishName =
        extractFirstMatchingValue(record, possibleEnglishNameKeys) ||
        findValueByPredicate(record, (value) => /[a-z]/i.test(value) && !this.containsArabic(value));

      const arabicName =
        extractFirstMatchingValue(record, possibleArabicNameKeys) ||
        findValueByPredicate(record, (value) => this.containsArabic(value));

      const governorate =
        extractFirstMatchingValue(record, possibleGovernorateKeys) ||
        findValueByPredicate(record, (value, key) =>
          candidateKeyMatches(possibleGovernorateKeys, key) || /governorate|district|province/i.test(key),
        );

      if (!englishName && !arabicName) {
        return;
      }

      if (!governorate) {
        return;
      }

      const alliance = extractFirstMatchingValue(record, possibleAllianceKeys);
      const listNumberRaw =
        extractFirstMatchingValue(record, possibleListNumberKeys) ||
        findValueByPredicate(record, (value, key) => /list/.test(normalizeKey(key)) && /\d/.test(value));

      const listNumber = listNumberRaw ? parseInt(listNumberRaw.replace(/[^0-9]/g, ''), 10) : null;

      const candidate: NormalizedCandidate = {
        name: englishName || arabicName || `Candidate ${index + 1}`,
        nameOriginal: arabicName && this.containsArabic(arabicName) ? arabicName : null,
        governorate,
        alliance: alliance || null,
        biography: null,
        listNumber: Number.isNaN(listNumber) ? null : listNumber,
        photoUrl: null,
        votes: 0,
      };

      const uniqueKey = `${candidate.name}|${candidate.governorate}`.toLowerCase();

      if (!normalizedMap.has(uniqueKey)) {
        normalizedMap.set(uniqueKey, candidate);
      }
    });

    const normalizedCandidates = Array.from(normalizedMap.values());
    console.log(`📥 Normalized ${normalizedCandidates.length} unique candidates`);
    return normalizedCandidates;
  }
}
