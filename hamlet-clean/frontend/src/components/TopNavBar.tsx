'use client';

import Link from 'next/link';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/candidates', label: 'Candidates' },
];

export default function TopNavBar() {
  return (
    <header className="header">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <p style={{
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
          }}>
            Hamlet Unified Platform
          </p>
          <h1>Iraq Election Dashboard</h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            marginTop: '0.5rem',
          }}>
            Realtime civic intelligence for 2025
          </p>
        </div>

        <nav aria-label="Primary" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                borderRadius: '999px',
                padding: '0.65rem 1.4rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(96, 165, 250, 0.18)';
                e.currentTarget.style.color = 'var(--text)';
                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.25)';
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
