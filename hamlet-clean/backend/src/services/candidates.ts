import { prisma } from '../config/database';

export const getAllCandidates = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  
  const [candidates, total] = await Promise.all([
    prisma.candidate.findMany({
      skip: offset,
      take: limit,
      orderBy: { id: 'asc' }
    }),
    prisma.candidate.count()
  ]);
  
  return {
    candidates,
    count: candidates.length,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
};

export const getCandidateById = async (id: number) => {
  return await prisma.candidate.findUnique({
    where: { id }
  });
};

export const getCandidatesByGovernorate = async (governorate: string) => {
  return await prisma.candidate.findMany({
    where: {
      governorate: {
        equals: governorate,
        mode: 'insensitive'
      }
    },
    orderBy: { id: 'asc' }
  });
};

export const searchCandidates = async (query: string, governorate?: string, alliance?: string) => {
  const where: any = {};
  
  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { biography: { contains: query, mode: 'insensitive' } }
    ];
  }
  
  if (governorate) {
    where.governorate = { equals: governorate, mode: 'insensitive' };
  }
  
  if (alliance) {
    where.alliance = { equals: alliance, mode: 'insensitive' };
  }
  
  return await prisma.candidate.findMany({
    where,
    take: 100,
    orderBy: { id: 'asc' }
  });
};
