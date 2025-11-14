// Shared types across backend and frontend

export interface Candidate {
  id: number;
  name: string;
  governorate: string;
  alliance: string | null;
  biography: string | null;
  listNumber: number | null;
  photoUrl: string | null;
  votes: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  governorate: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Event {
  id: number;
  title: string;
  description: string | null;
  governorate: string | null;
  eventDate: Date | string;
  reportedBy: number | null;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Governorate {
  id: number;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  candidateCount: number;
  population: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  total?: number;
  page?: number;
  totalPages?: number;
  error?: string;
  message?: string;
}
