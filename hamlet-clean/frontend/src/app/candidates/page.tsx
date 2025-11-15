'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TopNavBar from '@/components/TopNavBar';
import { api } from '@/lib/api';
import { Candidate } from '@/types';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response: any = await api.getCandidates(page, 50);

        if (response.success) {
          setCandidates(response.candidates || []);
          setTotal(response.total || 0);
        } else {
          setError(response.error || 'Failed to fetch candidates');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavBar />
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading candidates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavBar />
        <div className="flex items-center justify-center py-24">
          <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600">
            Browse all {total.toLocaleString()} candidates for the Iraqi Provincial Council Elections 2025
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <Link
              key={candidate.id}
              href={`/candidates/${candidate.id}`}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="mb-4">
                <h3 className="mb-1 text-xl font-bold text-gray-900">{candidate.name}</h3>
                {candidate.nameOriginal && (
                  <p className="font-arabic text-lg text-gray-600" dir="rtl">
                    {candidate.nameOriginal}
                  </p>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="w-24 font-semibold text-gray-700">Governorate:</span>
                  <span className="text-gray-600">{candidate.governorate}</span>
                </div>

                {candidate.listNumber && (
                  <div className="flex items-center">
                    <span className="w-24 font-semibold text-gray-700">List:</span>
                    <span className="text-gray-600">#{candidate.listNumber}</span>
                  </div>
                )}

                {candidate.alliance && (
                  <div className="flex items-center">
                    <span className="w-24 font-semibold text-gray-700">Alliance:</span>
                    <span className="text-gray-600">{candidate.alliance}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <span className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {candidates.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600">No candidates found.</p>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={page === 1}
            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="rounded bg-gray-100 px-6 py-2">Page {page}</span>
          <button
            onClick={() => setPage((value) => value + 1)}
            disabled={candidates.length < 50}
            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
