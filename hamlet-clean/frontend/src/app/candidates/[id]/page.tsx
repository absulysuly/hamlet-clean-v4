'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Candidate } from '@/types';
import Link from 'next/link';

export default function CandidateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        const id = parseInt(params.id as string);

        if (isNaN(id)) {
          setError('Invalid candidate ID');
          return;
        }

        const response: any = await api.getCandidateById(id);

        if (response.success && response.candidate) {
          setCandidate(response.candidate);
        } else {
          setError(response.error || 'Candidate not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch candidate');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCandidate();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading candidate...</p>
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error || 'Candidate not found'}</p>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => router.push('/candidates')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Back to List
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/candidates"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to Candidates
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12">
            <h1 className="text-4xl font-bold text-white mb-3">
              {candidate.name}
            </h1>
            {candidate.nameOriginal && (
              <p className="text-2xl text-blue-100 font-arabic" dir="rtl">
                {candidate.nameOriginal}
              </p>
            )}
          </div>

          <div className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Candidate Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase">
                      Governorate
                    </label>
                    <p className="text-lg text-gray-900 mt-1">
                      {candidate.governorate}
                    </p>
                  </div>

                  {candidate.listNumber && (
                    <div>
                      <label className="text-sm font-semibold text-gray-500 uppercase">
                        List Number
                      </label>
                      <p className="text-lg text-gray-900 mt-1">
                        #{candidate.listNumber}
                      </p>
                    </div>
                  )}

                  {candidate.alliance && (
                    <div>
                      <label className="text-sm font-semibold text-gray-500 uppercase">
                        Alliance/Party
                      </label>
                      <p className="text-lg text-gray-900 mt-1">
                        {candidate.alliance}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold text-gray-500 uppercase">
                      Votes
                    </label>
                    <p className="text-lg text-gray-900 mt-1">
                      {candidate.votes.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                {candidate.biography ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Biography
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {candidate.biography}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-500 text-center">
                      Biography information not available
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/candidates?governorate=${encodeURIComponent(candidate.governorate)}`}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  View Other Candidates from {candidate.governorate}
                </Link>

                {candidate.alliance && (
                  <Link
                    href={`/candidates?alliance=${encodeURIComponent(candidate.alliance)}`}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
                  >
                    View {candidate.alliance} Candidates
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Candidate ID</h3>
          <p className="text-gray-600 font-mono">#{candidate.id}</p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date(candidate.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
