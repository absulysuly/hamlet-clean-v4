'use client';

import { useCandidates } from '@/hooks/useCandidates';
import CandidateCard from './CandidateCard';

export default function CandidateList() {
  const { candidates, loading, error } = useCandidates();

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner" />
        <p>Loading candidate intelligence…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>Unable to load candidates</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!candidates || candidates.length === 0) {
    return (
      <div className="error" style={{ background: 'rgba(124, 58, 237, 0.25)', borderLeftColor: '#7c3aed' }}>
        <h3>No candidates found</h3>
        <p>Please adjust filters or try again later.</p>
      </div>
    );
  }

  return (
    <div className="candidates-grid">
      {candidates.map((c) => (
        <CandidateCard key={c.id} candidate={c} />
      ))}
    </div>
  );
}
