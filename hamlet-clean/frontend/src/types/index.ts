export interface Candidate {
  id: number;
  name: string;
  governorate: string;
  alliance: string | null;
  biography: string | null;
  listNumber: number | null;
  photoUrl: string | null;
  votes: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  governorate: string | null;
  createdAt: string;
}

export interface Event {
  id: number;
  title: string;
  description: string | null;
  governorate: string | null;
  eventDate: string;
  status: string;
  createdAt: string;
}

export interface Governorate {
  id: number;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  candidateCount: number;
  population: number | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
