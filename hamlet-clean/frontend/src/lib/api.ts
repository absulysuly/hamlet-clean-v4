const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Health
  async getHealth() {
    return this.fetch('/health');
  }

  // Candidates
  async getCandidates(page = 1, limit = 100) {
    return this.fetch(`/candidates?page=${page}&limit=${limit}`);
  }

  async getCandidateById(id: number) {
    return this.fetch(`/candidates/${id}`);
  }

  async getCandidatesByGovernorate(governorate: string) {
    return this.fetch(`/candidates/governorate/${governorate}`);
  }

  async searchCandidates(query: string, governorate?: string, alliance?: string) {
    const params = new URLSearchParams({ q: query });
    if (governorate) params.append('governorate', governorate);
    if (alliance) params.append('alliance', alliance);
    return this.fetch(`/candidates/search?${params.toString()}`);
  }

  // Governorates
  async getGovernorates() {
    return this.fetch('/governorates');
  }

  // Users
  async getUsers() {
    return this.fetch('/users');
  }

  // Events
  async getEvents() {
    return this.fetch('/events');
  }
}

export const api = new ApiClient(API_BASE);
