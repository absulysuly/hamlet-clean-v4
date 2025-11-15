'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Candidate } from '@/types';
import Link from 'next/link';

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Candidates</h1>
          <p className="text-gray-600">
            Browse all {total.toLocaleString()} candidates for the Iraqi Provincial Council Elections 2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <Link
              key={candidate.id}
              href={`/candidates/${candidate.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {candidate.name}
                </h3>
                {candidate.nameOriginal && (
                  <p className="text-lg text-gray-600 font-arabic" dir="rtl">
                    {candidate.nameOriginal}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="font-semibold text-gray-700 w-24">Governorate:</span>
                  <span className="text-gray-600">{candidate.governorate}</span>
                </div>

                {candidate.listNumber && (
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-gray-700 w-24">List:</span>
                    <span className="text-gray-600">#{candidate.listNumber}</span>
                  </div>
                )}

                {candidate.alliance && (
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-gray-700 w-24">Alliance:</span>
                    <span className="text-gray-600">{candidate.alliance}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-blue-600 text-sm font-semibold hover:text-blue-800">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {candidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No candidates found.</p>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-6 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            Previous
          </button>
          <span className="px-6 py-2 bg-gray-100 rounded">
            Page {page}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={candidates.length < 50}
            className="px-6 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
