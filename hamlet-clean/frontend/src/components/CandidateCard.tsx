import { Candidate } from '@/types';

interface Props {
  candidate: Candidate;
}

export default function CandidateCard({ candidate }: Props) {
  const { name, nameOriginal, governorate, alliance, listNumber, votes, biography } = candidate;

  return (
    <article className="candidate-card">
      {nameOriginal && <h3 className="arabic-name">{nameOriginal}</h3>}
      <p className="english-name">{name}</p>
      <p className="governorate">{governorate}</p>

      <dl style={{ marginTop: '1.5rem', display: 'grid', rowGap: '0.75rem' }}>
        {alliance && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
            <dt style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Alliance</dt>
            <dd style={{ fontWeight: 600 }}>{alliance}</dd>
          </div>
        )}

        {typeof listNumber === 'number' && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
            <dt style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>List #</dt>
            <dd style={{ fontWeight: 600 }}>{listNumber}</dd>
          </div>
        )}

        {votes > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
            <dt style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Votes</dt>
            <dd style={{ fontWeight: 600 }}>{votes.toLocaleString()}</dd>
          </div>
        )}
      </dl>

      {biography && (
        <p style={{
          marginTop: '1.5rem',
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          maxHeight: '7.2rem',
          overflow: 'hidden',
        }}>
          {biography}
        </p>
      )}
    </article>
  );
}
