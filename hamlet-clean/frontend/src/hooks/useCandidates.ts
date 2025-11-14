'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Candidate } from '@/types';

export function useCandidates(page = 1, limit = 100) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: any = await api.getCandidates(page, limit);
        
        if (response.success) {
          setCandidates(response.candidates || []);
          setTotal(response.total || 0);
        } else {
          setError(response.error || 'Failed to fetch candidates');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [page, limit]);

  return { candidates, loading, error, total };
}
